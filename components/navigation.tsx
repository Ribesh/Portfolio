"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV_ITEMS, PROFILE } from "@/lib/data"

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
  const [activeSection, setActiveSection] = useState("home")
  const uptime = useUptime(PROFILE.careerStart)

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="font-mono text-sm text-foreground shrink-0"
          >
            <span className="text-accent">{PROFILE.handle}</span>
            <span className="text-muted-foreground">@shrestha:~$</span>
          </button>

          <div className="hidden md:flex items-center gap-1 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-sm transition-colors ${
                  activeSection === item.id
                    ? "text-accent bg-panel-strong"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                /{item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-muted-foreground shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-status-green animate-status-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-green" />
            </span>
            operational · up {uptime}
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col pt-2 font-mono text-sm">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-2 py-2.5 ${
                    activeSection === item.id ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  /{item.label}
                </button>
              ))}
              <div className="flex items-center gap-2 px-2 pt-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-status-green" />
                operational · up {uptime}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
