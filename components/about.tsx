"use client"

import { motion } from "motion/react"
import { ClusterVisual } from "@/components/cluster-visual"
import { fadeUp, stagger, viewport, SPRING } from "@/lib/motion"

const FACTS = [
  {
    value: "60+",
    label: "microservices",
    detail: "Running on self-managed Kubernetes clusters on Azure VMs, shipped through Jenkins.",
  },
  {
    value: "2.5m → sec",
    label: "build time cut",
    detail: "Switched to multi-stage Dockerfiles, shrinking images and pipeline time.",
  },
  {
    value: "2",
    label: "products certified",
    detail: "Led the technical work behind Rentalbux and Figsflow passing Cyber Essentials.",
  },
]

export function About() {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start mb-16"
        >
          <div>
            <h2 className="text-headline text-3xl sm:text-4xl text-foreground mb-6">About</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I set up the first CI/CD and container workflow at my previous company, moving a
              monolith onto Docker and splitting it into services that deploy and scale on their
              own. These days I run Kubernetes and Jenkins pipelines for 60+ microservices on
              Azure, and I'm AWS Certified (Solutions Architect – Associate).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Most of my time goes into automating the boring parts of ops — the kind of work
              that's only noticed when it breaks — so releases stay quick and nobody has to
              babysit them. On-prem Kubernetes with kubeadm, Terraform and Ansible for
              provisioning, Zabbix and Grafana for keeping an eye on everything.
            </p>
          </div>
          <ClusterVisual />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger()}
          className="grid sm:grid-cols-3 gap-4"
        >
          {FACTS.map((fact) => (
            <motion.div
              key={fact.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={SPRING}
              className="material rounded-2xl border border-border p-6 shadow-sm"
            >
              <div className="font-mono text-2xl text-accent mb-1">{fact.value}</div>
              <div className="text-sm font-medium text-foreground mb-2">{fact.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{fact.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
