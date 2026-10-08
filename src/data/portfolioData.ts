/**
 * Harikrishna Pokhrel (HKP) - Portfolio Data
 * Centralized data file containing real repositories, profile links,
 * principles, journey milestones, and contact configuration.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  status: 'shipped' | 'in-progress';
  featured: boolean;
  tag?: string;
  badge?: string;
  repoComingSoon?: boolean;
  learned?: string;
  summary?: string;
}

export interface TimelineEntry {
  year: string;
  role: string;
  institution: string;
  location: string;
  description: string;
  highlights?: string[];
}

export interface Principle {
  number: string;
  title: string;
  subtitle: string;
  thesis: string;
  practicalExample: string;
  quote: string;
}

export interface NowItem {
  category: 'Building' | 'Learning' | 'Listening';
  headline: string;
  detail: string;
  meta?: string;
}

// REAL PROJECTS LIST (Strictly verified repositories)
export const PROJECTS: Project[] = [
  // 1. Bot (FEATURED)
  {
    id: 'bot',
    title: 'Bot',
    description:
      'Natural-language Discord admin bot: LLM planner + discord.py + Docker. Release v1.0.0, has a CI workflow badge.',
    stack: ['Python', 'discord.py', 'FastAPI', 'Redis', 'Docker', 'GitHub Actions'],
    repoUrl: 'https://github.com/HAliveKP/Bot',
    status: 'shipped',
    featured: true,
    tag: 'FEATURED // 01',
    badge: 'RELEASE v1.0.0 · CI PASSING',
  },
  // 2. smart-research-assistant (FEATURED)
  {
    id: 'smart-research-assistant',
    title: 'smart-research-assistant',
    description:
      'Multi-agent AI research assistant (capstone): orchestrator, researcher, analyzer and writer agents with tool integration (MCP) and memory.',
    stack: ['Python'],
    repoUrl: 'https://github.com/HAliveKP/smart-research-assistant',
    status: 'shipped',
    featured: true,
    tag: 'FEATURED // 02',
    badge: 'CAPSTONE PROJECT',
  },
  // 3. GreenCompass (FEATURED)
  {
    id: 'green-compass',
    title: 'GreenCompass',
    description:
      'Carbon intelligence dashboard for Nepal: real-time carbon index tracking with React, Vite, Tailwind and Google Gemini AI.',
    liveUrl: 'https://green-compass-seven.vercel.app',
    repoUrl: 'https://github.com/HAliveKP/GreenCompass',
    stack: ['JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Google Gemini API'],
    status: 'shipped',
    featured: true,
    tag: 'FEATURED // 03',
    badge: 'LIVE DEMO DEPLOYED',
  },
  // 4. Crediskill (SECONDARY)
  {
    id: 'crediskill',
    title: 'Crediskill',
    description:
      'CrediSkill Nepal: hackathon platform connecting skills with fair-paying jobs. Skill quizzes, job listings, leaderboards.',
    stack: ['Node.js', 'Express', 'SQLite', 'HTML'],
    repoUrl: 'https://github.com/HAliveKP/Crediskill',
    status: 'shipped',
    featured: false,
    tag: 'SECONDARY // 04',
    badge: 'HACKATHON PLATFORM',
    learned: 'Building transactional job matching and quiz ranking with SQLite and express sessions under hackathon constraints.',
    summary: 'Hackathon job and skill platform with SQLite backend.',
  },
  // 5. Student-Course-Registration-System (SECONDARY)
  {
    id: 'student-course-registration-system',
    title: 'Student-Course-Registration-System',
    description:
      'Web-based course registration system built with Flask and OOP architecture, with a glassmorphism UI.',
    stack: ['Python', 'Flask', 'HTML'],
    repoUrl: 'https://github.com/HAliveKP/Student-Course-Registration-System',
    status: 'shipped',
    featured: false,
    tag: 'SECONDARY // 05',
    badge: 'OOP ARCHITECTURE',
    learned: 'Designing clean object-oriented domain classes and modular Flask routes for student enrollment states.',
    summary: 'Course registration system with OOP architecture.',
  },
  // 6. Khula Gyan (IN PROGRESS - separate "Currently building" card)
  {
    id: 'khula-gyan',
    title: 'Khula Gyan',
    description:
      'Open-source RAG assistant for Nepali civic documents with page-level citations.',
    stack: ['Python', 'RAG', 'Vector Search'],
    status: 'in-progress',
    featured: false,
    tag: 'CURRENTLY BUILDING',
    repoComingSoon: true,
  },
];

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Harikrishna Pokhrel',
    handle: 'HKP',
    title: 'AI Student & Builder',
    location: 'Kathmandu, Nepal',
    timezone: 'UTC+05:45 (NPT)',
    coordinates: '27.7172° N, 85.3240° E',
    education: 'BSc (Hons) AI at Coventry University via Softwarica College',
    tagline: 'I build things to figure them out.',
    status: 'CURRENTLY BUILDING // KHULA GYAN',
    resumeUrl: '/resume.pdf',
    email: 'hpokhrel794@gmail.com',
    github: 'https://github.com/HAliveKP',
    portfolioUrl: 'https://harikrishnapokhrel.com.np/',
    linkedin: 'https://www.linkedin.com/in/harikrishna-pokhrel',
  },

  // Real facts proof strip (verified real count)
  proofFacts: [
    {
      label: 'DEGREE',
      value: 'BSc AI at Coventry via Softwarica',
      sub: 'Coventry University · Kathmandu Campus',
    },
    {
      label: 'CODEBASE',
      value: '9 public repos',
      sub: 'Verified repositories on GitHub',
    },
    {
      label: 'LEADERSHIP',
      value: 'Founding member, AWS Cloud Club',
      sub: 'Softwarica / Kathmandu student chapter',
    },
    {
      label: 'BASE',
      value: 'Kathmandu, Nepal',
      sub: 'Himalayan foothills · UTC +5:45',
    },
  ],

  // One PROJECTS array
  projects: PROJECTS,

  // 3 Core Principles ("How I Think")
  principles: [
    {
      number: '01',
      title: 'Human-in-the-Loop Safety Gates',
      subtitle: 'AUTONOMY WITH EXPLICIT BOUNDARIES',
      thesis:
        'Irreversible actions must never execute purely on a probabilistic token prediction. When software writes to disk, alters external databases, or sends messages, it requires deterministic human authorization.',
      practicalExample:
        'In Discord admin bots and agentic execution pipelines, tool execution with side-effects requires explicit verification barriers before running.',
      quote:
        'Autonomous agents should propose; humans must authorize.',
    },
    {
      number: '02',
      title: 'Grounded Answers With Citations',
      subtitle: 'NO UNVERIFIABLE SPECULATION',
      thesis:
        'Unbounded language models hallucinate by mathematical design. High-integrity AI engineering requires binding every claim to verified source passages, and celebrating "I don’t know" as the correct answer when facts are absent.',
      practicalExample:
        'In Khula Gyan, if a query lacks verifiable similarity to indexed civic documents, the model does not guess—it returns an honest refusal.',
      quote:
        'A confident lie is worse than an honest refusal.',
    },
    {
      number: '03',
      title: 'Build Toy Versions to Understand',
      subtitle: 'FIRST-PRINCIPLES CRAFTSMANSHIP',
      thesis:
        'Using an API wrapper teaches syntax; building a miniature version from scratch teaches architecture. True intuition begins when you implement attention masks, gradient descent, and multi-agent coordination with your own hands.',
      practicalExample:
        'Writing multi-agent orchestration loops and course registration systems from scratch clarifies system design trade-offs.',
      quote:
        'If you can’t build a miniature version from first principles, you only have an illusion of understanding.',
    },
  ] as Principle[],

  // Journey timeline
  timeline: [
    {
      year: '2026',
      role: 'BSc Artificial Intelligence & Applied Research',
      institution: 'Coventry University · Softwarica College',
      location: 'Kathmandu, Nepal',
      description:
        'Focusing on grounded retrieval architectures, multi-agent AI research tooling, and open developer systems. Building Khula Gyan for Nepali civic documents.',
      highlights: [
        'Developing Khula Gyan open-source RAG assistant',
        'Exploring multi-agent tool integrations (MCP) and LLM planner runtimes',
      ],
    },
    {
      year: '2025',
      role: 'Founding Member & Technical Lead',
      institution: 'AWS Cloud Club — Softwarica Chapter',
      location: 'Kathmandu, Nepal',
      description:
        'Helped establish the official student cloud community at Softwarica. Conducted technical hands-on sessions on AWS cloud architecture, containerized deployments, and developer tooling.',
      highlights: [
        'Organized student hackathons and AWS cloud architecture walkthroughs',
        'Mentored peers transitioning from basic scripting to production deployments',
      ],
    },
    {
      year: '2024',
      role: 'AI Foundations & Software Architecture',
      institution: 'Coventry University (Softwarica College of IT & E-Commerce)',
      location: 'Kathmandu, Nepal',
      description:
        'Commenced degree curriculum in Artificial Intelligence. Built foundational software architectures, OOP registration systems, and exploratory Discord integrations.',
      highlights: [
        'Implemented CrediSkill Nepal hackathon platform and Flask course registration',
        'Deep-dived into linear algebra, calculus, and multi-agent systems',
      ],
    },
    {
      year: '2023',
      role: 'Self-Taught Exploration & Software Craftsmanship',
      institution: 'Independent Learner & Musician',
      location: 'Kathmandu, Nepal',
      description:
        'Formed habits in systems programming, Python, and open-source exploration. Discovered structural parallels between musical composition and software architecture.',
      highlights: [
        'Explored acoustic songwriting and sound synthesis alongside Python scripting',
        'Committed to studying artificial intelligence systems engineering',
      ],
    },
  ] as TimelineEntry[],

  // Beyond Code: Music & Songwriting
  beyondCode: {
    heading: 'The Shared Discipline of Composition',
    quote:
      'Writing an acoustic song and architecting a software pipeline draw from the exact same creative muscle: establishing a motif, managing tension, cutting the superfluous, and iterating until the idea resonates without friction.',
    essay: [
      'In engineering, we spend hours eliminating unnecessary dependencies, tuning latency, and making sure every component has a single crisp responsibility. In songwriting, the process is identical: removing unnecessary words from a lyric, finding the right vocal phrasing, and balancing harmonic tension with resolution.',
      'Both crafts demand patient listening and obsessive editing. A melody that feels inevitable didn’t start that way—it was whittled down through twenty iterations. The same discipline applies to a clean retrieval engine or an elegant CLI.',
    ],
    tracks: [
      {
        title: 'Kathmandu Nightscape',
        key: 'D Minor',
        tempo: '78 BPM',
        notes: 'Acoustic fingerstyle theme with subtle ambient synth pads',
        mood: 'Reflective, atmospheric, monastic',
      },
      {
        title: 'First Principles',
        key: 'A Major',
        tempo: '92 BPM',
        notes: 'Minimalist melodic motif exploring cadence and structural release',
        mood: 'Focus, drive, clarity',
      },
    ],
  },

  // Now card
  now: {
    updated: 'UPDATED OCT 2026',
    items: [
      {
        category: 'Building' as const,
        headline: 'Khula Gyan & Multi-Agent Tooling',
        detail:
          'Open-source RAG assistant for Nepali civic documents with page-level citations.',
        meta: 'Active sprint · Open Source',
      },
      {
        category: 'Learning' as const,
        headline: 'Multi-Agent MCP Tooling & LLM Planners',
        detail:
          'Studying tool integration protocols, orchestrator-researcher-writer agent patterns, and memory systems.',
        meta: 'Python · Docker · Multi-Agent',
      },
      {
        category: 'Listening' as const,
        headline: 'Acoustic fingerpicking & ambient neo-classical',
        detail:
          'Deep listening into organic acoustic recordings, Julian Lage, and minimal piano arrangements.',
        meta: 'D-28 acoustic · Studio headphones',
      },
    ],
  },

  // Contact info
  contact: {
    headline: "If something here made you curious, let's talk.",
    subtext:
      'Whether you are building AI agents, researching civic document retrieval, or want to discuss software craftsmanship and acoustic music, my inbox is open.',
    formspreeId: 'YOUR_FORM_ID',
    links: [
      {
        label: 'EMAIL',
        display: 'hpokhrel794@gmail.com',
        href: 'mailto:hpokhrel794@gmail.com',
        actionLabel: 'COPY / WRITE',
      },
      {
        label: 'GITHUB',
        display: 'github.com/HAliveKP',
        href: 'https://github.com/HAliveKP',
        actionLabel: 'BROWSE CODE',
      },
      {
        label: 'LINKEDIN',
        display: 'linkedin.com/in/harikrishna-pokhrel',
        href: 'https://www.linkedin.com/in/harikrishna-pokhrel',
        actionLabel: 'CONNECT',
      },
    ],
  },
};
