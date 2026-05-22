# API Documentation

Complete API documentation for HK Cyber Terminal Portfolio.

## 📋 Base URL

**Development:** `http://localhost:3000`  
**Production:** `https://hk-cyber-terminal-portfolio.vercel.app`

## 📚 Endpoints

### 1. Get Projects Registry

**Endpoint:** `GET /api/projects`

**Description:** Retrieves all featured projects

**Response:**
```json
{
  "projects": [
    {
      "id": "proj-1",
      "slug": "greencompass",
      "name": "Green Compass",
      "description": "Carbon accounting engine...",
      "tech": ["Python", "Flask", "Tailwind CSS"],
      "repoUrl": "https://github.com/HAliveKP/GreenCompass",
      "stats": "Stars: 14 | Forks: 3",
      "simulationCode": "..."
    }
    // ... more projects
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 2. Get Skills Data

**Endpoint:** `GET /api/skills`

**Description:** Retrieves developer skills and proficiency levels

**Response:**
```json
{
  "skills": [
    {
      "category": "Languages",
      "items": ["Python", "JavaScript", "TypeScript", "Java"]
    },
    {
      "category": "Frontend",
      "items": ["React", "Tailwind CSS", "Vite"]
    }
    // ... more categories
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 3. Get Leaderboard

**Endpoint:** `GET /api/leaderboard`

**Description:** Retrieves current leaderboard rankings

**Query Parameters:**
- `limit` (optional): Max number of entries (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "username": "Player1",
      "score": 1500,
      "achievements": 5,
      "timestamp": "2024-05-20T10:30:00Z"
    }
    // ... more entries
  ],
  "total": 100
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 4. Submit Game Score

**Endpoint:** `POST /api/submit`

**Description:** Submit a game score and update leaderboard

**Request Body:**
```json
{
  "username": "PlayerName",
  "score": 1250,
  "gameMode": "classic",
  "timestamp": "2024-05-20T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "newRank": 5,
  "totalScore": 2500,
  "message": "Score submitted successfully"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid input
- `500` - Server error

**Validation:**
- `username`: Required, 3-20 characters
- `score`: Required, positive integer
- `gameMode`: Optional, predefined modes only

---

### 5. AI Chat Endpoint

**Endpoint:** `POST /api/chat`

**Description:** Send message to Gemini AI and get response

**Request Body:**
```json
{
  "message": "Tell me about your projects",
  "conversationId": "user123",
  "context": "portfolio"
}
```

**Response:**
```json
{
  "response": "Based on my portfolio, I've worked on several impactful projects...",
  "conversationId": "user123",
  "timestamp": "2024-05-20T10:30:00Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid input
- `429` - Rate limited
- `500` - Server/API error

**Request Limits:**
- Max message length: 2000 characters
- Rate limit: 10 requests per minute per IP

---

### 6. Health Check

**Endpoint:** `GET /api/health`

**Description:** Check server health status

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "version": "1.0.0"
}
```

**Status Codes:**
- `200` - Server healthy
- `503` - Server unavailable

---

## 🔑 Authentication

Currently, the API does **not require authentication**. Future versions will implement:
- API Key authentication
- OAuth2 integration
- JWT tokens

---

## 📊 Rate Limiting

- **General endpoints:** 30 requests/minute per IP
- **Chat endpoint:** 10 requests/minute per IP
- **Submit score:** 5 requests/minute per IP

**Headers:**
```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 28
X-RateLimit-Reset: 1621604460
```

---

## 🔄 CORS

**Allowed Origins:**
- `http://localhost:*` (development)
- `https://hk-cyber-terminal-portfolio.vercel.app` (production)
- `https://*.vercel.app` (preview deployments)

**Allowed Methods:**
- GET
- POST
- OPTIONS

---

## ❌ Error Responses

### General Error Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-05-20T10:30:00Z"
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| `INVALID_INPUT` | 400 | Validation failed |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |
| `GEMINI_ERROR` | 503 | Gemini API error |

---

## 💾 Data Formats

### Timestamps
All timestamps use ISO 8601 format:
```
2024-05-20T10:30:00Z
```

### Score Format
Scores are positive integers:
```
0 - 999999
```

### Username Format
Usernames follow these rules:
- 3-20 characters
- Alphanumeric + underscores/hyphens
- Case-insensitive storage
- Unique per submission

---

## 📱 Example Requests

### JavaScript/Fetch
```javascript
// Get projects
const projects = await fetch('/api/projects').then(r => r.json());

// Submit score
const result = await fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'Player1',
    score: 1250,
    gameMode: 'classic'
  })
}).then(r => r.json());

// Chat with AI
const chat = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Hello!',
    conversationId: 'user123'
  })
}).then(r => r.json());
```

### cURL
```bash
# Get leaderboard
curl https://api.yourdomain.com/api/leaderboard

# Submit score
curl -X POST https://api.yourdomain.com/api/submit \
  -H "Content-Type: application/json" \
  -d '{"username":"Player1","score":1250}'

# Health check
curl https://api.yourdomain.com/api/health
```

---

## 🔐 Security

- All endpoints use HTTPS in production
- No authentication currently required
- Input validation on all endpoints
- Rate limiting enabled
- CORS enabled for trusted origins

---

## 📈 API Versioning

Current version: `v1`

**Plan for v2:**
- Authentication system
- Enhanced filtering
- Webhook support
- GraphQL endpoint

---

## 📞 Support

- Issues: [GitHub Issues](https://github.com/HAliveKP/hk-cyber-terminal-portfolio/issues)
- Discussions: [GitHub Discussions](https://github.com/HAliveKP/hk-cyber-terminal-portfolio/discussions)

---

**Last Updated:** May 2024  
**API Version:** 1.0
