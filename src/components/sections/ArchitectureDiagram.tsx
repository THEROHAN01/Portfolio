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
    <div className="relative w-full bg-bg border border-border rounded-lg p-4 overflow-x-auto">
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
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x + nodeWidth / 2}
                y1={node.y + nodeHeight / 2}
                x2={target.x + nodeWidth / 2}
                y2={target.y + nodeHeight / 2}
                stroke={
                  activeNode === node.id || activeNode === targetId
                    ? "#0070F3"
                    : "#333333"
                }
                strokeWidth={activeNode === node.id || activeNode === targetId ? 2 : 1}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            className="cursor-pointer"
          >
            <rect
              x={node.x}
              y={node.y}
              width={nodeWidth}
              height={nodeHeight}
              rx={8}
              fill={activeNode === node.id ? "#1a1a1a" : "#111111"}
              stroke={activeNode === node.id ? "#0070F3" : "#333333"}
              strokeWidth={activeNode === node.id ? 2 : 1}
            />
            <text
              x={node.x + nodeWidth / 2}
              y={node.y + nodeHeight / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={activeNode === node.id ? "#0070F3" : "#ededed"}
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Tooltip */}
        {activeNode && (() => {
          const node = nodes.find((n) => n.id === activeNode);
          if (!node) return null;
          const tooltipY = node.y - 35;
          return (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <rect
                x={node.x - 10}
                y={tooltipY}
                width={nodeWidth + 20}
                height={25}
                rx={4}
                fill="#0070F3"
              />
              <text
                x={node.x + nodeWidth / 2}
                y={tooltipY + 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="9"
                fontFamily="var(--font-mono)"
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
