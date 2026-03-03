"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-2xl border-b border-border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight group"
        >
          <span className="text-text-primary group-hover:text-accent transition-colors duration-300">
            R
          </span>
          <span className="text-accent">.</span>
          <span className="text-text-primary group-hover:text-accent transition-colors duration-300">
            S
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] font-mono uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              scrolled ? "bg-accent" : "bg-accent/40"
            }`}
          />
          <span className="text-[11px] font-mono text-text-muted hidden sm:block tracking-wider">
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
