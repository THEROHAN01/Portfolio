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
