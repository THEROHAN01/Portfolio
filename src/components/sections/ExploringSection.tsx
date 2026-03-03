"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { exploringTopics } from "@/lib/data";

export function ExploringSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <SectionHeading label="Current Focus" title="Currently exploring." />

      <div className="flex gap-3 overflow-x-auto pb-4 -mx-8 px-8 snap-x snap-mandatory scrollbar-hide">
        {exploringTopics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-[300px] snap-start glow-border bg-surface/40 border border-border-subtle rounded-lg p-7 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/40 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
                Active
              </span>
            </div>

            <h3 className="text-lg font-display font-semibold mb-2.5 tracking-tight relative">
              {topic.title}
            </h3>
            <p className="text-text-muted text-sm leading-[1.7] relative">
              {topic.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
