"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArchitectureNode } from "@/types";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodeWidth = 140;
  const nodeHeight = 50;

  return (
    <div className="relative w-full bg-bg/60 border border-border-subtle rounded-lg p-6 overflow-x-auto backdrop-blur-sm">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto min-w-[500px]"
        fill="none"
      >
        {/* Connection lines */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            const isActive =
              activeNode === node.id || activeNode === targetId;
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x + nodeWidth / 2}
                y1={node.y + nodeHeight / 2}
                x2={target.x + nodeWidth / 2}
                y2={target.y + nodeHeight / 2}
                stroke={isActive ? "#d4a047" : "#2a2a24"}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeDasharray={isActive ? "0" : "4 6"}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = activeNode === node.id;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={nodeHeight}
                rx={4}
                fill={isActive ? "#1c1c18" : "#131311"}
                stroke={isActive ? "#d4a047" : "#2a2a24"}
                strokeWidth={isActive ? 1.5 : 0.5}
              />
              {isActive && (
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={4}
                  fill="none"
                  stroke="#d4a047"
                  strokeWidth={0.5}
                  opacity={0.3}
                  transform="translate(2, 2)"
                />
              )}
              <text
                x={node.x + nodeWidth / 2}
                y={node.y + nodeHeight / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isActive ? "#d4a047" : "#e8e4dc"}
                fontSize="10"
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        {/* Tooltip */}
        {activeNode &&
          (() => {
            const node = nodes.find((n) => n.id === activeNode);
            if (!node) return null;
            const tooltipY = node.y - 32;
            return (
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <rect
                  x={node.x - 15}
                  y={tooltipY}
                  width={nodeWidth + 30}
                  height={22}
                  rx={3}
                  fill="#d4a047"
                />
                <text
                  x={node.x + nodeWidth / 2}
                  y={tooltipY + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#0a0a08"
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  fontWeight="500"
                >
                  {node.description}
                </text>
              </motion.g>
            );
          })()}
      </svg>
    </div>
  );
}
