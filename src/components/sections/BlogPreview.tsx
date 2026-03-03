"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/data";

export function BlogPreview() {
  return (
    <section id="blog" className="max-w-7xl mx-auto px-8 py-32">
      <SectionHeading
        label="Writing"
        title="Recent thinking."
        description="Long-form notes on systems, AI, and engineering craft."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {blogPosts.map((post, i) => (
          <motion.a
            key={post.slug}
            href={`#blog-${post.slug}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="glow-border bg-surface/40 border border-border-subtle rounded-lg p-7 group block transition-colors duration-300 hover:bg-surface/70"
          >
            <div className="flex items-center gap-3 text-[10px] text-text-muted font-mono uppercase tracking-[0.15em] mb-5">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{post.readingTime}</span>
            </div>

            <h3 className="text-lg font-display font-semibold mb-3.5 group-hover:text-accent transition-colors duration-300 leading-snug tracking-tight">
              {post.title}
            </h3>

            <p className="text-text-muted text-sm leading-[1.7]">
              {post.excerpt}
            </p>

            <div className="mt-5 pt-5 border-t border-border-subtle">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted group-hover:text-accent transition-colors duration-300">
                Read More
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
