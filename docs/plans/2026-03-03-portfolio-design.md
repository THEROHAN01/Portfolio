# Portfolio Website Design

**Author:** Rohan Salunkhe (everythingoholic)
**Date:** 2026-03-03
**Status:** Approved

## Identity

- Name: Rohan Salunkhe
- Alias: everythingoholic
- Role: AI Intern at Kpoint Technologies
- Positioning: AI Engineer, Systems Thinker, Builder

## Architecture

**Approach:** Static-First with Client Islands

Single-page scroll using Next.js App Router. Server components by default. Interactive features (terminal, architecture diagrams, GitHub heatmap) are isolated client components that hydrate independently.

```
page.tsx (Server Component — static shell)
├── Navbar (client — blur on scroll)
├── HeroSection (server + client AnimatedText)
├── ProjectsSection (server shell + client ProjectCard)
├── SystemsSection (server + client cursor-reactive cards)
├── ExploringSection (server)
├── TerminalSection (client — interactive terminal)
├── GitHubActivity (client — fetches GitHub API)
├── BlogPreview (server)
└── Footer (server)
```

## Visual System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#000000` | Page background |
| `surface` | `#111111` | Cards, elevated surfaces |
| `surface-hover` | `#1A1A1A` | Card hover states |
| `border` | `#222222` | Subtle borders |
| `text-primary` | `#EDEDED` | Headings, body text |
| `text-muted` | `#888888` | Secondary text, labels |
| `accent` | `#0070F3` | Links, highlights, interactive |
| `accent-hover` | `#0060D0` | Hover state |
| `accent-glow` | `rgba(0,112,243,0.15)` | Subtle glow effects |

### Typography

- Headings: Inter (letter-spacing: -0.03em, weight 600-700)
- Body: Inter (weight 400, 16-18px, line-height 1.6)
- Monospace: JetBrains Mono (weight 400)
- Hero headline: 56-72px

### Grid

12-column, max-w-6xl (1152px) centered, 24px gutter.

### Motion

- Entrance: fadeInUp (20px translate, 0.6s ease-out, stagger 0.1s)
- Hover: scale(1.02) + border glow, 200ms
- Scroll-triggered via Framer Motion useInView
- Cursor-reactive: ±5px parallax on cards

## Page Sections

### 1. Navbar (sticky)
Name/logo left, section links right (Work, Systems, Terminal, Blog, Contact). Blurred backdrop on scroll. Horizontal scroll nav on mobile.

### 2. Hero
- Headline: "I engineer systems that think, scale, and ship."
- Subtitle: AI Engineer · Systems Thinker · Builder
- Context: Currently building intelligent systems at Kpoint Technologies.
- CTAs: [View Work ↓] [Open Terminal _]
- Status bar with blinking cursor: project count, current exploration
- Background: subtle grid pattern with accent-glow gradient

### 3. Projects (4 case studies)
Expandable cards. Collapsed: title + description + stack tags + impact metric.

Expanded: problem statement, interactive architecture diagram (SVG), stack badges, 3 impact metrics with numbers, GitHub/demo links.

Placeholder projects:
1. **Aether** — AI document intelligence pipeline (RAG, vector search, 10x retrieval)
2. **Nexus** — Real-time event processing (Kafka, Go, 50K events/sec)
3. **Cortex** — Multi-agent orchestration framework (LangGraph, autonomous workflows)
4. **Sentinel** — Infrastructure monitoring with anomaly detection (Prometheus, ML alerting)

### 4. Systems I Think About
6-card grid, cursor-reactive tilt. Domains:
- Scalability, AI Systems, Clean Architecture, Performance, Distributed Systems, Developer Experience

### 5. Currently Exploring
Horizontal scroll topic cards with gradient borders:
- Multi-agent orchestration, Edge AI inference, Rust for systems, WebAssembly runtimes

### 6. Terminal
Interactive terminal component. Commands: about, skills, projects, contact, github, resume, clear. Easter eggs: sudo hire-me, matrix. Arrow keys for history.

### 7. GitHub Activity
Contribution heatmap from GitHub API. Top languages bar. Last 5 commits.

### 8. Blog Preview
3-column grid. Title, date, reading time, excerpt. Placeholder blog posts.

### 9. Footer
Social links (GitHub, LinkedIn, Twitter/X, Email). Copyright. "Built with Next.js" badge.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- No external UI libraries

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ArchitectureDiagram.tsx
│   │   ├── SystemsSection.tsx
│   │   ├── ExploringSection.tsx
│   │   ├── TerminalSection.tsx
│   │   ├── GitHubActivity.tsx
│   │   └── BlogPreview.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── SectionHeading.tsx
│       ├── AnimatedText.tsx
│       ├── CursorGlow.tsx
│       └── GridPattern.tsx
├── lib/
│   ├── data.ts
│   ├── github.ts
│   └── terminal-commands.ts
├── hooks/
│   ├── useMousePosition.ts
│   └── useTerminal.ts
└── types/
    └── index.ts
```

## Performance Targets

- Lighthouse score: 95+
- SEO optimized (metadata, OG tags, structured data)
- Fully responsive (mobile-first)
- Minimal client JS (server components by default)
