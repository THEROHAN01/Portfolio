"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

export function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(500px circle at ${x}px ${y}px, var(--color-accent-glow), transparent 60%)`,
      }}
    />
  );
}
