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
