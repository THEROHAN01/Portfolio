"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { systemDomains } from "@/lib/data";

const iconMap: Record<string, string> = {
  scale: "⚡",
  brain: "🧠",
  layers: "◆",
  zap: "↯",
  network: "⬡",
  terminal: ">_",
};

function SystemCard({ domain, index }: { domain: typeof systemDomains[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-surface border border-border rounded-xl p-6 hover:border-accent/30 transition-colors cursor-default"
    >
      <span className="text-2xl mb-4 block font-mono text-accent">
        {iconMap[domain.icon] || "◇"}
      </span>
      <h3 className="text-lg font-semibold mb-2">{domain.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {domain.description}
      </p>
    </motion.div>
  );
}

export function SystemsSection() {
  return (
    <section id="systems" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Mental Models"
        title="Systems I think about."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemDomains.map((domain, i) => (
          <SystemCard key={domain.title} domain={domain} index={i} />
        ))}
      </div>
    </section>
  );
}
