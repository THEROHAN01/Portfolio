"use client";

import { useState, useCallback } from "react";
import { terminalCommands } from "@/lib/terminal-commands";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: 'Welcome to rohan@portfolio. Type "help" to start.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim().toLowerCase();

    setLines((prev) => [...prev, { type: "input", content: `$ ${input}` }]);
    setHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const cmd = terminalCommands[trimmed];
    if (cmd) {
      const outputLines = Array.isArray(cmd.output) ? cmd.output : [cmd.output];
      setLines((prev) => [
        ...prev,
        ...outputLines.map((line) => ({ type: "output" as const, content: line })),
      ]);
    } else if (trimmed === "") {
      // do nothing for empty input
    } else {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          content: `command not found: ${trimmed}. Type "help" for available commands.`,
        },
      ]);
    }
  }, []);

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up" && historyIndex < history.length - 1) {
        setHistoryIndex((prev) => prev + 1);
        return history[historyIndex + 1];
      }
      if (direction === "down" && historyIndex > 0) {
        setHistoryIndex((prev) => prev - 1);
        return history[historyIndex - 1];
      }
      if (direction === "down" && historyIndex === 0) {
        setHistoryIndex(-1);
        return "";
      }
      return null;
    },
    [history, historyIndex]
  );

  return { lines, executeCommand, navigateHistory };
}
