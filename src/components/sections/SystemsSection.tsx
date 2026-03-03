"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { systemDomains } from "@/lib/data";

const iconMap: Record<string, string> = {
  scale: "//",
  brain: "{}",
  layers: "<>",
  zap: "=>",
  network: "::",
  terminal: "$_",
};

function SystemCard({
  domain,
  index,
}: {
  domain: (typeof systemDomains)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 25,
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glow-border bg-surface/40 border border-border-subtle rounded-lg p-7 hover:bg-surface/70 transition-colors duration-400 cursor-default group"
    >
      <span className="text-sm font-mono text-accent/70 group-hover:text-accent transition-colors duration-300 block mb-5">
        {iconMap[domain.icon] || "::"}
      </span>
      <h3 className="text-lg font-display font-semibold mb-2.5 tracking-tight">
        {domain.title}
      </h3>
      <p className="text-text-muted text-sm leading-[1.7]">
        {domain.description}
      </p>
    </motion.div>
  );
}

export function SystemsSection() {
  return (
    <section id="systems" className="max-w-7xl mx-auto px-8 py-32">
      <SectionHeading
        label="Mental Models"
        title="Systems I think about."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {systemDomains.map((domain, i) => (
          <SystemCard key={domain.title} domain={domain} index={i} />
        ))}
      </div>
    </section>
  );
}
