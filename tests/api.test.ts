// API route tests — run with: npm test
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import { createApiApp } from "../server-core";

let server: Server;
let base: string;

before(async () => {
  server = createApiApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const addr = server.address();
  assert.ok(addr && typeof addr === "object");
  base = `http://127.0.0.1:${addr.port}`;
});

after(() => {
  server?.close();
});

test("GET /api/health returns online", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, "online");
});

test("GET /api/leaderboard returns a sorted array", async () => {
  const res = await fetch(`${base}/api/leaderboard`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  const scores = body.map((e: any) => e.score);
  assert.deepEqual(scores, [...scores].sort((a, b) => b - a));
});

test("POST /api/leaderboard validates and stores a score", async () => {
  const res = await fetch(`${base}/api/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "test_operator", score: 1234, difficulty: "Normal" }),
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.message, "Score synchronized");

  // Score > 2000 must be clamped
  const res2 = await fetch(`${base}/api/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "hacker", score: 99999 }),
  });
  assert.equal(res2.status, 200);
  const top = await (await fetch(`${base}/api/leaderboard`)).json();
  assert.ok(top[0].score <= 2000);
});

test("POST /api/leaderboard rejects missing fields", async () => {
  const res = await fetch(`${base}/api/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "no_score" }),
  });
  assert.equal(res.status, 400);
});

test("POST /api/contact rejects invalid payloads", async () => {
  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "x", email: "not-an-email", message: "hi" }),
  });
  assert.equal(res.status, 400);
});

test("POST /api/contact is honest when Resend is not configured (501 + mailto fallback)", async () => {
  delete process.env.RESEND_API_KEY;
  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Visitor", email: "visitor@example.com", message: "Hello!" }),
  });
  assert.equal(res.status, 501);
  const body = await res.json();
  assert.ok(body.fallback.startsWith("mailto:"));
});

test("POST /api/query rejects empty prompts and caps length", async () => {
  const res = await fetch(`${base}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "" }),
  });
  assert.equal(res.status, 400);

  // Long prompt is truncated, not rejected outright
  const long = "a".repeat(5000);
  const res2 = await fetch(`${base}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: long }),
  });
  assert.equal(res2.status, 200);
});

test("rate limiter throttles abusive /api/contact traffic (429)", async () => {
  const payload = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "spam", email: "spam@example.com", message: "spam" }),
  };
  let got429 = false;
  for (let i = 0; i < 8; i++) {
    const res = await fetch(`${base}/api/contact`, payload);
    if (res.status === 429) {
      got429 = true;
      break;
    }
  }
  assert.ok(got429, "expected a 429 after flooding /api/contact");
});
