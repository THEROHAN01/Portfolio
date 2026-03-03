"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="h-px w-8 bg-accent" />
        <p className="text-accent text-xs font-mono uppercase tracking-[0.25em]">
          {label}
        </p>
      </div>
      <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted text-lg mt-5 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
