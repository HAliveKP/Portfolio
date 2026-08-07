import express from "express";
import { GoogleGenAI } from "@google/genai";

// ---------------------------------------------------------------------------
// Shared API factory. Used by:
//   - api/index.ts  (Vercel serverless function — API routes ONLY, no static)
//   - server.ts     (local dev / Docker — API routes + static + SPA fallback)
// Fixes the previous design where the serverless function tried to serve the
// static build (sendFile of a nonexistent dist/) and crashed every call.
// ---------------------------------------------------------------------------

export const CONTACT_EMAIL = "halivekp@gmail.com";
export const GITHUB_URL = "https://github.com/HAliveKP";
export const PORTFOLIO_URL = "https://harikrishnapokhrel.com.np/";

const IS_VERCEL = process.env.VERCEL === "1";

// --- In-memory leaderboard (persisted to disk only in local dev) ------------
interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  difficulty: string;
  date: string;
}

let leaderboardRecords: LeaderboardEntry[] = [];

function loadLocalLeaderboard(): void {
  if (IS_VERCEL) return; // serverless fs is ephemeral — keep memory only
  try {
    const fs = require("fs");
    const path = require("path");
    const file = path.join(process.cwd(), "db_data", "leaderboard.json");
    if (fs.existsSync(file)) {
      leaderboardRecords = JSON.parse(fs.readFileSync(file, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to load leaderboard dataset", err);
  }
}

function saveLocalLeaderboard(): void {
  if (IS_VERCEL) return;
  try {
    const fs = require("fs");
    const path = require("path");
    const dir = path.join(process.cwd(), "db_data");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "leaderboard.json"),
      JSON.stringify(leaderboardRecords, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error("Failed to persist leaderboard record", err);
  }
}

loadLocalLeaderboard();

// --- Simple in-memory rate limiter (per-IP sliding window) ------------------
// Per-instance on Vercel — a pragmatic throttle, not a hard guarantee.
const rateBuckets = new Map<string, number[]>();

function rateLimited(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (rateBuckets.get(ip) || []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

function clientIp(req: express.Request): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

// --- Gemini (AI clone) -------------------------------------------------------
let aiClient: GoogleGenAI | null = null;

const HK_FACTS = `
Harikrishna Pokhrel (hk) facts database:
- Status: Active BSc (Hons) Computer Science with AI undergraduate student at Softwarica College of IT & E-Commerce, affiliated with Coventry University.
- Location: Kathmandu, Nepal.
- Core Skills: Python, TypeScript, React, FastAPI, Node.js/Express, Docker, SQL, LLM application development, Gemini API.
- Projects (all public on GitHub):
  1. Discord Hermes Admin Bot: natural-language Discord admin bot driven by an LLM planner. FastAPI + discord.py + Docker + Redis. (Repo: https://github.com/HAliveKP/Bot)
  2. Green Compass: carbon intelligence dashboard for Nepal built with React, Vite, Tailwind CSS and Google Gemini. Live: https://green-compass-seven.vercel.app (Repo: https://github.com/HAliveKP/GreenCompass)
  3. CrediSkill Nepal: hackathon platform connecting skills with fair-paying jobs - quizzes, job listings, leaderboards. Node.js/Express/SQLite. (Repo: https://github.com/HAliveKP/Crediskill)
  4. Smart Research Assistant: multi-agent AI research system (capstone). (Repo: https://github.com/HAliveKP/smart-research-assistant)
  5. Terminal Portfolio: this website. TypeScript/React/Vite/Express + Gemini. (Repo: https://github.com/HAliveKP/Portfolio)
- Portfolio: https://harikrishnapokhrel.com.np/
- LinkedIn: https://www.linkedin.com/in/harikrishna-pokhrel/
- Email: halivekp@gmail.com
- If asked about projects that are NOT in this list (e.g. YOLO vision systems, Sahayogi, SkillBridge), state honestly that they are not part of his public portfolio.
`;

function getGemini(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { "User-Agent": "hk-terminal-portfolio" } },
    });
  }
  return aiClient;
}

// --- API app ----------------------------------------------------------------

export function createApiApp(): express.Express {
  const app = express();
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "online", system: "HK Cyber Terminal OS" });
  });

  // GET /api/leaderboard
  app.get("/api/leaderboard", (_req, res) => {
    const sorted = [...leaderboardRecords].sort((a, b) => b.score - a.score);
    res.json(sorted);
  });

  // POST /api/leaderboard - submit a quiz score
  app.post("/api/leaderboard", (req, res) => {
    if (rateLimited(clientIp(req), 10, 60_000)) {
      return res.status(429).json({ error: "Rate limit exceeded. Slow down, operator." });
    }
    const { username, score, difficulty } = req.body || {};
    if (!username || typeof score !== "number") {
      return res.status(400).json({ error: "Username and numeric score required." });
    }
    const cleanName =
      String(username).trim().substring(0, 15).replace(/[^a-zA-Z0-9_\-]/g, "") || "nomad";
    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      username: cleanName,
      score: Math.min(Math.max(Math.round(score), 0), 2000),
      difficulty: String(difficulty || "Normal").substring(0, 20),
      date: new Date().toISOString().split("T")[0],
    };
    leaderboardRecords.push(entry);
    leaderboardRecords.sort((a, b) => b.score - a.score);
    if (leaderboardRecords.length > 20) leaderboardRecords = leaderboardRecords.slice(0, 20);
    saveLocalLeaderboard();
    res.json({ message: "Score synchronized", leaderboard: leaderboardRecords.slice(0, 5) });
  });

  // POST /api/contact - relay a visitor message via Resend (real email).
  app.post("/api/contact", async (req, res) => {
    if (rateLimited(clientIp(req), 5, 60_000)) {
      return res.status(429).json({ error: "Rate limit exceeded. Try again later." });
    }
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    const cleanName = String(name).trim().substring(0, 100);
    const cleanEmail = String(email).trim().substring(0, 120);
    const cleanMessage = String(message).trim().substring(0, 2000);
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "MY_RESEND_API_KEY") {
      return res.status(501).json({
        error: "Contact relay is not configured on this deployment.",
        fallback: `mailto:${CONTACT_EMAIL}`,
      });
    }

    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          subject: `Portfolio message from ${cleanName} <${cleanEmail}>`,
          text: cleanMessage,
          reply_to: cleanEmail,
        }),
      });
      if (!resendRes.ok) {
        const body = await resendRes.text();
        console.error("Resend relay failure:", resendRes.status, body);
        return res.status(502).json({ error: "Message relay failed." });
      }
      res.json({
        status: "TRANSMITTED",
        time: new Date().toISOString(),
        recipient: CONTACT_EMAIL,
      });
    } catch (err) {
      console.error("Resend relay error:", err);
      res.status(502).json({ error: "Message relay failed." });
    }
  });

  // POST /api/query - Gemini terminal assistant (honest fallback facts).
  app.post("/api/query", async (req, res) => {
    if (rateLimited(clientIp(req), 10, 60_000)) {
      return res.status(429).json({ error: "Rate limit exceeded. Slow down, operator." });
    }
    const prompt = String((req.body || {}).prompt || "").trim().substring(0, 600);
    if (!prompt) {
      return res.status(400).json({ error: "Empty query received." });
    }
    const ai = getGemini();
    const lower = prompt.toLowerCase();

    if (!ai) {
      let answer = "Core ROM facts (Gemini offline):\n";
      if (lower.includes("skill") || lower.includes("tech") || lower.includes("lan")) {
        answer += "- Python, TypeScript, React, FastAPI, Node.js/Express, Docker, SQL, LLM apps";
      } else if (lower.includes("project") || lower.includes("green") || lower.includes("bot") || lower.includes("credi")) {
        answer +=
          "- Discord Hermes Admin Bot (FastAPI + Docker + Redis)\n" +
          "- Green Compass (React + Gemini carbon dashboard)\n" +
          "- CrediSkill Nepal (Node/Express/SQLite jobs platform)\n" +
          "- Smart Research Assistant (multi-agent capstone)";
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("uni")) {
        answer += "BSc (Hons) Computer Science with AI @ Softwarica College (Coventry University).";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("linkedin")) {
        answer += "Email: halivekp@gmail.com\nLinkedIn: linkedin.com/in/harikrishna-pokhrel\nGitHub: github.com/HAliveKP";
      } else {
        answer +=
          "I am Harikrishna's terminal clone. Try `/me`, `/projects`, `/skills`, or ask about his work.";
      }
      return res.json({ answer });
    }

    try {
      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are 'hk_assistant', a cybernetic digital clone of Harikrishna Pokhrel, helping visitors on his portfolio site.
Official ground truth about Harikrishna Pokhrel:
${HK_FACTS}
Instructions:
1. Keep responses brief (3-4 sentences max), monospace cyber-terminal style.
2. Never invent projects, stats, employers, or skills not in the ground truth.
3. If asked about something not in the facts, say you don't have that record.
4. Helpful, retro-computer tone.`,
        },
      });
      res.json({ answer: aiResponse.text || "No signal decrypted. Retry." });
    } catch (error) {
      console.error("Gemini query failure:", error);
      res.json({
        answer:
          "Signal collision detected. Core facts: BSc CS with AI @ Softwarica. Python, TypeScript, React, FastAPI, Docker. Contact: halivekp@gmail.com",
      });
    }
  });

  return app;
}
