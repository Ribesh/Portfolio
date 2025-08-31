"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TerminalIcon, Minimize2, Maximize2 } from "lucide-react"

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: string }>>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: "Available commands: about, skills, projects, experience, contact, clear, whoami",
    about: "I am a passionate DevOps Engineer with 3+ years of Experience.",
    skills: "Frontend: React, TypeScript, Next.js | Backend: Node.js, Python | Database: PostgreSQL, MongoDB",
    projects: "Recent projects: E-Commerce Platform, Task Management App, Weather Dashboard, Social Media App",
    experience:
      "Senior System Engineer at CAS Total Solutions (2019-Present) | Previously, AWS Cloud Apprenticeship (SAA-C03) at Adex International",
    contact: "Email: ribeshshr@gmail.com | LinkedIn: https://www.linkedin.com/in/ribesh-shrestha/ | GitHub: https://github.com/Ribesh",
    whoami: "ribesh@portfolio:~$ You are viewing the portfolio of Ribesh Shrestha",
    clear: "CLEAR_TERMINAL",
  }

  useEffect(() => {
    // Add welcome message on component mount
    setHistory([
      {
        command: "",
        output: 'Welcome to Ribesh\'s Portfolio Terminal! Type "help" to see available commands.',
        timestamp: new Date().toLocaleTimeString(),
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
    const timestamp = new Date().toLocaleTimeString()

    if (command === "clear") {
      setHistory([])
      return
    }

    const output =
      commands[command as keyof typeof commands] || `Command not found: ${command}. Type "help" for available commands.`

    setHistory((prev) => [...prev, { command: cmd, output, timestamp }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  const focusInput = () => {
    if (inputRef.current && !isMinimized) {
      inputRef.current.focus()
    }
  }

  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Interactive Terminal</h2>
          <p className="text-lg text-muted-foreground">Explore my portfolio through a terminal interface</p>
        </div>

        <Card className="bg-gray-900 text-green-400 font-mono text-sm overflow-hidden">
          <CardHeader className="bg-gray-800 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4" />
                {/* <CardTitle className="text-sm text-gray-300">john@portfolio:~</CardTitle> */}
                <CardTitle className="text-sm text-gray-300">ribesh@portfolio:~</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-4" onClick={focusInput}>
              <div ref={outputRef} className="h-80 overflow-y-auto mb-4 space-y-2">
                {history.map((entry, index) => (
                  <div key={index}>
                    {entry.command && (
                      <div className="flex items-center gap-2">
                        {/* <span className="text-blue-400">john@portfolio:~$</span> */}
                        <span className="text-blue-400">ribesh@portfolio:~$</span>
                        <span className="text-white">{entry.command}</span>
                      </div>
                    )}
                    <div className="text-green-400 whitespace-pre-wrap pl-4">{entry.output}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                {/* <span className="text-blue-400">john@portfolio:~$</span> */}
                <span className="text-blue-400">ribesh@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                  placeholder="Type a command..."
                  autoFocus
                />
              </form>

              <div className="mt-4 text-xs text-gray-500">
                Tip: Try commands like "about", "skills", "projects", or "help"
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  )
}
