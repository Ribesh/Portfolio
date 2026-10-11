"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { PROFILE } from "@/lib/data"
import { SPRING, SPRING_SNAPPY } from "@/lib/motion"

const BOOT_LINES = [
  "$ ssh ribesh@production",
  "authenticating... ok",
  "loading profile: senior-devops-engineer.yaml",
  "mounting 7 years of on-call experience",
  "status: ready",
]

export function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      setVisibleLines(BOOT_LINES.length)
      setBooted(true)
      return
    }

    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 220 * i + 200)
    )
    const finish = setTimeout(() => setBooted(true), 220 * BOOT_LINES.length + 450)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 overflow-hidden"
    >
      <div className="glow absolute inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden />

      <div className="relative max-w-3xl mx-auto w-full py-20">
        <div className="font-mono text-sm text-muted-foreground mb-10 space-y-1 min-h-[7.5rem]">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={line.startsWith("$") ? "text-foreground" : ""}>
              {line === "status: ready" ? (
                <span className="text-status-green">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
          {visibleLines < BOOT_LINES.length && (
            <span className="inline-block h-4 w-2 bg-accent animate-caret-blink" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={SPRING}
        >
          <h1 className="text-display text-5xl sm:text-7xl text-foreground text-balance mb-4">
            {PROFILE.name}
          </h1>
          <p className="text-xl sm:text-2xl text-accent mb-6">{PROFILE.role}</p>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            About seven years keeping deployments boring on purpose — Kubernetes and Jenkins
            pipelines for 60+ microservices on Azure, and the automation that means nobody has
            to babysit a release.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <motion.a
              href={`mailto:${PROFILE.email}`}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_SNAPPY}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg shadow-accent/20 hover:brightness-110 transition-[filter]"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileTap={{ scale: 0.96 }}
              transition={SPRING_SNAPPY}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full material border border-border text-sm font-medium text-foreground hover:bg-panel-strong/60 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download résumé
            </motion.a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
