"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { PROFILE } from "@/lib/data"

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
    <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-14">
      <div className="max-w-3xl mx-auto w-full py-20">
        <div className="font-mono text-sm text-muted-foreground mb-8 space-y-1 min-h-[7.5rem]">
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

        <div
          className={`transition-all duration-700 ${
            booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground text-balance mb-3">
            {PROFILE.name}
          </h1>
          <p className="text-xl sm:text-2xl text-accent font-mono mb-6">{PROFILE.role}</p>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            About seven years keeping deployments boring on purpose — Kubernetes and Jenkins
            pipelines for 60+ microservices on Azure, and the automation that means nobody has
            to babysit a release.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-sm bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 h-10 px-5 rounded-sm border border-border text-sm font-medium text-foreground hover:bg-panel-strong transition-colors"
            >
              <Download className="h-4 w-4" />
              Download résumé
            </a>
          </div>

          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </section>
  )
}
