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
