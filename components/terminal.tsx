"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { TerminalIcon, Minimize2, Maximize2 } from "lucide-react"
import { PROFILE } from "@/lib/data"
import { fadeUp, viewport, SPRING_SNAPPY } from "@/lib/motion"

const COMMANDS: Record<string, string> = {
  help: "available commands: about, experience, stack, projects, certifications, contact, resume, uptime, whoami, sudo, clear",
  about:
    "Senior DevOps Engineer, ~7 years across on-prem and cloud. Run Kubernetes + Jenkins for 60+ microservices on Azure. AWS Certified Solutions Architect – Associate.",
  experience:
    "Sterling Wells Nepal — Senior DevOps Engineer (2026–present)\nCAS Trading House — Senior DevOps & System Engineer (2021–2025), System Engineer (2019–2021)",
  stack:
    "cloud: Azure, AWS | containers: Kubernetes, Docker, Helm | ci/cd: GitLab CI, Jenkins, GitHub Actions, ArgoCD | iac: Terraform, Ansible | observability: Prometheus, Grafana, Zabbix, ELK",
  projects:
    "gitops-delivery, devsecops-pipeline, banking-observability, aws-three-tier, central-logging, frappe-books — scroll up for details",
  certifications: "AWS SAA-C03 (2025), CKA coursework (2025), RHEL 9 Bootcamp (2024), AZ-500 (2022)",
  contact: `email: ${PROFILE.email} | linkedin: ${PROFILE.linkedin} | github: ${PROFILE.github}`,
  resume: "fetching /resume.pdf ... opening in a new tab",
  whoami: `${PROFILE.handle}@portfolio: you are viewing the portfolio of ${PROFILE.name}`,
  sudo: "nice try. this terminal runs as an unprivileged visitor.",
  uptime: "", // computed at call time
  clear: "CLEAR_TERMINAL",
}

function uptimeString() {
  const days = Math.floor((Date.now() - new Date(PROFILE.careerStart).getTime()) / 86_400_000)
  const years = Math.floor(days / 365)
  return `up ${years} years, ${days % 365} days — 0 incidents caused by me`
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: `welcome to ${PROFILE.handle}@portfolio. type "help" to see available commands.`,
      },
    ])
  }, [])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    if (command === "clear") {
      setHistory([])
      return
    }
    if (command === "resume" && typeof window !== "undefined") {
      window.open("/resume.pdf", "_blank")
    }

    const output =
      command === "uptime"
        ? uptimeString()
        : COMMANDS[command] ?? `command not found: ${command}. type "help" for available commands.`

    setHistory((prev) => [...prev, { command: cmd, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  return (
    <section id="terminal" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <h2 className="text-headline text-3xl sm:text-4xl text-foreground mb-2">Shell</h2>
          <p className="font-mono text-sm text-muted-foreground mb-12">a real prompt, try it</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          className="rounded-2xl border border-border material-strong overflow-hidden font-mono text-sm shadow-xl shadow-black/10"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TerminalIcon className="h-3.5 w-3.5" />
              {PROFILE.handle}@portfolio:~
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SNAPPY}
              className="text-muted-foreground hover:text-foreground p-1"
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
            >
              {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
            </motion.button>
          </div>

          {!isMinimized && (
            <div className="p-4" onClick={() => inputRef.current?.focus()}>
              <div ref={outputRef} className="h-72 overflow-y-auto mb-3 space-y-2">
                {history.map((entry, index) => (
                  <div key={index}>
                    {entry.command && (
                      <div className="flex items-center gap-2">
                        <span className="text-accent">{PROFILE.handle}@portfolio:~$</span>
                        <span className="text-foreground">{entry.command}</span>
                      </div>
                    )}
                    <div className="text-muted-foreground whitespace-pre-wrap pl-0 leading-relaxed">
                      {entry.output}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-accent">{PROFILE.handle}@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
                  placeholder="type a command..."
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
