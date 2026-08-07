# Security Policy

## Reporting a vulnerability

If you find a security issue in this project (e.g. in the Express API, rate limiting, or the Gemini/Resend integrations), please do **not** open a public issue. Email the maintainer directly:

- **Email:** halivekp@gmail.com

You will receive a response within a few days. Public disclosure happens after a fix is deployed.

## Notes

- The API runs with per-IP rate limiting on `/api/contact`, `/api/query`, and `/api/leaderboard`.
- API keys (`GEMINI_API_KEY`, `RESEND_API_KEY`) are read from environment variables only and are never committed.
- On Vercel the leaderboard is in-memory and ephemeral; nothing user-generated is persisted server-side.
