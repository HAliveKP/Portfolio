import express from "express";
import path from "path";
import { createApiApp } from "./server-core";

// Local development / Docker entrypoint.
// Serves the API plus the Vite-built static site with an SPA fallback.
// NOT used on Vercel — the api/index.ts function is the serverless entry.

const app = createApiApp();
const PORT = Number(process.env.PORT ?? 3000);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dev: Vite middleware with HMR
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Prod: serve the built static site
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEM STARTED] HK Cyber Terminal OS running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
