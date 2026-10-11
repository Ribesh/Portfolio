"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { SPRING, SPRING_SNAPPY } from "@/lib/motion"

const CENTER = 140
const RADIUS = 96

const NODES = [
  { id: "api", label: "api", status: "healthy" },
  { id: "auth", label: "auth", status: "healthy" },
  { id: "ingress", label: "ingress", status: "healthy" },
  { id: "worker", label: "worker", status: "deploying" },
  { id: "cache", label: "cache", status: "healthy" },
  { id: "db", label: "db", status: "healthy" },
  { id: "queue", label: "queue", status: "healthy" },
].map((node, i, arr) => {
  const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2
  return {
    ...node,
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  }
})

const statusColor = (status: string) =>
  status === "deploying" ? "var(--amber)" : "var(--status-green)"

export function ClusterVisual() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative w-full max-w-xs aspect-square mx-auto md:mx-0 md:ml-auto rounded-2xl border border-border material p-4 shadow-xl shadow-black/10">
      <svg viewBox="0 0 280 280" className="w-full h-full overflow-visible" aria-hidden>
        {NODES.map((node) => (
          <line
            key={`edge-${node.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
            stroke={hovered === node.id ? "var(--accent)" : "var(--border-strong)"}
            strokeWidth={hovered === node.id ? 1.6 : 1}
            strokeDasharray="3 4"
            style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }}
          />
        ))}

        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={20}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.5}
          animate={{ r: [20, 34, 20], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx={CENTER} cy={CENTER} r={20} fill="var(--panel-strong)" stroke="var(--accent)" strokeWidth={1.5} />
        <text x={CENTER} y={CENTER + 4} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--accent)">
          k8s
        </text>

        {NODES.map((node) => (
          <motion.g
            key={node.id}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 420, bounceDamping: 18 }}
            whileHover={{ scale: 1.18 }}
            whileDrag={{ scale: 1.25 }}
            transition={SPRING_SNAPPY}
            onHoverStart={() => setHovered(node.id)}
            onHoverEnd={() => setHovered(null)}
            style={{ cursor: "grab", touchAction: "none" }}
          >
            <circle cx={node.x} cy={node.y} r={14} fill="var(--panel-strong)" stroke={statusColor(node.status)} strokeWidth={1.5} />
            <circle cx={node.x + 8} cy={node.y - 8} r={2.5} fill={statusColor(node.status)} />
            <text
              x={node.x}
              y={node.y + 26}
              textAnchor="middle"
              fontSize={9.5}
              fontFamily="var(--font-mono)"
              fill="var(--muted-foreground)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={SPRING}
        className="absolute bottom-3 left-0 right-0 text-center font-mono text-[11px] text-muted-foreground"
      >
        drag a pod
      </motion.p>
    </div>
  )
}
