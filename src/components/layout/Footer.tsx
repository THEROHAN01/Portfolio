"use client";

import { motion } from "motion/react";

export function Footer() {
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/everythingoholic" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rohansalunkhe" },
    { label: "Twitter", href: "https://twitter.com/everythingoholic" },
    { label: "Email", href: "mailto:rohan@example.com" },
  ];

  return (
    <footer id="contact" className="border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-5">
              Get in touch
            </p>
            <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Let&apos;s build
              <br />
              something.
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors duration-300 font-mono tracking-wider group flex items-center gap-3"
              >
                <span className="w-4 h-px bg-border-subtle group-hover:bg-accent group-hover:w-8 transition-all duration-300" />
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="section-line mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-text-muted font-mono uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} Rohan Salunkhe</p>
          <p>
            Designed & Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
