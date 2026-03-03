"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTerminal } from "@/hooks/useTerminal";

export function TerminalSection() {
  const { lines, executeCommand, navigateHistory } = useTerminal();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = navigateHistory("up");
      if (prev !== null) setInput(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = navigateHistory("down");
      if (next !== null) setInput(next);
    }
  }

  return (
    <section id="terminal" className="max-w-7xl mx-auto px-8 py-32">
      <SectionHeading
        label="Interactive"
        title="Talk to the terminal."
        description="Type a command and press Enter."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#0d0d0b] border border-border-subtle rounded-lg overflow-hidden max-w-3xl shadow-[0_0_60px_rgba(212,160,71,0.03)]"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle bg-surface/30">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
          </div>
          <span className="text-[10px] text-text-muted font-mono tracking-wider uppercase">
            rohan@portfolio
          </span>
          <div className="w-16" />
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-5 font-mono text-[13px] h-[420px] overflow-y-auto leading-[1.8]"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.type === "input"
                  ? "text-text-primary mt-4"
                  : "text-text-muted"
              } ${line.content === "" ? "h-5" : ""}`}
            >
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center mt-4">
            <span className="text-accent mr-3 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-text-primary caret-accent"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="w-[7px] h-[18px] bg-accent/80 animate-pulse ml-0.5" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
