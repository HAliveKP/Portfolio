export type OutputLineType = 
  | "system" 
  | "user" 
  | "error" 
  | "success" 
  | "accent"
  | "ascii" 
  | "custom";

export interface TerminalLine {
  id: string;
  type: OutputLineType;
  text: string;
  componentName?: string; // Optional identifier to render special JSX widgets
  componentProps?: any;   // Props passed to the custom components
}

export interface ProjectDef {
  id: string;
  slug: string;
  name: string;
  description: string;
  tech: string[];
  repoUrl: string;
  stats: string;
  simulationCode: string;
}

export interface PuzzleDef {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  choices: string[];
  correctChoiceIndex: number;
  difficulty: "Normal" | "Extra Hard";
  points: number;
  explanation: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  difficulty: string;
  date: string;
}
