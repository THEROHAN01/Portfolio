"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generatePlaceholderGitHubData } from "@/lib/github";

const levelColors = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

export function GitHubActivity() {
  const data = useMemo(() => generatePlaceholderGitHubData(), []);

  // Group contributions into weeks
  const weeks: typeof data.contributions[] = [];
  for (let i = 0; i < data.contributions.length; i += 7) {
    weeks.push(data.contributions.slice(i, i + 7));
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Open Source"
        title="Building in public."
        description={`${data.totalContributions.toLocaleString()} contributions in the last year`}
      />

      {/* Contribution heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto pb-4"
      >
        <div className="flex gap-[3px] min-w-[720px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: wi * 0.005 + di * 0.01 }}
                  title={`${day.date}: ${day.count} contributions`}
                  className="w-[11px] h-[11px] rounded-[2px]"
                  style={{ backgroundColor: levelColors[day.level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12"
      >
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
          Top Languages
        </h3>

        {/* Language bar */}
        <div className="flex h-3 rounded-full overflow-hidden mb-4">
          {data.topLanguages.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {data.topLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-text-muted">
                {lang.name} <span className="text-text-primary">{lang.percentage}%</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
