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
