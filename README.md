<div align="center">
  <h1>🖥️ HK Cyber Terminal Portfolio</h1>
  <p><strong>An interactive, gamified developer portfolio</strong> — a retro-futuristic terminal OS that visitors explore with real commands.</p>
  <p>
    <img alt="Build" src="https://img.shields.io/badge/build-passing-brightgreen" />
    <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" />
    <img alt="Tailwind 4" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" />
    <img alt="Gemini" src="https://img.shields.io/badge/Gemini-AI-4285F4?logo=google" />
  </p>
  <p><strong>Live:</strong> <a href="https://harikrishnapokhrel.com.np/">harikrishnapokhrel.com.np</a></p>
</div>

---

## 🎯 What is this?

A terminal-themed portfolio where visitors interact instead of scroll: type `/help`, browse a virtual filesystem with `ls` / `cd` / `cat`, run `cat /projects/bot.md`, try coding challenges with `/play`, check the `/leaderboard`, and ask the `/ask` AI clone about the owner.

## ✨ Features

- 🖥️ **Terminal interface** — real command parsing, virtual filesystem, autocomplete-friendly UX
- 🎮 **Coding challenges** — `/play` starts a debugging quiz (Normal / Extra Hard)
- 🏆 **Leaderboard** — `/leaderboard` shows top quiz scores (in-memory; persists locally in `db_data/`)
- 🤖 **AI clone** — `/ask [question]` answers via Google Gemini, grounded in verified facts only
- 📩 **Contact** — `/contact` relays messages to **halivekp@gmail.com** via Resend
- 📱 **Responsive** — mobile drawer nav, works on phones
- 🔊 **Sound design** — optional WebAudio chimes (toggle in the header)

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide |
| Backend | Express, tsx, esbuild |
| AI | Google Gemini (`@google/genai`) |
| Deploy | Vercel (serverless API) / Docker (self-host) |

## 📦 Setup

Prerequisites: **Node.js ≥ 20**.

```bash
git clone https://github.com/HAliveKP/Portfolio.git
cd Portfolio
npm install
cp .env.example .env.local   # add your GEMINI_API_KEY (+ RESEND_API_KEY for contact)
npm run dev                  # http://localhost:3000
```

## 🧪 Quality checks

```bash
npm run lint   # TypeScript strict type-check
npm test       # API route tests (node:test)
npm run build  # production build (static + server bundle)
```

## 🚀 Deployment

**Vercel (recommended):** connect the repo, set `GEMINI_API_KEY` / `RESEND_API_KEY` as environment variables. `vercel.json` rewrites `/api/*` to the serverless function and everything else to the SPA. The API function is deliberately static-server-free (see `api/index.ts` → `server-core.ts`).

**Docker:** `docker compose up --build` runs the full app (API + static) on port 3000.

## 🗂️ Project Structure

```
├── api/index.ts         # Vercel serverless entry (API only)
├── server-core.ts       # Shared Express API factory (routes, rate limits, Gemini)
├── server.ts            # Local/Docker entry (API + static + SPA fallback)
├── src/
│   ├── components/      # BootScreen, TerminalDashboard
│   ├── data/            # portfolioData.ts (projects, puzzles — verified)
│   └── types.ts
├── public/              # favicon, og-image, robots.txt, sitemap.xml
└── tests/               # API tests
```

## 🔒 Honesty notes

- All project data in `src/data/portfolioData.ts` is verified against the live GitHub repos — no fabricated stars, users, or projects.
- The leaderboard is ephemeral on Vercel (serverless memory) and persists to `db_data/` in local/Docker runs.
- The contact form only claims success when Resend actually delivered the message; otherwise it shows an honest error with a `mailto:` fallback.

## 📄 License

MIT — see [LICENSE](LICENSE).
