"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { SPRING } from "@/lib/motion"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={SPRING}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
