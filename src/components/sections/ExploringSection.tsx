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
