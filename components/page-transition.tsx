"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { SPRING } from "@/lib/motion"

// Deliberately no AnimatePresence/exit here: on Next's static-export client
// router, the old page's exit animation can finish (opacity -> 0) without the
// new page's enter animation ever firing, leaving content invisible until a
// reload. Keying a plain enter-only animation avoids that handoff entirely —
// React swaps children instantly, the new page just fades/slides in on mount.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING}
    >
      {children}
    </motion.div>
  )
}
