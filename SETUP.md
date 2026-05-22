# Project Setup Guide

Quick reference for setting up the HK Cyber Terminal Portfolio locally.

## 🚀 Quick Start (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/HAliveKP/hk-cyber-terminal-portfolio.git
cd hk-cyber-terminal-portfolio
```

### 2. Install & Configure
```bash
npm install
cp .env.example .env.local
# Edit .env.local and add GEMINI_API_KEY
```

### 3. Start Development
```bash
npm run dev
# Navigate to http://localhost:5173
```

---

## 📦 Prerequisites

- **Node.js:** v18 or higher
  - [Download](https://nodejs.org/)
  - Verify: `node --version`

- **npm:** v9 or higher
  - Included with Node.js
  - Verify: `npm --version`

- **Git:** For version control
  - [Download](https://git-scm.com/)

- **Gemini API Key:** Required
  - Get from [Google AI Studio](https://ai.studio)

---

## 📂 Project Structure

```
hk-cyber-terminal-portfolio/
├── src/                    # React source code
│   ├── components/        # UI components
│   ├── data/             # Portfolio data
│   └── types.ts          # TypeScript types
├── api/                   # Backend API
├── db_data/              # Data storage
├── public/               # Static files
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Build config
└── README.md             # Documentation
```

---

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run clean` | Remove build artifacts |
| `npm run lint` | Run TypeScript type check |

---

## 🔧 Configuration

### Environment Variables (.env.local)
```bash
GEMINI_API_KEY=sk-...your-key...
NODE_ENV=development
```

### Available Settings
- **GEMINI_API_KEY:** Required. Your Google Gemini API key
- **NODE_ENV:** Optional. Set to 'production' for production builds

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>
```

### Dependencies Issues
```bash
npm cache clean --force
npm install
```

### Build Errors
```bash
npm run clean
npm install
npm run lint
npm run build
```

### API Connection Issues
- Verify GEMINI_API_KEY is set correctly
- Check no typos or extra spaces
- Verify key is active in Google AI Studio

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptdocs.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Express.js Docs](https://expressjs.com/)
- [Gemini API Docs](https://api.google.dev)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/name`
5. Create Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📞 Support

- 📖 Check [README.md](README.md)
- 🏗️ Review [ARCHITECTURE.md](ARCHITECTURE.md)
- 🐛 Browse [Issues](https://github.com/HAliveKP/hk-cyber-terminal-portfolio/issues)
- 📧 Contact maintainers

---

**Last Updated:** May 2024
