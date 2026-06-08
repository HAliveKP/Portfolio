# Architecture Documentation

Comprehensive overview of the HK Cyber Terminal Portfolio system architecture.

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Components](#components)
- [Data Flow](#data-flow)
- [Technology Stack](#technology-stack)
- [Design Patterns](#design-patterns)
- [Performance Considerations](#performance-considerations)
- [Security Architecture](#security-architecture)

---

## System Overview

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    Client Layer                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │         React 19 UI Components                            │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │   │
│  │  │   Boot       │  │  Terminal    │  │  Leaderboard     │ │   │
│  │  │  Screen      │  │  Dashboard   │  │   Display        │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘ │   │
│  └───────────────────────────────────────────────────────────┘   │
│                         ▲                                         │
└─────────────────────────┼─────────────────────────────────────────┘
                          │ HTTP/REST API
┌─────────────────────────┼─────────────────────────────────────────┐
│                Application Server Layer                           │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │         Express.js Server (Node.js)                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │   │
│  │  │   API        │  │  Gemini      │  │  Leaderboard     │ │   │
│  │  │  Routes      │  │  Integration │  │  Handler         │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘ │   │
│  └───────────────────────────────────────────────────────────┘   │
│                         ▲                                         │
└─────────────────────────┼─────────────────────────────────────────┘
                          │ REST/Network
┌─────────────────────────┼─────────────────────────────────────────┐
│              External Services & Storage                          │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  ┌──────────────────┐    ┌──────────────────┐             │   │
│  │  │  Google Gemini   │    │  JSON File       │             │   │
│  │  │  API             │    │  Storage         │             │   │
│  │  │  (AI Features)   │    │  (leaderboard)   │             │   │
│  │  └──────────────────┘    └──────────────────┘             │   │
│  └───────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
```

---

## Components

### Client-Side Components

#### Boot Screen
- Initial system load animation
- Authentication status
- System initialization feedback

#### Terminal Dashboard
- Command input interface
- Command history
- Real-time response display
- Syntax highlighting

#### Leaderboard Display
- User rankings
- Score display
- Performance metrics

### Server-Side Components

#### API Routes
- RESTful endpoints
- Route handlers
- Middleware stack
- Error handling

#### Gemini Integration
- AI response generation
- Context management
- Streaming responses
- Token counting

#### Leaderboard Handler
- Score management
- User ranking
- Data persistence
- Statistics calculation

---

## Project Structure

```
src/
│
├── components/
│   ├── BootScreen.tsx       # Boot sequence animation
│   ├── Terminal.tsx         # Terminal interface
│   ├── Leaderboard.tsx      # Leaderboard display
│   └── hooks/
│       └── useTerminal.ts   # Terminal logic hook
│
├── styles/
│   └── index.css            # Global styles
│
├── data/
│   └── portfolioData.ts     # Project data
│
├── types.ts                 # Type definitions
├── App.tsx                  # Root component
└── main.tsx                 # Entry point

api/
└── index.ts                 # Express server

lib_data/
└── leaderboard.json         # Leaderboard storage

public/                       # Static assets

dist/                         # Build output

package.json                  # Dependencies
vite.config.ts                # Build config
```

---

## Technology Stack

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS
- **Package Manager:** npm

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **API Style:** REST
- **Data Format:** JSON

### External Services
- **AI:** Google Gemini API
- **Deployment:** Vercel
- **Containerization:** Docker

### Development Tools
- **Version Control:** Git
- **CI/CD:** GitHub Actions
- **Code Quality:** ESLint, TypeScript

---

## Design Patterns

### Component Architecture
- Functional components with hooks
- Separation of concerns
- Reusable component hierarchy

### API Design
- RESTful principles
- JSON request/response format
- Standard HTTP methods
- Consistent error responses

### State Management
- React hooks for local state
- Props drilling for component communication
- Server state from API responses

### Error Handling
- Try-catch blocks
- Proper error propagation
- User-friendly error messages
- Logging for debugging

---

## Data Flow

### Request Flow
1. User input in Terminal component
2. API request via fetch or axios
3. Server processes request
4. External service integration (Gemini API)
5. Response formatting
6. Client-side state update
7. UI re-render

### Leaderboard Flow
1. Score submission from Terminal
2. Server validates score
3. Data persisted to leaderboard.json
4. Client fetches updated rankings
5. Leaderboard display updates

---

## Performance Considerations

### Frontend Optimization
- Code splitting with Vite
- Lazy loading of components
- CSS minification
- Image optimization

### Backend Optimization
- Response caching where appropriate
- Efficient data structures
- Request validation
- Rate limiting for APIs

### General Practices
- Database query optimization
- Compression (gzip)
- CDN for static assets
- Monitoring and logging

---

## Security Architecture

### Authentication
- User session management
- Secure token handling
- CORS configuration

### Data Protection
- Input validation and sanitization
- HTTPS/TLS encryption
- Secure headers (CSP, X-Frame-Options)
- CSRF protection

### API Security
- Rate limiting
- API key management
- Request validation
- Error message sanitization

### Deployment Security
- Environment variable management
- Secrets management
- Docker image scanning
- Regular dependency updates

---

## Scalability Strategies

### Horizontal Scaling
- Load balancing
- Multiple server instances
- Session persistence
- Database clustering

### Vertical Scaling
- Server resource allocation
- Database optimization
- Caching strategies
- Connection pooling

### Architecture Improvements
- Microservices consideration
- Message queues for heavy tasks
- Database sharding
- CDN distribution

---

## Deployment Architecture

### Development
- Local development environment
- Hot reload support
- Debug mode enabled

### Production
- Vercel deployment
- Docker containerization
- Environment-specific configuration
- Monitoring and alerting

### CI/CD Pipeline
- Automated testing
- Build verification
- Security scanning
- Automated deployment

---

## Future Considerations

### Potential Enhancements
- WebSocket integration for real-time updates
- Database integration (PostgreSQL/MongoDB)
- User authentication system
- Advanced caching strategy
- Machine learning features

### Architecture Evolution
- Migration to microservices if needed
- API versioning strategy
- Plugin system for extensibility
- Multi-tenant support

---

**Last Updated:** June 8, 2024
**Maintained by:** HK Cyber Terminal Team
