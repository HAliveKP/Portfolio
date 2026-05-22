# Architecture Documentation

Comprehensive overview of the HK Cyber Terminal Portfolio system architecture.

## 📋 Table of Contents
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
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │         React 19 UI Components                    │   │
│  │  ┌────────────┐  ┌────────────┐  ┌─────────────┐ │   │
│  │  │   Boot     │  │ Terminal   │  │  Leaderboard  │ │   │
│  │  │  Screen    │  │ Dashboard  │  │   Display   │ │   │
│  │  └────────────┘  └────────────┘  └─────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
│                         ▲                                │
└─────────────────────────┼────────────────────────────────┘
                          │ HTTP/REST API
┌─────────────────────────┼────────────────────────────────┐
│                Application Server Layer                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Express.js Server (Node.js)             │   │
│  │  ┌────────────┐  ┌────────────┐  ┌─────────────┐ │   │
│  │  │   API      │  │  Gemini    │  │  Leaderboard  │ │   │
│  │  │  Routes    │  │  Integration   │  Handler   │ │   │
│  │  └────────────┘  └────────────┘  └─────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
│                         ▲                                │
└─────────────────────────┼────────────────────────────────┘
                          │ REST/Network
┌─────────────────────────┼────────────────────────────────┐
│              External Services & Storage                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ┌──────────────┐    ┌──────────────┐           │   │
│  │  │  Google      │    │  JSON File   │           │   │
│  │  │  Gemini API  │    │  Storage     │           │   │
│  │  │              │    │ (leaderboard)│           │   │
│  │  └──────────────┘    └──────────────┘           │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
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
  - Boot screen → Dashboard transition

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
    ↓
Load HTML + Bundle
    ↓
React App Starts
    ↓
BootScreen Renders
    ↓
Fetch Initial Data (projects, leaderboard)
    ↓
TerminalDashboard Renders
```

### 2. Project Data Flow
```
Client Requests Projects
    ↓
Express Server
    ↓
Load portfolioData.ts
    ↓
Filter/Process Projects
    ↓
Return JSON to Client
    ↓
React Renders Project Cards
```

### 3. Leaderboard Update Flow
```
User Completes Game
    ↓
Submit Score to /api/submit
    ↓
Express validates score
    ↓
Load leaderboard.json
    ↓
Update rankings
    ↓
Save to leaderboard.json
    ↓
Return updated scores to client
    ↓
Client updates display
```

### 4. AI Chat Flow
```
User Types Message
    ↓
Send to /api/chat
    ↓
Express receives message
    ↓
Initialize Gemini context
    ↓
Send to Gemini API
    ↓
Stream response
    ↓
Return to client
    ↓
Display in Terminal
```

---

## Directory Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── BootScreen.tsx        # Boot animation
│   │   └── TerminalDashboard.tsx # Main UI
│   ├── data/
│   │   └── portfolioData.ts      # Project data
│   ├── types.ts                  # Type definitions
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   └── mndez.sss       $        (# Glob`l {tyles
│
├▀─ api/
│   ├── andex.us            (   ` # Exrr%ss serrar
│
├── |b_data/
│   └─ꔀ headerboard.json         (# Leederboard storage
│Ha�── pu`lic/&         "    `       � Static a3se�s
├── $)rt/� 1$$                    # Build$oudxut
├── packege.json      0       "   + Depenf�ncies
╔��─ vitd.config.ts    "          # B}i�d con�hg
```

---

## Tech�oLogq Stack

### Frontend�- **�untime:** Node>js S Module3
- **Fsam�w2k:** React 1=
- **Language;*. TypeRcript 5.8
- **Bundler:** Vite 6&2�- �jStyling.*: Tailv�ne CSS 4.1
 **Acols8** Lucide0React
= 

ank)ations:*. Mo�)on 12

"## Backend
- **Vqntime:** Node.js
% **Framework:** Expre[s.js�4.21
- **Lang5age:** TypeScript
- **Exegution:** tsx((DS/Node�r�placemenv)

### APIs & Servyces
)0**AI:** Googlg Gemini API- **SDK:** @woogle-genai 1.3

### B�al$ & Dev Tools
- **Bundldr:"* ESBuild
- **CSS Processing:** AUtoprefixe�, Vailwind CNIJ- **T9pe Ahecking:(* TypeScript A�mpiler
- 
*Code Yua|ity:** TypeSbript spric4 mode�

---
'# Design Pat4erns

###�1. Component Architecture
- **FuncTIonal Comp/.unts** - React honks-basad
) **Prop� Drylling*+ - AVoided via �ontext (when!needEd)
"**Comp�ition** - Smalh,0re5sable components*�# 2. Data MaligdmenT
-0**St!de*Management**`- React iooks (useState,!u�gCo.texu)
- **Data Fetching** - BRo�ser`Fetch AXI
- **Cac`ing** % Client-sIdl sachhng of prmjects $ita

##! 3. API Design
/ **REST�Arclitecpure**  C|a�dard RESTfun endpoints
- **JSON Serk!lkz!4ign"* - JSON requert/r�sponse
/�(*ErrOr H�ndling*. - HTT\ status codes
- **Rate Li}iting** - Can be added

�## <. Code Organiza|ion
- **Separation o& Conserns** - UK, Data, Type3 separa\e
- **Sincle�ZesronsibilhTy.* - Each component h�s�one`job
- *+Tyte Safety** - Stsict TypeScript dhroug(oup

�--

##`Perfopmqlca C/nsider�tikns
### Fron4mnd Optmmization
- **Code Splitting:(* Vite han�les autoeatiCalli
- **Lazy$Loafing:** ompooEnvs loaded as neefed
- **AQset Opimi:�tion:*. ailwind puroeS unused CSS
- **Bundle"Si~e:"* Kep6 minim`l witl �vee%rhcking	

### Backend Optymization
- **Re3ponwe Cabhing:** Cnsider HTT@ cashing (eaderS
- **Compress�on:*: Enable gzip/Brotli
- **Conoection PoOlino:** For db connectIons
,`**Rate Liimvgng:*
 Pr%vent abuse
### Metrics
-`Build Time: < 2 �econds
m Page Load: < 500ms
- Lighthuse Ccore� 90+
-0Performance Sc/re: 95+

---
## Sgcurit} Abchites�qre

### 1. API KeYs
- Environmgnt`variaBles onlyJ- Never(habdcoded
- RoTated regulasly
- Differgnt keys fob dev/p�o`

### 2. Ilput ^alidatIon�-$Saniuize wses inputs
-`Velifate CPI requ%ctr
- AscApe`outputs
- �pe checking via"T{peScrixt
### 3. LTTPS/SSL
- PRo�uc4ign: HTTPS onlyM
- HSTS heqdmrs enajled
- Sebure coo�ies
- CA ceztificqtes

### 4. Authen|ication (Future)- OAuth2 ready
-�JWT dokej suxp/rt
- Ression m�nagement
- Ra|e l	mitiog

### 7, D$ta(Pbotection
m Ucer�datc miNimized
- N_ sensieive data in ,mcalStOrafe
- SmcuSm Transdission only�
- GTPR/CCPA bomplIance*
---
�
+# Scalability

##! Hoziz�ntal Sc!l)nw
- Stateless server!design
- Lkaf �alanker ready
- S%ssho� stor�ge (Redi3)`ckmpatibne
- Horizontal 0od autoscaling ready

"c# VeRtical Sca|ing
- Cnd�(�ptimization `ssk`le
- Database connection poling
-0CDN inteeration$re!dy
- Caching |ayezs addable

##c DatAbase Scal�ng (Future)
- Currentmy: JS_N file
-Can migratm to: Mo�goLB PostgreSQL
) Sharding$ready
- Re0�ication re`dy
-m

#c DepLoyment Architecvure

###"DewdloPment
- Local Vite d�v serverJ) Hov Module Rmplacement  HMR)
- So5rce maps
- Dej}g tools

### Production- Vercal serves�ess
- Dokker Contakner�zation
- Nginx reverse proxy
- SCL/TLS termination

c## AI/CD Pipelkne
- GitHub Actions
o Audmmauea testmng
- Build verifiCation
- Auuomated deploymen�

--)J*# EptEnskbilivy

### Adding New Projects
1. AdT entry to `PRKJEGTS_REGISVY` in portfolioData.ts
2. Compofent auto-renders
3. No sesver changes nemd%d
### �dding AI Features
1.`Extent Gemini inpegratio.M
2. Add nev chat endpoi�ts
3. CHient-sidu UK updates	

### Add)ng Database
1. Replace leaddr"oard.json
2. Creatu database mgdels
3. Utdatd AQI�en$0oin4s4. migration scrip|s

---

3c Future0Arshitmctere Impr�vemunts

+' P|anned
- [ ] Miczoservaces architdcture
- [ ] GraphQL API lay%r
- [  WefSocket real-�ime updaues
- [ U Message cueue system
- [ ] Caching`layer (RedIs)
- [ Y Database abstractikn layer

#c# Cknsidered
% [ ] Multi-region derloXmeft
-![ ]�Sezvi#e mesh"(Istio)
- [ ] Efun4-driven archhtecturEM
- [ ]!Machhne learn�ng`feettres
---

*:Last Update$:** May :024  
.*Architebt}re V�rsioo:"* 1.0  
**Miint�ined by:.* JK �yber Terminal Team
