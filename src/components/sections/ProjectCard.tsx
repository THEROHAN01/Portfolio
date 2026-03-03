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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glow-border border border-border-subtle rounded-lg overflow-hidden transition-colors duration-300 hover:border-border"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group"
      >
        <div className="flex items-start gap-6">
          <span className="font-mono text-sm text-accent/60 mt-1 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-text-muted mt-1.5 text-sm md:text-base">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="hidden md:flex gap-2">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300 shrink-0"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="6" y1="0" x2="6" y2="12" />
              <line x1="0" y1="6" x2="12" y2="6" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 md:px-10 pb-10 space-y-10">
              <div className="section-line" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left column */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[11px] font-mono text-accent uppercase tracking-[0.2em] mb-4">
                      The Problem
                    </h4>
                    <p className="text-text-muted leading-[1.8] text-[15px]">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono text-accent uppercase tracking-[0.2em] mb-4">
                      Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors border-b border-border-subtle hover:border-accent pb-1"
                      >
                        Source Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors border-b border-border-subtle hover:border-accent pb-1"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[11px] font-mono text-accent uppercase tracking-[0.2em] mb-4">
                      Architecture
                    </h4>
                    <ArchitectureDiagram nodes={project.architecture} />
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono text-accent uppercase tracking-[0.2em] mb-4">
                      Impact
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="bg-bg/60 border border-border-subtle rounded-md p-4 text-center"
                        >
                          <p className="text-2xl md:text-3xl font-display font-bold text-accent">
                            {metric.value}
                          </p>
                          <p className="text-[10px] text-text-muted mt-1.5 font-mono uppercase tracking-[0.15em]">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
