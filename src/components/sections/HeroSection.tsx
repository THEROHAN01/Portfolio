"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GridPattern } from "@/components/ui/GridPattern";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pb-24 md:pb-32">
      <GridPattern />

      {/* Atmospheric gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px]" />

      {/* Large background monogram */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 select-none pointer-events-none">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[20vw] font-display font-bold text-border-subtle/60 leading-none"
        >
          RS
        </motion.span>
      </div>

      <div className="relative max-w-7xl mx-auto px-8 pt-40 w-full">
        {/* Top line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-16 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent">
            Rohan Salunkhe
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-tight leading-[0.95] mb-10 max-w-5xl">
          <AnimatedText text="I engineer systems" delay={0.2} />
          <br />
          <AnimatedText text="that think, scale," delay={0.5} />
          <br />
          <span className="text-shimmer">
            <AnimatedText text="and ship." delay={0.8} />
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="text-text-muted text-lg md:text-xl max-w-md leading-relaxed"
          >
            AI Engineer building intelligent systems at{" "}
            <span className="text-accent font-medium">Kpoint Technologies</span>
            . Focused on what works, obsessed with how it scales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex gap-4"
          >
            <a
              href="#work"
              className="group relative px-7 py-3.5 bg-accent text-bg rounded-md font-medium text-sm tracking-wide overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#terminal"
              className="px-7 py-3.5 border border-border rounded-md font-mono text-sm text-text-muted hover:border-accent/40 hover:text-accent transition-all duration-300"
            >
              ./terminal
            </a>
          </motion.div>
        </div>

        {/* Status strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-20 pt-8 border-t border-border-subtle"
        >
          <div className="flex flex-wrap gap-x-12 gap-y-4 font-mono text-xs tracking-wider uppercase text-text-muted">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>12 projects shipped</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>3 systems live</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>
                exploring:{" "}
                <span className="text-text-primary">
                  multi-agent orchestration
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
