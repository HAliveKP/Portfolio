// Vercel serverless function — API routes only.
// No static serving, no SPA catch-all, no fs writes (leaderboard stays in
// memory; contact relays via Resend). This replaces the old design where the
// function imported the full static server and crashed every invocation.
import { createApiApp } from "../server-core";

export default createApiApp();
