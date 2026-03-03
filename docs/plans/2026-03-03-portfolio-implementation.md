# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium developer portfolio for Rohan Salunkhe with interactive terminal, architecture diagrams, GitHub activity, and scroll-driven animations.

**Architecture:** Single-page Next.js App Router site. Server components by default, client islands for interactivity. Data in `lib/data.ts` for easy content swapping.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion (motion/react), Inter + JetBrains Mono fonts.

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: entire project scaffold via create-next-app

**Step 1: Create Next.js app**

Run from the Portfolio directory (the project files should be created directly here, not in a subdirectory):

```bash
cd /home/rohan/playground/Portfolio
npx create-next-app@latest . --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

If prompted about existing files, accept overwrite.

**Step 2: Install dependencies**

```bash
npm install motion
```

**Step 3: Verify dev server starts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML output from Next.js default page.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with TypeScript, Tailwind, Motion"
```

---

### Task 2: Configure Design Tokens & Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Replace globals.css with design token system**

Replace the entire contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg: #000000;
  --color-surface: #111111;
  --color-surface-hover: #1a1a1a;
  --color-border: #222222;
  --color-text-primary: #ededed;
  --color-text-muted: #888888;
  --color-accent: #0070f3;
  --color-accent-hover: #0060d0;
  --color-accent-glow: rgba(0, 112, 243, 0.15);

  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--color-accent);
  color: white;
}
```

**Step 2: Update layout.tsx with fonts and metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohan Salunkhe — AI Engineer & Systems Builder",
  description:
    "I engineer systems that think, scale, and ship. AI Engineer building intelligent systems at Kpoint Technologies.",
  keywords: [
    "AI Engineer",
    "Systems Architecture",
    "Full Stack Developer",
    "Machine Learning",
    "Distributed Systems",
  ],
  authors: [{ name: "Rohan Salunkhe" }],
  openGraph: {
    title: "Rohan Salunkhe — AI Engineer & Systems Builder",
    description:
      "I engineer systems that think, scale, and ship.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Salunkhe — AI Engineer & Systems Builder",
    description:
      "I engineer systems that think, scale, and ship.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 3: Verify the app renders with correct fonts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | grep -o 'Inter\|JetBrains'
kill %1
```

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: configure design tokens, fonts, and SEO metadata"
```

---

### Task 3: Create Type Definitions & Data Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/data.ts`

**Step 1: Create type definitions**

Create `src/types/index.ts`:

```ts
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
```

**Step 2: Create data layer with all placeholder content**

Create `src/lib/data.ts`:

```ts
import { Project, SystemDomain, ExploringTopic, BlogPost } from "@/types";

export const projects: Project[] = [
  {
    id: "aether",
    title: "Aether",
    subtitle: "AI-Powered Document Intelligence Pipeline",
    description:
      "Built a RAG pipeline that processes 10K+ documents with sub-second retrieval, replacing a manual review process that took days.",
    problem:
      "Enterprise teams spent 40+ hours weekly manually searching through thousands of unstructured documents. Existing keyword search missed semantic relationships and context.",
    architecture: [
      {
        id: "ingest",
        label: "Ingestion Layer",
        description: "PDF/DOCX parser with chunking strategies",
        x: 50,
        y: 50,
        connections: ["embed"],
      },
      {
        id: "embed",
        label: "Embedding Service",
        description: "OpenAI Ada-002 with batch processing",
        x: 250,
        y: 50,
        connections: ["vector"],
      },
      {
        id: "vector",
        label: "Vector Store",
        description: "Pinecone with metadata filtering",
        x: 450,
        y: 50,
        connections: ["retrieval"],
      },
      {
        id: "retrieval",
        label: "Retrieval Engine",
        description: "Hybrid search: vector + BM25 reranking",
        x: 350,
        y: 180,
        connections: ["llm"],
      },
      {
        id: "llm",
        label: "LLM Orchestrator",
        description: "GPT-4 with citation grounding",
        x: 150,
        y: 180,
        connections: [],
      },
    ],
    stack: ["Python", "FastAPI", "Pinecone", "LangChain", "Redis", "Docker"],
    metrics: [
      { value: "10x", label: "Faster retrieval" },
      { value: "<200ms", label: "p95 latency" },
      { value: "94%", label: "Answer accuracy" },
    ],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "nexus",
    title: "Nexus",
    subtitle: "Real-Time Event Processing System",
    description:
      "Designed a distributed event processing pipeline handling 50K events/sec with exactly-once delivery guarantees.",
    problem:
      "Legacy batch processing introduced 15-minute data delays. Business decisions relied on stale data, and the monolithic processor couldn't scale horizontally.",
    architecture: [
      {
        id: "producers",
        label: "Event Producers",
        description: "gRPC services with protobuf schemas",
        x: 50,
        y: 100,
        connections: ["kafka"],
      },
      {
        id: "kafka",
        label: "Kafka Cluster",
        description: "3-broker setup with partitioned topics",
        x: 250,
        y: 100,
        connections: ["processors"],
      },
      {
        id: "processors",
        label: "Stream Processors",
        description: "Go workers with consumer groups",
        x: 450,
        y: 100,
        connections: ["store", "alerts"],
      },
      {
        id: "store",
        label: "TimescaleDB",
        description: "Time-series storage with compression",
        x: 350,
        y: 220,
        connections: [],
      },
      {
        id: "alerts",
        label: "Alert Engine",
        description: "Rule-based + anomaly detection",
        x: 550,
        y: 220,
        connections: [],
      },
    ],
    stack: ["Go", "Kafka", "TimescaleDB", "gRPC", "Kubernetes", "Prometheus"],
    metrics: [
      { value: "50K/s", label: "Events processed" },
      { value: "99.99%", label: "Uptime" },
      { value: "<5ms", label: "End-to-end latency" },
    ],
    github: "https://github.com",
  },
  {
    id: "cortex",
    title: "Cortex",
    subtitle: "Multi-Agent Orchestration Framework",
    description:
      "Built a framework for orchestrating autonomous AI agents with tool-use, memory, and collaborative task decomposition.",
    problem:
      "Single-agent LLM systems hit capability ceilings on complex tasks. No existing framework handled inter-agent communication, shared memory, and dynamic task routing well.",
    architecture: [
      {
        id: "orchestrator",
        label: "Orchestrator",
        description: "Task decomposition & routing DAG",
        x: 250,
        y: 50,
        connections: ["agents"],
      },
      {
        id: "agents",
        label: "Agent Pool",
        description: "Specialized agents with tool access",
        x: 250,
        y: 170,
        connections: ["memory", "tools"],
      },
      {
        id: "memory",
        label: "Shared Memory",
        description: "Vector + key-value hybrid store",
        x: 80,
        y: 170,
        connections: [],
      },
      {
        id: "tools",
        label: "Tool Registry",
        description: "Dynamic tool binding & execution",
        x: 420,
        y: 170,
        connections: [],
      },
    ],
    stack: ["Python", "LangGraph", "Redis", "PostgreSQL", "WebSockets"],
    metrics: [
      { value: "3x", label: "Task completion rate" },
      { value: "8", label: "Agent types" },
      { value: "< 2s", label: "Agent response" },
    ],
    github: "https://github.com",
  },
  {
    id: "sentinel",
    title: "Sentinel",
    subtitle: "Infrastructure Monitoring with Anomaly Detection",
    description:
      "ML-powered monitoring system that detects infrastructure anomalies 15 minutes before they impact users.",
    problem:
      "Static threshold alerts generated 200+ false positives daily. Engineers suffered alert fatigue and missed real incidents buried in noise.",
    architecture: [
      {
        id: "collectors",
        label: "Metric Collectors",
        description: "Prometheus exporters across services",
        x: 50,
        y: 100,
        connections: ["tsdb"],
      },
      {
        id: "tsdb",
        label: "Prometheus TSDB",
        description: "15s scrape interval, 30d retention",
        x: 250,
        y: 100,
        connections: ["ml", "grafana"],
      },
      {
        id: "ml",
        label: "ML Pipeline",
        description: "Isolation Forest + LSTM ensemble",
        x: 450,
        y: 100,
        connections: ["alerting"],
      },
      {
        id: "grafana",
        label: "Grafana",
        description: "Real-time dashboards",
        x: 250,
        y: 230,
        connections: [],
      },
      {
        id: "alerting",
        label: "Smart Alerting",
        description: "Severity scoring & dedup",
        x: 450,
        y: 230,
        connections: [],
      },
    ],
    stack: ["Python", "Prometheus", "Grafana", "scikit-learn", "Kafka", "Docker"],
    metrics: [
      { value: "92%", label: "Alert precision" },
      { value: "15min", label: "Early detection" },
      { value: "85%", label: "Fewer false alerts" },
    ],
    github: "https://github.com",
  },
];

export const systemDomains: SystemDomain[] = [
  {
    title: "Scalability",
    description: "Designing for 10x, building for 100x. Horizontal scaling, sharding, caching layers.",
    icon: "scale",
  },
  {
    title: "AI Systems",
    description: "Beyond chatbots — agents, retrieval-augmented generation, reasoning chains, tool use.",
    icon: "brain",
  },
  {
    title: "Clean Architecture",
    description: "Boundaries, contracts, testability. Code that communicates intent.",
    icon: "layers",
  },
  {
    title: "Performance",
    description: "Every millisecond is a decision. Profiling, optimization, efficient algorithms.",
    icon: "zap",
  },
  {
    title: "Distributed Systems",
    description: "Consensus, fault tolerance, eventual consistency. CAP theorem in practice.",
    icon: "network",
  },
  {
    title: "Developer Experience",
    description: "APIs developers actually want to use. Clear errors, great docs, intuitive design.",
    icon: "terminal",
  },
];

export const exploringTopics: ExploringTopic[] = [
  {
    title: "Multi-Agent Orchestration",
    description: "Coordinating specialized AI agents for complex task decomposition",
  },
  {
    title: "Edge AI Inference",
    description: "Running ML models at the edge with ONNX and WebAssembly",
  },
  {
    title: "Rust for Systems",
    description: "Memory-safe systems programming without garbage collection",
  },
  {
    title: "WebAssembly Runtimes",
    description: "Portable, sandboxed execution for server-side and browser workloads",
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Why RAG Architectures Need a Retrieval-First Mindset",
    date: "2026-02-15",
    readingTime: "8 min",
    excerpt:
      "Most RAG implementations focus on the generation step. The real leverage is in retrieval quality — chunking strategies, reranking, and hybrid search.",
    slug: "rag-retrieval-first",
  },
  {
    title: "Designing Event-Driven Systems That Actually Scale",
    date: "2026-01-28",
    readingTime: "12 min",
    excerpt:
      "Event sourcing sounds elegant until you hit 50K events per second. Here's what I learned building Nexus — and what I'd do differently.",
    slug: "event-driven-at-scale",
  },
  {
    title: "The Case for Multi-Agent Systems Over Monolithic LLMs",
    date: "2026-01-10",
    readingTime: "6 min",
    excerpt:
      "Single-agent systems hit capability ceilings fast. Multi-agent orchestration with specialized roles consistently outperforms on complex tasks.",
    slug: "multi-agent-systems",
  },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "Terminal", href: "#terminal" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
```

**Step 3: Commit**

```bash
git add src/types/index.ts src/lib/data.ts
git commit -m "feat: add type definitions and placeholder data layer"
```

---

### Task 4: Build UI Primitives

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/AnimatedText.tsx`
- Create: `src/components/ui/GridPattern.tsx`
- Create: `src/components/ui/CursorGlow.tsx`
- Create: `src/hooks/useMousePosition.ts`

**Step 1: Create SectionHeading**

Create `src/components/ui/SectionHeading.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <p className="text-accent text-sm font-mono uppercase tracking-widest mb-3">
        {label}
      </p>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted text-lg mt-4 max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}
```

**Step 2: Create Badge**

Create `src/components/ui/Badge.tsx`:

```tsx
interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="px-3 py-1 text-xs font-mono rounded-full border border-border text-text-muted bg-surface">
      {children}
    </span>
  );
}
```

**Step 3: Create Card**

Create `src/components/ui/Card.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      className={`bg-surface border border-border rounded-xl p-6 ${
        hover ? "hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,112,243,0.08)] transition-colors duration-200" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

**Step 4: Create AnimatedText**

Create `src/components/ui/AnimatedText.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

**Step 5: Create GridPattern**

Create `src/components/ui/GridPattern.tsx`:

```tsx
export function GridPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
```

**Step 6: Create useMousePosition hook**

Create `src/hooks/useMousePosition.ts`:

```ts
"use client";

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
```

**Step 7: Create CursorGlow**

Create `src/components/ui/CursorGlow.tsx`:

```tsx
"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

export function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-20"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, var(--color-accent-glow), transparent 70%)`,
      }}
    />
  );
}
```

**Step 8: Commit**

```bash
git add src/components/ui/ src/hooks/
git commit -m "feat: add UI primitives — Card, Badge, AnimatedText, GridPattern, CursorGlow"
```

---

### Task 5: Build Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

**Step 1: Create Navbar component**

Create `src/components/layout/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-semibold text-lg tracking-tight">
          RS<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-8 overflow-x-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add sticky Navbar with blur backdrop on scroll"
```

---

### Task 6: Build Hero Section

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

**Step 1: Create HeroSection**

Create `src/components/sections/HeroSection.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GridPattern } from "@/components/ui/GridPattern";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridPattern />

      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-text-muted text-sm font-mono uppercase tracking-widest mb-6"
        >
          Rohan Salunkhe
        </motion.p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          <AnimatedText text="I engineer systems" delay={0.2} />
          <br />
          <AnimatedText text="that think, scale," delay={0.6} />
          <br />
          <span className="text-accent">
            <AnimatedText text="and ship." delay={1.0} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-text-muted text-lg md:text-xl max-w-xl mb-10"
        >
          AI Engineer &middot; Systems Thinker &middot; Builder
          <br />
          <span className="text-text-primary/70">
            Currently building intelligent systems at{" "}
            <span className="text-accent">Kpoint Technologies</span>.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <a
            href="#work"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent-hover transition-colors"
          >
            View Work &darr;
          </a>
          <a
            href="#terminal"
            className="px-6 py-3 border border-border rounded-lg font-mono text-sm text-text-muted hover:border-accent/50 hover:text-text-primary transition-colors"
          >
            Open Terminal _
          </a>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="inline-block"
        >
          <div className="bg-surface border border-border rounded-lg px-5 py-3 font-mono text-sm text-text-muted">
            <p>
              <span className="text-accent">&gt;</span> 12 projects shipped
              &middot; 3 systems live
            </p>
            <p className="mt-1">
              <span className="text-accent">&gt;</span> exploring:{" "}
              <span className="text-text-primary">
                multi-agent orchestration
              </span>
              <span className="animate-pulse ml-1">_</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add Hero section with animated text and status bar"
```

---

### Task 7: Build Projects Section with Architecture Diagrams

**Files:**
- Create: `src/components/sections/ProjectsSection.tsx`
- Create: `src/components/sections/ProjectCard.tsx`
- Create: `src/components/sections/ArchitectureDiagram.tsx`

**Step 1: Create ArchitectureDiagram**

Create `src/components/sections/ArchitectureDiagram.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArchitectureNode } from "@/types";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodeWidth = 140;
  const nodeHeight = 50;

  return (
    <div className="relative w-full bg-bg border border-border rounded-lg p-4 overflow-x-auto">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto min-w-[500px]"
        fill="none"
      >
        {/* Connection lines */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x + nodeWidth / 2}
                y1={node.y + nodeHeight / 2}
                x2={target.x + nodeWidth / 2}
                y2={target.y + nodeHeight / 2}
                stroke={
                  activeNode === node.id || activeNode === targetId
                    ? "#0070F3"
                    : "#333333"
                }
                strokeWidth={activeNode === node.id || activeNode === targetId ? 2 : 1}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer"
          >
            <rect
              x={node.x}
              y={node.y}
              width={nodeWidth}
              height={nodeHeight}
              rx={8}
              fill={activeNode === node.id ? "#1a1a1a" : "#111111"}
              stroke={activeNode === node.id ? "#0070F3" : "#333333"}
              strokeWidth={activeNode === node.id ? 2 : 1}
            />
            <text
              x={node.x + nodeWidth / 2}
              y={node.y + nodeHeight / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={activeNode === node.id ? "#0070F3" : "#ededed"}
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Tooltip */}
        {activeNode && (() => {
          const node = nodes.find((n) => n.id === activeNode);
          if (!node) return null;
          const tooltipY = node.y - 35;
          return (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <rect
                x={node.x - 10}
                y={tooltipY}
                width={nodeWidth + 20}
                height={25}
                rx={4}
                fill="#0070F3"
              />
              <text
                x={node.x + nodeWidth / 2}
                y={tooltipY + 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="9"
                fontFamily="var(--font-mono)"
              >
                {node.description}
              </text>
            </motion.g>
          );
        })()}
      </svg>
    </div>
  );
}
```

**Step 2: Create ProjectCard**

Create `src/components/sections/ProjectCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-xl overflow-hidden hover:border-accent/20 transition-colors"
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-accent font-mono text-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold">{project.title}</h3>
          </div>
          <p className="text-text-muted">{project.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 flex-wrap">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-text-muted text-xl ml-2"
          >
            &#8595;
          </motion.span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-border pt-6 space-y-8">
              {/* Problem */}
              <div>
                <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-3">
                  Problem
                </h4>
                <p className="text-text-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Architecture */}
              <div>
                <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-3">
                  Architecture
                </h4>
                <ArchitectureDiagram nodes={project.architecture} />
              </div>

              {/* Full stack */}
              <div>
                <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-3">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-3">
                  Impact
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-bg border border-border rounded-lg p-4 text-center"
                    >
                      <p className="text-2xl md:text-3xl font-bold text-accent">
                        {metric.value}
                      </p>
                      <p className="text-xs text-text-muted mt-1 font-mono uppercase">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline font-mono"
                  >
                    GitHub &nearr;
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline font-mono"
                  >
                    Live Demo &nearr;
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

**Step 3: Create ProjectsSection**

Create `src/components/sections/ProjectsSection.tsx`:

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Selected Work"
        title="Projects that shipped."
        description="Real problems, real architecture, measurable outcomes."
      />

      <div className="space-y-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
```

**Step 4: Commit**

```bash
git add src/components/sections/ProjectsSection.tsx src/components/sections/ProjectCard.tsx src/components/sections/ArchitectureDiagram.tsx
git commit -m "feat: add Projects section with expandable cards and interactive architecture diagrams"
```

---

### Task 8: Build Systems & Exploring Sections

**Files:**
- Create: `src/components/sections/SystemsSection.tsx`
- Create: `src/components/sections/ExploringSection.tsx`

**Step 1: Create SystemsSection with cursor-reactive cards**

Create `src/components/sections/SystemsSection.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { systemDomains } from "@/lib/data";

const iconMap: Record<string, string> = {
  scale: "⚡",
  brain: "🧠",
  layers: "◆",
  zap: "↯",
  network: "⬡",
  terminal: ">_",
};

function SystemCard({ domain, index }: { domain: typeof systemDomains[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-surface border border-border rounded-xl p-6 hover:border-accent/30 transition-colors cursor-default"
    >
      <span className="text-2xl mb-4 block font-mono text-accent">
        {iconMap[domain.icon] || "◇"}
      </span>
      <h3 className="text-lg font-semibold mb-2">{domain.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {domain.description}
      </p>
    </motion.div>
  );
}

export function SystemsSection() {
  return (
    <section id="systems" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Mental Models"
        title="Systems I think about."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemDomains.map((domain, i) => (
          <SystemCard key={domain.title} domain={domain} index={i} />
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Create ExploringSection**

Create `src/components/sections/ExploringSection.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { exploringTopics } from "@/lib/data";

export function ExploringSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Current Focus"
        title="Currently exploring."
      />

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
        {exploringTopics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="min-w-[280px] snap-start bg-surface border border-border rounded-xl p-6 relative overflow-hidden group"
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none" />

            <h3 className="text-lg font-semibold mb-2 relative">{topic.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed relative">
              {topic.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/sections/SystemsSection.tsx src/components/sections/ExploringSection.tsx
git commit -m "feat: add Systems and Exploring sections with cursor-reactive cards"
```

---

### Task 9: Build Interactive Terminal

**Files:**
- Create: `src/lib/terminal-commands.ts`
- Create: `src/hooks/useTerminal.ts`
- Create: `src/components/sections/TerminalSection.tsx`

**Step 1: Create terminal command definitions**

Create `src/lib/terminal-commands.ts`:

```ts
import { TerminalCommand } from "@/types";

export const terminalCommands: Record<string, TerminalCommand> = {
  help: {
    command: "help",
    description: "Show available commands",
    output: [
      "Available commands:",
      "",
      "  about       — Who I am",
      "  skills      — Technical toolkit",
      "  projects    — Featured work",
      "  contact     — Get in touch",
      "  github      — Open GitHub profile",
      "  resume      — Download resume",
      "  clear       — Clear terminal",
      "",
      "  Try: sudo hire-me",
    ],
  },
  about: {
    command: "about",
    description: "Who I am",
    output: [
      "Rohan Salunkhe — AI Engineer & Systems Builder",
      "",
      "I build systems at the intersection of AI and",
      "scalable infrastructure. Currently an AI intern",
      "at Kpoint Technologies, working on intelligent",
      "document processing and multi-agent systems.",
      "",
      "I think in systems, ship in sprints, and believe",
      "great engineering is invisible to the end user.",
    ],
  },
  skills: {
    command: "skills",
    description: "Technical toolkit",
    output: [
      "Languages   → Python, TypeScript, Go, Rust",
      "AI/ML       → LangChain, LangGraph, PyTorch, RAG",
      "Backend     → FastAPI, Node.js, gRPC, Kafka",
      "Infra       → Docker, Kubernetes, AWS, Terraform",
      "Data        → PostgreSQL, Redis, Pinecone, TimescaleDB",
      "Frontend    → React, Next.js, Tailwind CSS",
    ],
  },
  projects: {
    command: "projects",
    description: "Featured work",
    output: [
      "01  Aether    — AI document intelligence pipeline",
      "02  Nexus     — Real-time event processing system",
      "03  Cortex    — Multi-agent orchestration framework",
      "04  Sentinel  — ML-powered infrastructure monitoring",
      "",
      "↑ Scroll up to see detailed case studies.",
    ],
  },
  contact: {
    command: "contact",
    description: "Get in touch",
    output: [
      "Email    → rohan@example.com",
      "GitHub   → github.com/everythingoholic",
      "LinkedIn → linkedin.com/in/rohansalunkhe",
      "Twitter  → @everythingoholic",
    ],
  },
  github: {
    command: "github",
    description: "Open GitHub profile",
    output: ["Opening github.com/everythingoholic ..."],
  },
  resume: {
    command: "resume",
    description: "Download resume",
    output: ["Downloading resume.pdf ..."],
  },
  "sudo hire-me": {
    command: "sudo hire-me",
    description: "Easter egg",
    output: [
      "Password: ********",
      "",
      "✓ Access granted.",
      "",
      "Deploying offer letter to your inbox...",
      "███████████████████████████████ 100%",
      "",
      "Just kidding. But seriously, let's talk.",
      "→ rohan@example.com",
    ],
  },
  matrix: {
    command: "matrix",
    description: "Easter egg",
    output: [
      "Wake up, Neo...",
      "The Matrix has you...",
      "",
      "Follow the white rabbit. 🐇",
    ],
  },
};
```

**Step 2: Create useTerminal hook**

Create `src/hooks/useTerminal.ts`:

```ts
"use client";

import { useState, useCallback } from "react";
import { terminalCommands } from "@/lib/terminal-commands";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: 'Welcome to rohan@portfolio. Type "help" to start.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();

    setLines((prev) => [...prev, { type: "input", content: `$ ${input}` }]);
    setHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const cmd = terminalCommands[trimmed];
    if (cmd) {
      const outputLines = Array.isArray(cmd.output) ? cmd.output : [cmd.output];
      setLines((prev) => [
        ...prev,
        ...outputLines.map((line) => ({ type: "output" as const, content: line })),
      ]);
    } else if (trimmed === "") {
      // do nothing for empty input
    } else {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          content: `command not found: ${trimmed}. Type "help" for available commands.`,
        },
      ]);
    }
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up" && historyIndex < history.length - 1) {
        setHistoryIndex((prev) => prev + 1);
        return history[historyIndex + 1];
      }
      if (direction === "down" && historyIndex > 0) {
        setHistoryIndex((prev) => prev - 1);
        return history[historyIndex - 1];
      }
      if (direction === "down" && historyIndex === 0) {
        setHistoryIndex(-1);
        return "";
      }
      return null;
    },
    [history, historyIndex]
  );

  return { lines, executeCommand, navigateHistory };
}
```

**Step 3: Create TerminalSection**

Create `src/components/sections/TerminalSection.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTerminal } from "@/hooks/useTerminal";

export function TerminalSection() {
  const { lines, executeCommand, navigateHistory } = useTerminal();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = navigateHistory("up");
      if (prev !== null) setInput(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = navigateHistory("down");
      if (next !== null) setInput(next);
    }
  }

  return (
    <section id="terminal" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Interactive"
        title="Talk to the terminal."
        description="Type a command and press Enter."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-surface border border-border rounded-xl overflow-hidden max-w-3xl"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-text-muted font-mono">
            rohan@portfolio ~
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-4 font-mono text-sm h-[400px] overflow-y-auto"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.type === "input"
                  ? "text-text-primary mt-3"
                  : "text-text-muted"
              } ${line.content === "" ? "h-4" : ""}`}
            >
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center mt-3">
            <span className="text-accent mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-text-primary caret-accent"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

**Step 4: Commit**

```bash
git add src/lib/terminal-commands.ts src/hooks/useTerminal.ts src/components/sections/TerminalSection.tsx
git commit -m "feat: add interactive terminal with command history and easter eggs"
```

---

### Task 10: Build GitHub Activity Section

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/components/sections/GitHubActivity.tsx`

**Step 1: Create GitHub utility**

Create `src/lib/github.ts`:

```ts
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

// Generate realistic placeholder data
export function generatePlaceholderGitHubData(): GitHubData {
  const contributions: ContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Simulate realistic activity patterns
    const rand = Math.random();
    let count = 0;
    if (isWeekend) {
      count = rand > 0.6 ? Math.floor(Math.random() * 5) : 0;
    } else {
      count = rand > 0.15 ? Math.floor(Math.random() * 12) + 1 : 0;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) level = 1;
    if (count > 3) level = 2;
    if (count > 6) level = 3;
    if (count > 9) level = 4;

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return {
    contributions,
    totalContributions: contributions.reduce((sum, d) => sum + d.count, 0),
    topLanguages: [
      { name: "Python", percentage: 42, color: "#3572A5" },
      { name: "TypeScript", percentage: 28, color: "#3178C6" },
      { name: "Go", percentage: 15, color: "#00ADD8" },
      { name: "Rust", percentage: 10, color: "#DEA584" },
      { name: "Other", percentage: 5, color: "#666666" },
    ],
  };
}
```

**Step 2: Create GitHubActivity component**

Create `src/components/sections/GitHubActivity.tsx`:

```tsx
"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generatePlaceholderGitHubData } from "@/lib/github";

const levelColors = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

export function GitHubActivity() {
  const data = useMemo(() => generatePlaceholderGitHubData(), []);

  // Group contributions into weeks
  const weeks: typeof data.contributions[] = [];
  for (let i = 0; i < data.contributions.length; i += 7) {
    weeks.push(data.contributions.slice(i, i + 7));
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Open Source"
        title="Building in public."
        description={`${data.totalContributions.toLocaleString()} contributions in the last year`}
      />

      {/* Contribution heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto pb-4"
      >
        <div className="flex gap-[3px] min-w-[720px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: wi * 0.005 + di * 0.01 }}
                  title={`${day.date}: ${day.count} contributions`}
                  className="w-[11px] h-[11px] rounded-[2px]"
                  style={{ backgroundColor: levelColors[day.level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12"
      >
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
          Top Languages
        </h3>

        {/* Language bar */}
        <div className="flex h-3 rounded-full overflow-hidden mb-4">
          {data.topLanguages.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {data.topLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-text-muted">
                {lang.name} <span className="text-text-primary">{lang.percentage}%</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

**Step 3: Commit**

```bash
git add src/lib/github.ts src/components/sections/GitHubActivity.tsx
git commit -m "feat: add GitHub activity heatmap with language breakdown"
```

---

### Task 11: Build Blog Preview Section

**Files:**
- Create: `src/components/sections/BlogPreview.tsx`

**Step 1: Create BlogPreview**

Create `src/components/sections/BlogPreview.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/data";

export function BlogPreview() {
  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Writing"
        title="Recent thinking."
        description="Long-form notes on systems, AI, and engineering craft."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogPosts.map((post, i) => (
          <motion.a
            key={post.slug}
            href={`#blog-${post.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface border border-border rounded-xl p-6 hover:border-accent/30 transition-colors group block"
          >
            <div className="flex items-center gap-3 text-xs text-text-muted font-mono mb-3">
              <span>{post.date}</span>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>

            <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>

            <p className="text-text-muted text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/BlogPreview.tsx
git commit -m "feat: add Blog preview section with post cards"
```

---

### Task 12: Build Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Create Footer**

Create `src/components/layout/Footer.tsx`:

```tsx
export function Footer() {
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/everythingoholic" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rohansalunkhe" },
    { label: "Twitter", href: "https://twitter.com/everythingoholic" },
    { label: "Email", href: "mailto:rohan@example.com" },
  ];

  return (
    <footer id="contact" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Let&apos;s build something.
            </h3>
            <p className="text-text-muted text-sm">
              Open to collaborations, conversations, and interesting problems.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted font-mono">
          <p>&copy; {new Date().getFullYear()} Rohan Salunkhe</p>
          <p>Built with Next.js &middot; Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with social links"
```

---

### Task 13: Compose Main Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace page.tsx with composed sections**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { ExploringSection } from "@/components/sections/ExploringSection";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SystemsSection />
        <ExploringSection />
        <TerminalSection />
        <GitHubActivity />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Verify the full page renders**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose main page from all sections"
```

---

### Task 14: Polish & Performance Pass

**Files:**
- Modify: `src/app/globals.css` (add scrollbar-hide utility and smooth scrolling)
- Modify: `src/app/layout.tsx` (add viewport meta)

**Step 1: Add scrollbar-hide and additional utilities to globals.css**

Append to `src/app/globals.css`:

```css
/* Scrollbar hide utility for horizontal scroll sections */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Step 2: Run build and check for errors**

```bash
npm run build 2>&1
```

Expected: Build succeeds. Check output for any warnings.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add scrollbar-hide utility and focus styles for accessibility"
```

---

### Task 15: Final Verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: No errors, all pages built successfully.

**Step 2: Run linter**

```bash
npm run lint
```

Expected: No errors.

**Step 3: Start dev server and verify**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | grep -c 'Rohan Salunkhe'
kill %1
```

Expected: At least 1 match — page renders with content.

**Step 4: Final commit if any fixes were needed**

```bash
git add -A
git status
```

If there are changes:
```bash
git commit -m "fix: address build/lint issues from final verification"
```
