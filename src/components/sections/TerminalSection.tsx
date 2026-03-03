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
    <section id="terminal" className="max-w-6xl mx-auto px-6 py-32">
      <SectionHeading
        label="Interactive"
        title="Talk to the terminal."
        description="Type a command and press Enter."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-surface border border-border rounded-xl overflow-hidden max-w-3xl"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-text-muted font-mono">
            rohan@portfolio ~
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-4 font-mono text-sm h-[400px] overflow-y-auto"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.type === "input"
                  ? "text-text-primary mt-3"
                  : "text-text-muted"
              } ${line.content === "" ? "h-4" : ""}`}
            >
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center mt-3">
            <span className="text-accent mr-2">$</span>
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
          </div>
        </div>
      </motion.div>
    </section>
  );
}
