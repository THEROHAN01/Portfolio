"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generatePlaceholderGitHubData } from "@/lib/github";

const levelColors = [
  "#1a1a16",
  "#3d3520",
  "#6b5a2a",
  "#a08030",
  "#d4a047",
];

export function GitHubActivity() {
  const data = useMemo(() => generatePlaceholderGitHubData(), []);

  const weeks: (typeof data.contributions)[] = [];
  for (let i = 0; i < data.contributions.length; i += 7) {
    weeks.push(data.contributions.slice(i, i + 7));
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
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
                  transition={{ delay: wi * 0.004 + di * 0.008 }}
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
        className="mt-14"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-6 bg-accent/40" />
          <h3 className="text-[11px] font-mono text-text-muted uppercase tracking-[0.2em]">
            Top Languages
          </h3>
        </div>

        <div className="flex h-2 rounded-full overflow-hidden mb-5">
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

        <div className="flex flex-wrap gap-5">
          {data.topLanguages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-2.5 text-sm"
            >
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-text-muted font-mono text-xs">
                {lang.name}{" "}
                <span className="text-text-primary">{lang.percentage}%</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
