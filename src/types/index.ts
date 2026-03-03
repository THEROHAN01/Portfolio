export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  architecture: ArchitectureNode[];
  stack: string[];
  metrics: Metric[];
  github?: string;
  demo?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  connections: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface SystemDomain {
  title: string;
  description: string;
  icon: string;
}

export interface ExploringTopic {
  title: string;
  description: string;
}

export interface BlogPost {
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  slug: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}
