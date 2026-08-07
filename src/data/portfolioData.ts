import { ProjectDef, PuzzleDef } from "../types";

// All project data verified against the live GitHub repos (2026-08-07).
// No fabricated stats: star/fork counts and "active users" are NOT claimed.
// simulationCode blocks are short representative patterns matching each
// project's real stack, not verbatim repo excerpts.

export const PROJECTS_REGISTRY: ProjectDef[] = [
  {
    id: "proj-1",
    slug: "bot",
    name: "Discord Hermes Admin Bot",
    description:
      "A natural-language Discord administration bot driven by an LLM planner. Ask for something in plain English and it restructures channels, roles, and study plans. Ships as a Dockerised FastAPI service with Redis-backed state.",
    tech: ["Python", "FastAPI", "discord.py", "Docker", "Redis", "LLM Agents"],
    repoUrl: "https://github.com/HAliveKP/Bot",
    stats: "Status: Active | CI: passing | v1.0.0",
    simulationCode: `// Discord Hermes Admin Bot - FastAPI intent route (representative)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Hermes Admin Bot")

class Command(BaseModel):
    user_id: str
    instruction: str  # e.g. "create a study plan channel for OOP"

@app.post("/dispatch")
async def dispatch(cmd: Command):
    plan = await planner.parse(cmd.instruction)   # LLM intent -> steps
    if not plan.steps:
        raise HTTPException(400, detail="Unparseable instruction")
    results = await executor.run(plan, actor=cmd.user_id)  # discord API calls
    return {"plan": plan.summary, "results": results}`
  },
  {
    id: "proj-2",
    slug: "greencompass",
    name: "Green Compass",
    description:
      "Carbon intelligence dashboard for Nepal — real-time carbon index tracking for Kathmandu, Bhaktapur, and Lalitpur, footprint calculators, and 5-year forecasts powered by Google Gemini.",
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini AI", "Recharts"],
    repoUrl: "https://github.com/HAliveKP/GreenCompass",
    stats: "Status: Live | green-compass-seven.vercel.app",
    simulationCode: `// Green Compass - Gemini-powered carbon forecast (representative)
// React + Vite + Tailwind; data generated via Google Gemini 1.5 Flash
const forecast = await fetchGemini(
  'Given the carbon index series for ' + city +
  ', produce a 5-year monthly forecast in JSON.');
const series = parseForecast(forecast);
<LineChart width={720} height={320} data={series}>
  <Line type="monotone" dataKey="carbon_index" stroke="#22d3ee" />
</LineChart>`
  },
  {
    id: "proj-3",
    slug: "crediskill",
    name: "CrediSkill Nepal",
    description:
      "Hackathon platform that connects skills with fair-paying jobs: skill quizzes, job listings, and leaderboards for Nepalese job-seekers. Node.js + Express + SQLite.",
    tech: ["Node.js", "Express", "SQLite", "HTML/CSS/JS", "REST API"],
    repoUrl: "https://github.com/HAliveKP/Crediskill",
    stats: "Status: Hackathon project | Built for Nepali job-seekers",
    simulationCode: `// CrediSkill Nepal - Express route (representative)
app.get("/api/jobs", (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const jobs = db.prepare(
    "SELECT * FROM jobs WHERE LOWER(title) LIKE ?"
  ).all(\`%\${q}%\`);
  res.json({ jobs, total: jobs.length });
});

app.post("/api/quiz/submit", (req, res) => {
  const { skillId, answers } = req.body;
  const score = gradeQuiz(skillId, answers);
  res.json({ score, badge: score >= 80 ? "SKILL_VERIFIED" : "IN_PROGRESS" });
});`
  },
  {
    id: "proj-4",
    slug: "research-assistant",
    name: "Smart Research Assistant",
    description:
      "Final-year capstone: a multi-agent AI research system with orchestrator, researcher, analyzer, and writer agents, MCP integration, and full observability. Generate structured research reports from a single topic.",
    tech: ["Python", "Multi-Agent LLM", "MCP", "Orchestration", "Observability"],
    repoUrl: "https://github.com/HAliveKP/smart-research-assistant",
    stats: "Status: Capstone (ST4003CMD) | Agent architecture",
    simulationCode: `// Smart Research Assistant - orchestrator loop (representative)
async def research_pipeline(topic: str) -> Report:
    plan = await orchestrator.plan(topic)          # split into tasks
    results = await gather(researcher.run(t) for t in plan.tasks)
    analysis = await analyzer.synthesize(results)
    return await writer.compose(analysis)          # structured report`
  },
  {
    id: "proj-5",
    slug: "portfolio",
    name: "Terminal Portfolio",
    description:
      "This very site — a gamified retro-futuristic terminal OS portfolio with a virtual filesystem, coding challenges, a live leaderboard, and a Gemini-powered AI clone.",
    tech: ["TypeScript", "React 19", "Vite", "Tailwind CSS 4", "Express", "Gemini"],
    repoUrl: "https://github.com/HAliveKP/Portfolio",
    stats: "Status: Live | harikrishnapokhrel.com.np",
    simulationCode: `// Terminal Portfolio - command dispatcher (representative)
switch (command) {
  case "/projects": mountProject(args); break;
  case "/play": startChallenge(difficulty()); break;
  case "/ask": await askAiClone(prompt); break;
  case "/clear": flushHistory(); break;
  default: appendLine("COMMAND FAULT: unknown command", "error");
}`
  },
  {
    id: "proj-6",
    slug: "registration_sys",
    name: "Student Course Registration System",
    description:
      "Web-based course registration system built with Flask, OOP architecture, and a modern glassmorphism UI — course cataloguing, pre-requisite enforcement, and enrolment management.",
    tech: ["Python", "Flask", "SQLite", "OOP", "Glassmorphism UI"],
    repoUrl: "https://github.com/HAliveKP/Student-Course-Registration-System",
    stats: "Status: Completed | Flask + OOP",
    simulationCode: `// Course Registration System - Flask route (representative)
@app.route("/api/enroll", methods=["POST"])
def enroll():
    data = request.get_json()
    missing = prerequisite_gate(data["course_id"], data["student_id"])
    if missing:
        return {"error": "Pre-requisite not met", "missing": missing}, 409
    registration_service.enroll(data["student_id"], data["course_id"])
    return {"status": "ENROLLED"}, 201`
  }
];

export const PUZZLES_DIARY: PuzzleDef[] = [
  {
    id: "puz-1",
    title: "Array Index Leak",
    description: "A machine learning pipeline iterates over a mini-batch of normalized features. However, it crashes on specific inference sequences with an IndexOutOfBounds or IndexError. Find the bug in the Python index operation.",
    codeSnippet: `def compute_batch_loss(weights, features, labels):
    loss = 0.0
    # Length of features is N. We want to evaluate pairwise values.
    # Note: len(features) = N, weights shape = N
    for i in range(1, len(features) + 1):
        feature_val = features[i] * weights[i - 1]
        loss += (feature_val - labels[i - 1]) ** 2
    return loss / len(features)`,
    choices: [
      "Starting range index at 1 is slow, use range(0, len(features)) and access index features[i].",
      "Correct features[i] value boundary leak: when elements reach len(features), feature_val access of index features[i] will trigger IndexError / Out of Bounds.",
      "The division statement at the return triggers division by zero.",
      "The power exponent multiplication ** must be replaced with pow() function call."
    ],
    correctChoiceIndex: 1,
    difficulty: "Normal",
    points: 150,
    explanation: "Since bounds in Python go from 0 to N-1, if i counts up to N (len(features) + 1 range goes up to len(features)), feature_val = features[i] will attempt to read features[N], which is out of range!"
  },
  {
    id: "puz-2",
    title: "The Phantom MySQL Cursor Lock",
    description: "A Flask community barter dashboard crashes on high traffic database spikes. Diagnostics point to connections pool exhausting rapidly. Pinpoint the session leakage culprit in the query routine below.",
    codeSnippet: `def lookup_barter_items(db_connection, skill_query):
    cursor = db_connection.cursor()
    try:
        query = "SELECT * FROM skills WHERE title LIKE %s"
        cursor.execute(query, ("%" + skill_query + "%",))
        results = cursor.fetchall()
        if len(results) == 0:
            return None
        return results
    except Exception as e:
        app.logger.error(f"SQL execution error: {e}")
        return []`,
    choices: [
      "The string concatenation '%' + skill_query + '%' is an sql injection hazard.",
      "The execute call needs to use list instead of tuple.",
      "The connection fails because returning None drops transactions.",
      "The database cursor is created but never closed ('cursor.close()') in a 'finally:' block, resulting in dangling connection resources in SQL Server pool."
    ],
    correctChoiceIndex: 3,
    difficulty: "Normal",
    points: 200,
    explanation: "Whenever you instantiate database cursors, failing to close them (especially during early returns like 'return None' or after errors is caught) locks and exhausts connection slots. Closing cursor in 'finally' is correct."
  },
  {
    id: "puz-3",
    title: "Sliding-Window Vision Optimization",
    description: "In the Nepalese Currency validator, a sub-grid visual contrast balance filter uses a sliding window matrix sum. The nested dual loops evaluate contrast scores natively at O(W * H * K^2) which drops live framerate to 4 FPS! What algorithmic structure solves this?",
    codeSnippet: `def calculate_grid_sums(image, window_size_K):
    W, H = image.shape
    output_grid = np.zeros((W, H))
    # Local neighborhood summation block
    for x in range(window_size_K, W - window_size_K):
        for y in range(window_size_K, H - window_size_K):
            sub_block_sum = 0
            for kx in range(-window_size_K, window_size_K + 1):
                for ky in range(-window_size_K, window_size_K + 1):
                    sub_block_sum += image[x + kx, y + ky]
            output_grid[x, y] = sub_block_sum
    return output_grid`,
    choices: [
      "Use multithreading pool executors on the image axes directly.",
      "Convert the image array to Float64 before computing sums to skip numpy array type checking.",
      "Utilize an Integral Image (Summed-Area Table) to calculate any arbitrary rectangular neighborhood sum in constant O(1) time, slashing computational cost to O(W * H).",
      "Short circuit the inner kernel loops when summation goes beyond 1000 units."
    ],
    correctChoiceIndex: 2,
    difficulty: "Extra Hard",
    points: 400,
    explanation: "A Summed-Area Table (Integral Image) allows you to compute the sum of any rectangle with just 4 array lookups, regardless of window size. W * H * K^2 thus reduces heavily to O(W * H), restoring real-time inference!"
  },
  {
    id: "puz-4",
    title: "Vision Node Memory Leak",
    description: "Your live YOLO vehicle tracking script is losing frames and triggers system OOM (Out Of Memory) aborts after 30 minutes. Study the camera buffer intake frame grabber node below.",
    codeSnippet: `import cv2

def track_vehicles_stream(source_url):
    tracker_net = cv2.dnn.readNetFromDarknet("yolov3.cfg", "yolov3.weights")
    video_capture = cv2.VideoCapture(source_url)
    tracked_logs = []
    
    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret: break
        
        # Frame processing and neural scoring
        detections = run_yolo_detector(tracker_net, frame)
        tracked_logs.append(frame) # append to log for future analysis
        
        # Display overlay on video out
        render_annotated_overlays(frame, detections)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break`,
    choices: [
      "ReadNetFromDarknet needs to be called inside the loop for dynamic weight reload.",
      "The tracked_logs list continuously appends raw OpenCV frames (multi-megabyte numpy arrays) in memory at 30 frames per second without any retention limit, causing heap exhaustion.",
      "waitKey(1) halts the thread causing hardware frame-buffer backpressure.",
      "isOpened() returns true inside terminal environments even when cameras disconnect."
    ],
    correctChoiceIndex: 1,
    difficulty: "Extra Hard",
    points: 450,
    explanation: "The tracking loop expands the list 'tracked_logs' on every frame with high-resolution image matrices and never truncates it. This consumes hundreds of megabytes per minute, inevitably leading to Out of Memory termination."
  }
];
