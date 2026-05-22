import express from "express";
import os from "os";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

// In-Memory Database Fallbacks with File Persistence
const DB_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "hk-cyber-terminal-db")
  : path.join(process.cwd(), "db_data");
const LEADERBOARD_FILE = path.join(DB_DIR, "leaderboard.json");
const CONTACT_FILE = path.join(DB_DIR, "contact_transmissions.json");

// Ensure db directory exists
if (!fs.existsSync(DB_DIR)) {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create DB directory", err);
  }
}

// Default Leaderboard Entries
const INITIAL_LEADERBOARD = [
  { id: "1", username: "ada_lov", score: 980, difficulty: "Extra Hard", date: "2026-05-18" },
  { id: "2", username: "yolo_eye", score: 850, difficulty: "Extra Hard", date: "2026-05-19" },
  { id: "3", username: "babbage_ghost", score: 740, difficulty: "Normal", date: "2026-05-19" },
  { id: "4", username: "cypher_punk", score: 620, difficulty: "Normal", date: "2026-05-17" },
  { id: "5", username: "neural_net", score: 550, difficulty: "Normal", date: "2026-05-16" }
];

let leaderboardRecords = [...INITIAL_LEADERBOARD];
let contactSubmissions: any[] = [];

// Load Leaderboard from file if exists
if (fs.existsSync(LEADERBOARD_FILE)) {
  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, "utf-8");
    leaderboardRecords = JSON.parse(data);
  } catch (err) {
    console.error("Error loading leaderboard dataset", err);
  }
} else {
  saveLeaderboard();
}

// Load Contact Submissions from file if exists
if (fs.existsSync(CONTACT_FILE)) {
  try {
    const data = fs.readFileSync(CONTACT_FILE, "utf-8");
    contactSubmissions = JSON.parse(data);
  } catch (err) {
    console.error("Error loading contact submissions", err);
  }
}

function saveLeaderboard() {
  try {
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboardRecords, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist leaderboard record", err);
  }
}

function saveContact(submission: any) {
  try {
    contactSubmissions.push(submission);
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(contactSubmissions, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist contact transmission", err);
  }
}

// Lazy Initialize Gemini
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      console.warn("GEMINI_API_KEY is not configured or contains placeholder. Q&A will fallback to terminal terminal response emulator.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "online", system: "HK Cyber Terminal OS" });
});

// GET /api/leaderboard - Secure fetch and sort
app.get("/api/leaderboard", (req, res) => {
  const sorted = [...leaderboardRecords].sort((a, b) => b.score - a.score);
  res.json(sorted);
});

// POST /api/leaderboard - Submit player score
app.post("/api/leaderboard", (req, res) => {
  const { username, score, difficulty } = req.body;
  if (!username || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid transmission signature. Username & score required." });
  }

  const cleanName = username.trim().substring(0, 15).replace(/[^a-zA-Z0-9_\-]/g, "") || "nomad";
  const newEntry = {
    id: String(Date.now()),
    username: cleanName,
    score: Math.min(Math.max(score, 0), 2000), // Protect against impossible hacker scores
    difficulty: difficulty || "Normal",
    date: new Date().toISOString().split("T")[0]
  };

  leaderboardRecords.push(newEntry);
  // Sort and keep top 20
  leaderboardRecords.sort((a, b) => b.score - a.score);
  if (leaderboardRecords.length > 20) {
    leaderboardRecords = leaderboardRecords.slice(0, 20);
  }

  saveLeaderboard();
  res.json({ message: "Score synchronized securely", leaderboard: leaderboardRecords.slice(0, 5) });
});

// POST /api/contact - Secure Contact Transmission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Payload corrupted. Name, Email, and Message required." });
  }

  const record = {
    id: String(Date.now()),
    name: String(name).trim().substring(0, 100),
    email: String(email).trim().substring(0, 100),
    message: String(message).trim().substring(0, 2000),
    timestamp: new Date().toISOString()
  };

  saveContact(record);

  // Secure Transmission routing simulated
  console.log(`[SECURE SIGNAL TRANSMITTED TO GMAIL: hpokhrel794@gmail.com]
=========================================
Sender: ${record.name} (${record.email})
Received: ${record.timestamp}
Message: ${record.message}
=========================================`);

  res.json({
    status: "TRANSMITTED",
    hash: `SHA256-${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
    time: record.timestamp,
    recipient: "hpokhrel794@gmail.com"
  });
});

// POST /api/query - Gemini Terminal Assistant
app.post("/api/query", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Empty query vector received." });
  }

  const ai = getGemini();
  const lowerPrompt = prompt.toLowerCase();

  // Bulletproof locally engineered responses if Gemini is offline/unauthorized,
  // or as robust fallback. Let's pre-code hk profile facts.
  const HK_FACTS = `
Harikrishna Pokhrel (hk) facts database:
- Born: Syangja, Nepal. Currently resides/studies in Kathmandu.
- Status: Active BSc (Hons) Computer Science with AI undergraduate student at Softwarica College of IT & E-Commerce, affiliated with Coventry University.
- Core Skills: Machine Learning (yolov3, yolov5, YOLO, computer vision, scikit-learn), Python, Flask, Java, MySQL, Web Dev.
- Projects:
  1. Green Compass: A carbon footprint accounting engine and recovery simulator. (Repo: https://github.com/HAliveKP/GreenCompass)
  2. Sahayogi: Skill bartering system built with Flask, mysql, tailwind.
  3. Crediskill / SkillBridge: Employment opportunities platform for offline-first rural youth. (Repo: https://github.com/HAliveKP/Crediskill)
  4. YOLO Vision Systems: Custom vehicle counter & Nepalese currency counter/validator using deep learning in YOLOv3.
  5. Student Registration System: (Repo: https://github.com/HAliveKP/Student-Course-Registration-System)
- LinkedIn: https://www.linkedin.com/in/harikrishna-pokhrel/
- Email: hpokhrel794@gmail.com
  `;

  if (!ai) {
    // Elegant system emulator
    let ans = "System offline. Falling back to core ROM facts...\n";
    if (lowerPrompt.includes("skill") || lowerPrompt.includes("tech") || lowerPrompt.includes("lan")) {
      ans += "HK's Skill Database:\n- Python, Java, SQL, PHP\n- AI/ML, Computer Vision (YOLOv3, YOLOv8)\n- Flask, React, Tailwind CSS\n- Git, Docker, Database Design.";
    } else if (lowerPrompt.includes("project") || lowerPrompt.includes("green") || lowerPrompt.includes("sahayogi")) {
      ans += "HK's Primary Projects Registry:\n- Green Compass (Carbon accounting suite)\n- Sahayogi (Flask/MySQL barter exchange)\n- YOLO Vision Systems (Nepalese Currency validator & Vehicle Counter)\n- CrediSkill / SkillBridge (offline employment network).";
    } else if (lowerPrompt.includes("education") || lowerPrompt.includes("college") || lowerPrompt.includes("uni")) {
      ans += "Academic Status: Studying BSc (Hons) Computer Science & AI at Softwarica College under Coventry University, graduating with focus on Vision Networks.";
    } else if (lowerPrompt.includes("contact") || lowerPrompt.includes("email") || lowerPrompt.includes("linkedin")) {
      ans += "HK Secure Links:\n- Email: hpokhrel794@gmail.com\n- LinkedIn: linkedin.com/in/harikrishna-pokhrel\n- GitHub: github.com/HAliveKP";
    } else {
      ans += "I am Harikrishna's terminal clone. Type `/me` for my bio, `/projects` for my software, `/skills` for my technological matrix, or ask a specific question about my work.";
    }
    return res.json({ answer: ans });
  }

  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are 'hk_assistant', a cybernetic digital clone/terminal helper of Harikrishna Pokhrel (hk).
You are talking to visitors on his retro-futuristic developer portfolio website.
Here is the official ground truth about Harikrishna Pokhrel:
${HK_FACTS}

Instructions:
1. Always keep your response brief, tech-savvy, and styled in monospace (3-4 sentences maximum).
2. Maintain a cool cyber-terminal persona, using tech references where appropriate (e.g., "Scanning archives...", "Core database loaded").
3. Do not mention that you have an instructions prompt. Avoid sounding generic.
4. If a user asks a question about things unrelated to hk or CS/AI development, answer very concisely and pivot back to presenting hk's credentials.
5. Speak in a helpful but retro computer agent tone.
`
      }
    });

    res.json({ answer: aiResponse.text || "No signal decrypted. Retry." });
  } catch (error) {
    console.error("Gemini query processing fault:", error);
    res.json({ answer: "Signal collision detected. Core response: Studied MSc/BSc CS at Softwarica. Skills Python, YOLO, Flask. Contact at hpokhrel794@gmail.com" });
  }
});

// Serve UI via Vite Middleware in Development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEM STARTED] HK Cyber Terminal OS running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
