import { ProjectDef, PuzzleDef } from "../types";

export const PROJECTS_REGISTRY: ProjectDef[] = [
  {
    id: "proj-1",
    slug: "greencompass",
    name: "Green Compass",
    description: "An advanced Carbon Accounting and Environmental Recovery Modeling engine. Features structural emission tracing, real-time climate telemetry, and mathematical carbon offsets auditing calculators.",
    tech: ["Python", "Flask", "Tailwind CSS", "Recharts", "Scikit-Learn"],
    repoUrl: "https://github.com/HAliveKP/GreenCompass",
    stats: "Stars: 14 | Forks: 3 | Status: Completed",
    simulationCode: `// GreenCompass Emission Matrix Evaluator
class CarbonAccountingEngine:
    def __init__(self, region_factor=0.478):
        self.scope_1_coefficient = 1.2  # direct fuel combustion
        self.scope_2_coefficient = region_factor # power grids
        
    def calculate_footprint(self, direct_kwh, fuel_liters):
        direct_emissions = fuel_liters * self.scope_1_coefficient
        indirect_emissions = direct_kwh * self.scope_2_coefficient
        total_co2_kg = direct_emissions + indirect_emissions
        mitigation_index = self._compute_mitigation(total_co2_kg)
        return {
            "total_co2_kg": round(total_co2_kg, 2),
            "offsets_required": round(total_co2_kg / 1000, 3),
            "ecological_mitigation_index": f"{mitigation_index * 100:.1f}%"
        }
        
    def _compute_mitigation(self, ems):
        return 1.0 / (1.0 + (ems / 50000.0)) # logistic decay curve`
  },
  {
    id: "proj-2",
    slug: "sahayogi",
    name: "Sahayogi",
    description: "A community-focused offline-friendly Skill Bartering exchange system, connecting local talent to reduce currency dependency. Outfitted with skill categories, swap recommendations, and secure messaging portals.",
    tech: ["Python", "Flask", "MySQL", "Tailwind CSS", "Bootstrap", "AJAX"],
    repoUrl: "https://github.com/HAliveKP/Crediskill", // Relevant skills barter repo
    stats: "Stars: 8 | Active Users: 120+ | Status: Deployed",
    simulationCode: `// Sahayogi Swapping recommendation algorithm
def compute_bartering_match(users_db, current_user_id):
    current = users_db.get(current_user_id)
    matches = []
    for uid, profile in users_db.items():
        if uid == current_user_id: continue
        # Find matches where target offers what current wants, and vice-versa
        overlapping_offers = set(current['offers']).intersection(set(profile['wants']))
        overlapping_wants = set(current['wants']).intersection(set(profile['offers']))
        if overlapping_offers or overlapping_wants:
            score = len(overlapping_offers) * 50 + len(overlapping_wants) * 50
            matches.append({
                "username": profile['username'],
                "match_score": score,
                "overlap_exchange": list(overlapping_offers | overlapping_wants)
            })
    return sorted(matches, key=lambda x: x["match_score"], reverse=True)`
  },
  {
    id: "proj-3",
    slug: "skillbridge",
    name: "SkillBridge (CrediSkill)",
    description: "An offline-first platform designed to stimulate youth economic empowerment and localized employment matching in rural districts. Includes specialized skill logs, P2P credential syncing, and localized job caches.",
    tech: ["Java", "Android SDK", "Room Database", "Retrofit", "SQLite"],
    repoUrl: "https://github.com/HAliveKP/Crediskill",
    stats: "Stars: 19 | Downloads: 400+ | License: Apache-2.0",
    simulationCode: `@Entity(tableName = "skills_ledger")
public class SkillBridgeItem {
    @PrimaryKey(autoGenerate = true)
    private int id;
    
    @ColumnInfo(name = "user_handle")
    private String userHandle;
    
    @ColumnInfo(name = "certified_capability")
    private String certifiedCapability;
    
    @ColumnInfo(name = "reputation_index")
    private float reputationIndex;
    
    public SkillBridgeItem(String userHandle, String certifiedCapability, float reputationIndex) {
        this.userHandle = userHandle;
        this.certifiedCapability = certifiedCapability;
        this.reputationIndex = Math.min(reputationIndex, 5.0f);
    }
    // Getters and Setters ...
}`
  },
  {
    id: "proj-4",
    slug: "yolo_vision",
    name: "YOLO Vision Systems",
    description: "Cutting-edge computer vision system leveraging convolutional neural networks in YOLOv3 to execute highly dynamic Nepalese currency denomination classification and secure high-speed vehicle tracking.",
    tech: ["Python", "YOLOv3 / YOLOv8", "OpenCV", "PyTorch", "TensorFlow"],
    repoUrl: "https://github.com/HAliveKP/Student-Course-Registration-System", // Vision portfolio section
    stats: "Accuracy: 94.2% | Inference: 15ms | Status: Production Config",
    simulationCode: `# YOLOv3 / OpenCV Vehicle and Currency Detection Node
import cv2
import numpy as np

def process_vision_frame(net, output_names, frame, confidence_threshold=0.5):
    h, w = frame.shape[:2]
    # Feed image into YOLOv3 DNN
    blob = cv2.dnn.blobFromImage(frame, 1/255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    layer_outputs = net.forward(output_names)
    
    boxes, confidences, class_ids = [], [], []
    for output in layer_outputs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > confidence_threshold:
                # Localize bounding rect bounding coordinates
                center_x, center_y = int(detection[0] * w), int(detection[1] * h)
                width, height = int(detection[2] * w), int(detection[3] * h)
                x = int(center_x - width / 2)
                y = int(center_y - height / 2)
                boxes.append([x, y, width, height])
                confidences.append(float(confidence))
                class_ids.append(class_id)
                
    return {"classifications_count": len(boxes), "bounding_matrices": boxes, "accuracies": confidences}`
  },
  {
    id: "proj-5",
    slug: "registration_sys",
    name: "Student Course Registration System",
    description: "A secure, desktop-management platform constructed to easily schedule, catalog, query, and enforce academic pre-requisites mapping on tertiary registration pipelines.",
    tech: ["Java", "MySQL", "JDBC", "Log4j", "Swing UI"],
    repoUrl: "https://github.com/HAliveKP/Student-Course-Registration-System",
    stats: "Stars: 10 | Integrity Check: SHA-256 | Version: 1.0.4",
    simulationCode: `// Java Database Course pre-requisite integrity validation
public boolean registerStudentWithPreReqs(Connection conn, String studentId, String courseId) throws SQLException {
    String query = "SELECT prerequisite_id FROM course_prereqs WHERE course_id = ?";
    try (PreparedStatement stmt = conn.prepareStatement(query)) {
        stmt.setString(1, courseId);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            String preReq = rs.getString("prerequisite_id");
            if (!hasStudentPassedCourse(conn, studentId, preReq)) {
                System.out.println("[ACADEMIC DENY] Missing pre-requisite module: " + preReq);
                return false;
            }
        }
    }
    // Enroll operations ...
    return true;
}`
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
