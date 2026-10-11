"use client"

import { motion } from "motion/react"
import { fadeUp, stagger, viewport } from "@/lib/motion"

const RELEASES = [
  {
    title: "Senior DevOps Engineer",
    company: "Sterling Wells Nepal",
    period: "Apr 2026 — present",
    status: "current",
    points: [
      "Run the platform for 60+ microservices across several client products, on self-managed Kubernetes clusters built on Azure VMs.",
      "Own the Jenkins pipelines these services ship through, from build and test to deployment on the clusters.",
      "Led the technical work that got two products, Rentalbux and Figsflow, through Cyber Essentials certification.",
    ],
    stack: ["Kubernetes", "Azure", "Jenkins"],
  },
  {
    title: "Senior DevOps & System Engineer",
    company: "CAS Trading House",
    period: "Aug 2021 — Oct 2025",
    status: "past",
    points: [
      "Started the company's DevOps practice and moved teams onto a central GitLab setup.",
      "Built CI/CD pipelines in GitLab CI and Jenkins with SonarQube checks on every run, and containerized a monolith into independently scaling services.",
      "Set up an on-prem Kubernetes cluster with kubeadm, replaced manual ops with Ansible, and provisioned infrastructure with Terraform and Vagrant.",
      "Ran Zabbix monitoring for servers and applications with alerts routed to the owning team.",
    ],
    stack: ["GitLab CI", "Jenkins", "Docker", "Kubernetes", "Ansible", "Terraform", "Zabbix"],
  },
  {
    title: "System Engineer",
    company: "CAS Trading House",
    period: "Aug 2019 — Aug 2021",
    status: "past",
    points: [
      "Supported the Symantec IGA (Broadcom) deployment at Ncell Pvt. Ltd., handling identity lifecycle management and access governance.",
    ],
    stack: ["Symantec IGA", "Access Governance"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <h2 className="text-headline text-3xl sm:text-4xl text-foreground mb-2">Experience</h2>
          <p className="font-mono text-sm text-muted-foreground mb-12">
            $ git log --author=ribesh --since=2019
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.15)}
          className="relative"
        >
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden />
          <div className="space-y-10">
            {RELEASES.map((role) => (
              <motion.div key={role.title + role.period} variants={fadeUp} className="relative pl-8">
                <span
                  className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                    role.status === "current" ? "bg-status-green" : "bg-border-strong"
                  }`}
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3 className="text-lg text-foreground">
                    {role.title} <span className="text-muted-foreground font-normal">· {role.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">{role.period}</span>
                </div>
                <ul className="space-y-1.5 mb-3">
                  {role.points.map((point) => (
                    <li key={point} className="text-sm text-muted-foreground leading-relaxed pl-4 relative">
                      <span className="absolute left-0 text-border-strong">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-full bg-panel-strong text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
