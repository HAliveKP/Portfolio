# Harikrishna Pokhrel — AI Engineering Portfolio

Personal portfolio website for Harikrishna Pokhrel (HKP), AI Student at Coventry University (Softwarica College) in Kathmandu, Nepal. Focused on grounded retrieval architectures (RAG), agent safety gates, and open-source systems.

Live Site: [https://harikrishnapokhrel.com.np/](https://harikrishnapokhrel.com.np/)
GitHub: [https://github.com/HAliveKP](https://github.com/HAliveKP)

---

## Technical Stack & Key Features

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 + Custom Design Tokens (CSS Variables)
- **Animations:** Motion (`motion/react`) with native `IntersectionObserver` fallbacks & full `prefers-reduced-motion` compliance
- **Icons:** Lucide React
- **Audio:** Custom Web Audio API synthesizer for acoustic motifs (zero external MP3 assets)
- **AI Extras:**
  - Interactive Terminal / Whoami CLI mode
  - GitHub Live Telemetry with `localStorage` caching (1h TTL)
  - "Ask About Me" AI Chat Assistant with modular responder interface (`src/utils/aiChat.ts`)
  - Cursor-following radial glow & 3D tilt on project cards (desktop only)

---

## Local Development & Setup

### Prerequisites
- Node.js (v18+) or Bun (v1.2+)

### Instructions

1. **Clone & Install Dependencies:**
   ```bash
   git clone https://github.com/HAliveKP/HAliveKP.github.io.git
   cd HAliveKP.github.io
   bun install # or npm install
   ```

2. **Run Development Server:**
   ```bash
   bun run dev
   # Opens local dev server on http://localhost:3000
   ```

3. **Type-Check & Linting:**
   ```bash
   bun run lint
   # Executes tsc --noEmit
   ```

4. **Production Build:**
   ```bash
   bun run build
   # Outputs optimized static bundle to dist/
   ```

---

## Customizing Content

All portfolio content (projects, journey timeline, core principles, now page, profile links) is centrally configured in:
`src/data/portfolioData.ts`

To add or modify projects, update the `PROJECTS` array in `portfolioData.ts`:
```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'Project summary...',
  stack: ['Python', 'PyTorch'],
  repoUrl: 'https://github.com/HAliveKP/my-project',
  liveUrl: 'https://my-demo.com',
  status: 'shipped',
  featured: true,
  demoUrl: '/demo.gif', // optional media preview
}
```

---

## Environment Variables

Copy `.env.example` to `.env` if extending backend API endpoints:
```bash
cp .env.example .env
```

---

## License

Apache-2.0
