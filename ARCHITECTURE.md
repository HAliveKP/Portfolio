# Architecture Documentation

Comprehensive overview of the HK Cyber Terminal Portfolio system architecture.

## ğŸ“‹ Table of Contents
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�
â”‚                    Client Layer                         â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�   â”‚
â”‚  â”‚         React 19 UI Components                    â”‚   â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”� â”‚   â”‚
â”‚  â”‚  â”‚   Boot     â”‚  â”‚ Terminal   â”‚  â”‚  Leaderboard  â”‚ â”‚   â”‚
â”‚  â”‚  â”‚  Screen    â”‚  â”‚ Dashboard  â”‚  â”‚   Display   â”‚ â”‚   â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚                         â–²                                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚ HTTP/REST API
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�
â”‚                Application Server Layer                  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�   â”‚
â”‚  â”‚         Express.js Server (Node.js)             â”‚   â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”� â”‚   â”‚
â”‚  â”‚  â”‚   API      â”‚  â”‚  Gemini    â”‚  â”‚  Leaderboard  â”‚ â”‚   â”‚
â”‚  â”‚  â”‚  Routes    â”‚  â”‚  Integration   â”‚  Handler   â”‚ â”‚   â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚                         â–²                                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚ REST/Network
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�
â”‚              External Services & Storage                 â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�   â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”�           â”‚   â”‚
â”‚  â”‚  â”‚  Google      â”‚    â”‚  JSON File   â”‚           â”‚   â”‚
â”‚  â”‚  â”‚  Gemini API  â”‚    â”‚  Storage     â”‚           â”‚   â”‚
â”‚  â”‚  â”‚              â”‚    â”‚ (leaderboard)â”‚           â”‚   â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜           â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Components

### Frontend Components

#### 1. **BootScreen.tsx**
- Purpose: Initial system boot animation
- Features:
  - Animated boot sequence
  - Loading state management
  - ASCII terminal effects
- Props: Loading status, animation timing

#### 2. **TerminalDashboard.tsx**
- Purpose: Main interactive dashboard
- Sections:
  - System diagnostics panel
  - Project showcase
  - Skills matrix
  - Message interface
  - Game/leaderboard integration
- State: User interaction, game state, messages

#### 3. **App.tsx**
- Purpose: Root component and orchestration
- Responsibilities:
  - Context providers
  - Route management
  - Global state initialization
  - Boot screen â†’ Dashboard transition

#### 4. **Types (types.ts)**
- Purpose: TypeScript type definitions
- Contains:
  - Project definitions
  - Puzzle definitions
  - Skill types
  - Message types
  - Leaderboard types

### Backend Components

#### 1. **Express Server (api/index.ts)**
- Purpose: API endpoint handling
- Endpoints:
  - `/api/projects` - Get project list
  - `/api/skills` - Get skills data
  - `/api/leaderboard` - Get/update leaderboard
  - `/api/chat` - Gemini AI chat
  - `/api/submit` - Submit game results

#### 2. **Gemini Integration**
- Purpose: AI chat functionality
- Integration:
  - Initialize Gemini client
  - Handle conversation context
  - Stream responses
  - Error handling

#### 3. **Leaderboard Handler**
- Purpose: Score management
- Functions:
  - Load leaderboard from JSON
  - Add/update scores
  - Sort rankings
  - Save to file

### Data Layer

#### 1. **portfolioData.ts**
- Contains:
  - Project registry (5 major projects)
  - Puzzle definitions
  - Skill categories
  - Static content

#### 2. **leaderboard.json**
- Stores:
  - User scores
  - Achievements
  - Rankings
  - Timestamps

#### 3. **Environment Variables**
- Stores:
  - GEMINI_API_KEY
  - NODE_ENV
  - Optional: Database credentials

---

## Data Flow

### 1. Application Initialization
```
User Opens App
    â†“
Load HTML + Bundle
    â†“
React App Starts
    â†“
BootScreen Renders
    â†“
Fetch Initial Data (projects, leaderboard)
    â†“
TerminalDashboard Renders
```

### 2. Project Data Flow
```
Client Requests Projects
    â†“
Express Server
    â†“
Load portfolioData.ts
    â†“
Filter/Process Projects
    â†“
Return JSON to Client
    â†“
React Renders Project Cards
```

### 3. Leaderboard Update Flow
```
User Completes Game
    â†“
Submit Score to /api/submit
    â†“
Express validates score
    â†“
Load leaderboard.json
    â†“
Update rankings
    â†“
Save to leaderboard.json
    â†“
Return updated scores to client
    â†“
Client updates display
```

### 4. AI Chat Flow
```
User Types Message
    â†“
Send to /api/chat
    â†“
Express receives message
    â†“
Initialize Gemini context
    â†“
Send to Gemini API
    â†“
Stream response
    â†“
Return to client
    â†“
Display in Terminal
```

---

## Directory Structure

```
project-root/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ BootScreen.tsx        # Boot animation
â”‚   â”‚   â””â”€â”€ TerminalDashboard.tsx # Main UI
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â””â”€â”€ portfolioData.ts      # Project data
â”‚   â”œâ”€â”€ types.ts                  # Type definitions
â”‚   â”œâ”€â”€ App.tsx                   # Root component
â”‚   â”œâ”€â”€ main.tsx                  # Entry point
â”‚   â””â”€â”€ mndez.sss       $        (# Glob`l {tyles
â”‚
â”œâ–€â”€ api/
â”‚   â”œâ”€â”€ andex.us            (   ` # Exrr%ss serrar
â”‚
â”œâ”€â”€ |b_data/
â”‚   â””â”€ê”€ headerboard.json         (# Leederboard storage
â”‚Haœâ”€â”€ pu`lic/&         "    `       £ Static a3seôs
â”œâ”€â”€ $)rt/  1$$                    # Build$oudxut
â”œâ”€â”€ packege.json      0       "   + Depenfåncies
â•”ò´Àâ”€ vitd.config.ts    "          # B}iìd conæhg
```

---

## TechîoLogq Stack

### Frontend‚- **Öuntime:** Node>js S Module3
- **FsamÅw2k:** React 1=
- **Language;*. TypeRcript 5.8
- **Bundler:** Vite 6&2‹- ªjStyling.*: Tailvéne CSS 4.1
 **Acols8** Lucide0React
= 

ank)ations:*. Moô)on 12

"## Backend
- **Vqntime:** Node.js
% **Framework:** Expre[s.js 4.21
- **Lang5age:** TypeScript
- **Exegution:** tsx((DS/Node råplacemenv)

### APIs & Servyces
)0**AI:** Googlg Gemini API- **SDK:** @woogle-genai 1.3

### Bµal$ & Dev Tools
- **Bundldr:"* ESBuild
- **CSS Processing:** AUtoprefixeò, Vailwind CNIJ- **T9pe Ahecking:(* TypeScript Aïmpiler
- 
*Code Yua|ity:** TypeSbript spric4 mode�

---
'# Design Pat4erns

### 1. Component Architecture
- **FuncTIonal Comp/.unts** - React honks-basad
) **Propó Drylling*+ - AVoided via Ãontext (when!needEd)
"**Compóition** - Smalh,0re5sable components*ã# 2. Data MaligdmenT
-0**St!de*Management**`- React iooks (useState,!uógCo.texu)
- **Data Fetching** - BRo÷ser`Fetch AXI
- **Cac`ing** % Client-sIdl sachhng of prmjects $ita

##! 3. API Design
/ **REST Arclitecpure**  C|aîdard RESTfun endpoints
- **JSON Serk!lkz!4ign"* - JSON requert/råsponse
/ (*ErrOr Hándling*. - HTT\ status codes
- **Rate Li}iting** - Can be added

£## <. Code Organiza|ion
- **Separation o& Conserns** - UK, Data, Type3 separa\e
- **Sincle ZesronsibilhTy.* - Each component hás one`job
- *+Tyte Safety** - Stsict TypeScript dhroug(oup

­--

##`Perfopmqlca C/nsiderátikns
### Fron4mnd Optmmization
- **Code Splitting:(* Vite hanìles autoeatiCalli
- **Lazy$Loafing:** ompooEnvs loaded as neefed
- **AQset Opimi:átion:*. ailwind puroeS unused CSS
- **Bundle"Si~e:"* Kep6 minim`l witl ôvee%rhcking	

### Backend Optymization
- **Re3ponwe Cabhing:** Cnsider HTT@ cashing (eaderS
- **Compresséon:*: Enable gzip/Brotli
- **Conoection PoOlino:** For db connectIons
,`**Rate Liimvgng:*
 Pr%vent abuse
### Metrics
-`Build Time: < 2 óeconds
m Page Load: < 500ms
- Lighthuse Ccoreº 90+
-0Performance Sc/re: 95+

---
## Sgcurit} Abchitesôqre

### 1. API KeYs
- Environmgnt`variaBles onlyJ- Never(habdcoded
- RoTated regulasly
- Differgnt keys fob dev/pòo`

### 2. Ilput ^alidatIonŠ-$Saniuize wses inputs
-`Velifate CPI requ%ctr
- AscApe`outputs
- ıpe checking via"T{peScrixt
### 3. LTTPS/SSL
- PRoäuc4ign: HTTPS onlyM
- HSTS heqdmrs enajled
- Sebure cooëies
- CA ceztificqtes

### 4. Authen|ication (Future)- OAuth2 ready
- JWT dokej suxp/rt
- Ression mánagement
- Ra|e l	mitiog

### 7, D$ta(Pbotection
m Ucer datc miNimized
- N_ sensieive data in ,mcalStOrafe
- SmcuSm Transdission only�
- GTPR/CCPA bomplIance*
---
�
+# Scalability

##! Hozizïntal Sc!l)nw
- Stateless server!design
- Lkaf âalanker ready
- S%sshoî storáge (Redi3)`ckmpatibne
- Horizontal 0od autoscaling ready

"c# VeRtical Sca|ing
- CndÅ(ïptimization `ssk`le
- Database connection poling
-0CDN inteeration$re!dy
- Caching |ayezs addable

##c DatAbase Scaléng (Future)
- Currentmy: JS_N file
-Can migratm to: MoîgoLB PostgreSQL
) Sharding$ready
- Re0äication re`dy
-m

#c DepLoyment Architecvure

###"DewdloPment
- Local Vite dåv serverJ) Hov Module Rmplacement  HMR)
- So5rce maps
- Dej}g tools

### Production- Vercal servesìess
- Dokker Contaknerézation
- Nginx reverse proxy
- SCL/TLS termination

c## AI/CD Pipelkne
- GitHub Actions
o Audmmauea testmng
- Build verifiCation
- Auuomated deploymenô

--)J*# EptEnskbilivy

### Adding New Projects
1. AdT entry to `PRKJEGTS_REGISVY` in portfolioData.ts
2. Compofent auto-renders
3. No sesver changes nemd%d
### Ádding AI Features
1.`Extent Gemini inpegratio.M
2. Add nev chat endpoişts
3. CHient-sidu UK updates	

### Add)ng Database
1. Replace leaddr"oard.json
2. Creatu database mgdels
3. Utdatd AQI en$0oin4s4. migration scrip|s

---

3c Future0Arshitmctere Imprïvemunts

+' P|anned
- [ ] Miczoservaces architdcture
- [ ] GraphQL API lay%r
- [  WefSocket real-ôime updaues
- [ U Message cueue system
- [ ] Caching`layer (RedIs)
- [ Y Database abstractikn layer

#c# Cknsidered
% [ ] Multi-region derloXmeft
-![ ] Sezvi#e mesh"(Istio)
- [ ] Efun4-driven archhtecturEM
- [ ]!Machhne learnéng`feettres
---

*:Last Update$:** May :024  
.*Architebt}re Vårsioo:"* 1.0  
**Miintáined by:.* JK Ãyber Terminal Team
