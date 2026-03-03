"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/data";

export function BlogPreview() {
  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Writing"
        title="Recent thinking."
        description="Long-form notes on systems, AI, and engineering craft."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogPosts.map((post, i) => (
          <motion.a
            key={post.slug}
            href={`#blog-${post.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface border border-border rounded-xl p-6 hover:border-accent/30 transition-colors group block"
          >
            <div className="flex items-center gap-3 text-xs text-text-muted font-mono mb-3">
              <span>{post.date}</span>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>

            <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>

            <p className="text-text-muted text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
