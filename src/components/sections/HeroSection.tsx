"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GridPattern } from "@/components/ui/GridPattern";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridPattern />

      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-text-muted text-sm font-mono uppercase tracking-widest mb-6"
        >
          Rohan Salunkhe
        </motion.p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          <AnimatedText text="I engineer systems" delay={0.2} />
          <br />
          <AnimatedText text="that think, scale," delay={0.6} />
          <br />
          <span className="text-accent">
            <AnimatedText text="and ship." delay={1.0} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-text-muted text-lg md:text-xl max-w-xl mb-10"
        >
          AI Engineer &middot; Systems Thinker &middot; Builder
          <br />
          <span className="text-text-primary/70">
            Currently building intelligent systems at{" "}
            <span className="text-accent">Kpoint Technologies</span>.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <a
            href="#work"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent-hover transition-colors"
          >
            View Work &darr;
          </a>
          <a
            href="#terminal"
            className="px-6 py-3 border border-border rounded-lg font-mono text-sm text-text-muted hover:border-accent/50 hover:text-text-primary transition-colors"
          >
            Open Terminal _
          </a>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="inline-block"
        >
          <div className="bg-surface border border-border rounded-lg px-5 py-3 font-mono text-sm text-text-muted">
            <p>
              <span className="text-accent">&gt;</span> 12 projects shipped
              &middot; 3 systems live
            </p>
            <p className="mt-1">
              <span className="text-accent">&gt;</span> exploring:{" "}
              <span className="text-text-primary">
                multi-agent orchestration
              </span>
              <span className="animate-pulse ml-1">_</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
