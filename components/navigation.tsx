"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { Menu, X } from "lucide-react"
import { NAV_ITEMS, PROFILE } from "@/lib/data"
import { ThemeToggle } from "@/components/theme-toggle"
import { SPRING_SNAPPY } from "@/lib/motion"

function useUptime(since: string) {
  const [label, setLabel] = useState("")

  useEffect(() => {
    const start = new Date(since).getTime()
    const tick = () => {
      const ms = Date.now() - start
      const days = Math.floor(ms / 86_400_000)
      const years = Math.floor(days / 365)
      const remDays = days % 365
      setLabel(years > 0 ? `${years}y ${remDays}d` : `${days}d`)
    }
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [since])

  return label
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const uptime = useUptime(PROFILE.careerStart)

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-3xl mx-auto material-strong rounded-full border border-border shadow-lg shadow-black/5">
        <div className="flex h-12 items-center justify-between gap-2 px-2">
          <Link
            href="/"
            className="font-mono text-xs text-foreground shrink-0 px-3 py-1.5 rounded-full hover:bg-panel-strong/60 transition-colors"
          >
            <span className="text-accent">{PROFILE.handle}</span>
            <span className="text-muted-foreground">@shrestha</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5 text-sm">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                    active ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={SPRING_SNAPPY}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 pr-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-status-green animate-status-pulse" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-green" />
              </span>
              up {uptime}
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={SPRING_SNAPPY}
          className="md:hidden max-w-3xl mx-auto mt-2 material-strong rounded-3xl border border-border shadow-lg shadow-black/5 overflow-hidden"
        >
          <div className="flex flex-col p-2 text-sm">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-left px-4 py-2.5 rounded-xl ${
                    active ? "text-accent-foreground bg-accent" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-status-green" />
              operational · up {uptime}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
