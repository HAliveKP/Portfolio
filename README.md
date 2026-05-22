<div align="center">
  <h1>🌐 HK Cyber Terminal Portfolio</h1>
  <p><strong>An Interactive, Gamified Developer Portfolio</strong></p>
  <p>A retro-futuristic CLI terminal experience showcasing projects, skills, and achievements</p>
</div>

---

## 📋 Table of Contents
- [About](#about)
- [Key Features](#key-features)
- [Featured Projects](#featured-projects)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## 🎯 About

**HK Cyber Terminal Portfolio** is an innovative, interactive developer portfolio designed as a retro-futuristic CLI terminal. It transforms traditional portfolio presentations into an engaging, gamified experience that showcases technical expertise through dynamic diagnostics, skills visualization, and interactive system games.

The portfolio integrates **Google Gemini API** for intelligent interactions and features real-time leaderboard synchronization, secure message transmission, and immersive terminal-style UI animations.

---

## ✨ Key Features

### Core Features
- 🖥️ **Retro Terminal Interface** - ASCII-style CLI design with modern animations and responsive layout
- 🎮 **Interactive System Game** - Gamified experience with real-time leaderboard sync
- 📊 **Dynamic Diagnostics** - Real-time system diagnostics and performance analytics
- 🎯 **Skills Visualization** - Interactive display of technical competencies and proficiency levels
- 🔒 **Secure Messaging** - Encrypted message transmission and contact functionality
- 🌍 **AI-Powered Intelligence** - Google Gemini API integration for smart interactions
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Motion Animations** - Smooth, physics-based animations for immersive experience
- 🏆 **Leaderboard System** - Real-time ranking with persistent data storage
- 🎨 **Tailwind CSS Styling** - Modern, customizable design system

---

## 💼 Featured Projects

### 1. **Green Compass**
*Advanced Carbon Accounting & Environmental Recovery Engine*

- **Description:** A sophisticated Carbon Accounting and Environmental Recovery Modeling engine with structural emission tracing and real-time climate telemetry
- **Features:** Mathematical carbon offsets auditing calculators, emission matrix evaluation, mitigation index computation
- **Tech Stack:** Python, Flask, Tailwind CSS, Recharts, Scikit-Learn
- **Status:** ✅ Completed
- **Repository:** [Green Compass](https://github.com/HAliveKP/GreenCompass)
- **Stats:** ⭐ 14 Stars | 🔀 3 Forks

---

### 2. **Sahayogi**
*Community-Focused Skill Bartering Exchange System*

- **Description:** An offline-friendly platform connecting local talent to reduce currency dependency and stimulate community economic empowerment
- **Features:** Skill categories, intelligent swap recommendations, secure messaging portals, bartering match algorithms
- **Tech Stack:** Python, Flask, MySQL, Tailwind CSS, Bootstrap, AJAX
- **Status:** 🚀 Deployed
- **Repository:** [Sahayogi](https://github.com/HAliveKP/Crediskill)
- **Stats:** ⭐ 8 Stars | 👥 120+ Active Users

---

### 3. **SkillBridge (CrediSkill)**
*Youth Economic Empowerment & Employment Matching Platform*

- **Description:** An offline-first Android application designed to stimulate youth economic empowerment and localized employment matching in rural districts
- **Features:** Specialized skill logs, P2P credential syncing, localized job caches, reputation indexing, offline functionality
- **Tech Stack:** Java, Android SDK, Room Database, Retrofit, SQLite
- **Status:** ✅ Production Ready
- **Repository:** [SkillBridge](https://github.com/HAliveKP/Crediskill)
- **Stats:** ⭐ 19 Stars | 📥 400+ Downloads | 📜 Apache-2.0 License

---

### 4. **YOLO Vision Systems**
*Computer Vision & AI-Powered Detection System*

- **Description:** Cutting-edge computer vision system leveraging convolutional neural networks in YOLOv3/v8 for Nepalese currency denomination classification and vehicle tracking
- **Features:** High-speed object detection, currency recognition, vehicle tracking, 94.2% accuracy on live feeds
- **Tech Stack:** Python, YOLOv3/v8, OpenCV, PyTorch, TensorFlow
- **Status:** 🔧 Production Configuration
- **Performance:** ⚡ 15ms Inference Time | 🎯 94.2% Accuracy

---

### 5. **Student Course Registration System**
*Secure Academic Management Platform*

- **Description:** A robust, desktop-management platform for scheduling, cataloging, querying, and enforcing academic pre-requisites on tertiary registration pipelines
- **Features:** Pre-requisite validation, integrity checking (SHA-256), course enrollment management, academic pipeline enforcement
- **Tech Stack:** Java, MySQL, JDBC, Log4j, Swing UI
- **Status:** ✅ Version 1.0.4
- **Repository:** [Registration System](https://github.com/HAliveKP/Student-Course-Registration-System)
- **Stats:** ⭐ 10 Stars

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite 6.2** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first styling
- **Lucide React** - Icon library
- **Motion 12** - Smooth animations

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Backend type safety
- **tsx** - TypeScript execution for Node

### API & Services
- **Google Gemini API** - AI-powered interactions
- **@google/genai** - Official Gemini SDK

### Development Tools
- **ESBuild** - Ultra-fast bundler
- **Autoprefixer** - CSS vendor prefixes
- **TypeScript Compiler** - Type checking
- **TSC** - Linting and validation

---

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Gemini API Key** (from [Google AI Studio](https://ai.studio))

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HAliveKP/hk-cyber-terminal-portfolio.git
   cd hk-cyber-terminal-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   If you have an old or corrupted install, remove `node_modules` and reinstall before running the app.

3. **Configure API Key**
   - Create a `.env.local` file in the project root
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Verify Installation**
   ```bash
   npm run lint
   ```

---

## 🚀 Quick Start

### Development Mode
Start the development server with hot module replacement:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Start Production Server
Run the production-built application:
```bash
npm start
```

### Run with Docker
Build and run the production container:
```bash
docker compose up --build
```

### Clean Build Artifacts
Remove generated files:
```bash
npm run clean
```

### Type Checking
Run TypeScript compiler without emitting:
```bash
npm run lint
```

---

## 🌍 Deployment

### Pre-Deployment Checklist
- [ ] All dependencies installed: `npm install`
- [ ] Type checking passes: `npm run lint`
- [ ] Environment variables configured
- [ ] Production build generated: `npm run build`

### Deploy Configuration
The project includes **Vercel** configuration for easy one-click deployment:
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- See `vercel.json` for deployment settings

### Environment Variables for Production
```
GEMINI_API_KEY=your_production_api_key
NODE_ENV=production
```

---

## 📂 Project Structure

```
hk-cyber-terminal-portfolio/
├── src/                           # React application
│   ├── components/                # Reusable UI components
│   │   ├── BootScreen.tsx        # Initial boot animation
│   │   └── TerminalDashboard.tsx # Main terminal interface
│   ├── data/                      # Project and portfolio data
│   │   └── portfolioData.ts      # Projects, skills, and content
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── types.ts                   # TypeScript type definitions
├── api/                           # Backend API routes
│   └── index.ts                   # Express server setup
├── db_data/                       # Database and data storage
│   └── leaderboard.json          # Leaderboard persistent data
├── public/                        # Static assets
├── dist/                          # Production build output
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── server.ts                      # Node.js server entry
├── vercel.json                    # Vercel deployment config
├── .env.local                     # Local environment variables
└── README.md                      # This file
```

---

## 🎮 Features in Detail

### Terminal Dashboard
- Real-time system diagnostics
- Interactive project showcase
- Skill proficiency matrix
- Message interface
- Leaderboard display

### Game System
- Live ranking updates
- Persistent score tracking
- Real-time synchronization
- User achievements

### AI Integration
- Smart conversation system via Gemini API
- Context-aware responses
- Natural language processing
- Personalized interactions

---

## 📊 Performance Metrics

- ⚡ **Build Time:** < 2 seconds
- 🚀 **Page Load:** < 500ms
- 📱 **Performance Score:** 95+
- 🎯 **Lighthouse Score:** 90+

---

## 📝 License

This project is open-source and available under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/HAliveKP/hk-cyber-terminal-portfolio/issues).

---

## 📧 Contact & Social

For inquiries, collaborations, or feedback:
- **GitHub:** [@HAliveKP](https://github.com/HAliveKP)
- **Portfolio:** [HK Cyber Terminal](https://hk-cyber-terminal-portfolio.vercel.app)

---

<div align="center">
  <p><strong>Made with ❤️ by HK</strong></p>
  <p>Showcasing innovation through code</p>
</div>
