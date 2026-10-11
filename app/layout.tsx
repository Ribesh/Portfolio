import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { MotionConfig } from "motion/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Ribesh Shrestha — Senior DevOps Engineer",
  description:
    "Portfolio of Ribesh Shrestha, a Senior DevOps Engineer running Kubernetes, CI/CD and cloud infrastructure for 60+ microservices.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MotionConfig reducedMotion="user">
            <div className="bg-ambient" aria-hidden />
            <Navigation />
            <main className="min-h-screen bg-background">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}
