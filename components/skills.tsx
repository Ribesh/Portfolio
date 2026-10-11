"use client"

import { motion } from "motion/react"
import { Cloud, Boxes, GitBranch, FileCode2, ShieldCheck, Activity, Code2, Server } from "lucide-react"
import { fadeUp, stagger, viewport, SPRING_SNAPPY } from "@/lib/motion"

const STACK = [
  { title: "cloud", icon: Cloud, tools: ["Azure", "AWS EC2", "AWS EKS", "AWS S3", "AWS VPC", "Lambda", "RDS", "IAM", "CloudWatch"] },
  { title: "containers & orchestration", icon: Boxes, tools: ["Kubernetes", "Karpenter", "Ingress", "MetalLB", "StatefulSets", "Helm", "Docker", "Docker Compose"] },
  { title: "ci/cd & gitops", icon: GitBranch, tools: ["GitLab CI", "Jenkins", "GitHub Actions", "ArgoCD"] },
  { title: "iac & config", icon: FileCode2, tools: ["Terraform", "Ansible", "CloudFormation", "Vagrant"] },
  { title: "security & quality", icon: ShieldCheck, tools: ["SonarQube", "Trivy", "Gitleaks"] },
  { title: "observability", icon: Activity, tools: ["Prometheus", "Grafana", "Zabbix", "ELK / EFK"] },
  { title: "languages", icon: Code2, tools: ["Bash", "Python", "Go"] },
  { title: "os", icon: Server, tools: ["Linux (RHEL)"] },
]

export function Skills() {
  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <h2 className="text-headline text-3xl sm:text-4xl text-foreground mb-2">Stack</h2>
          <p className="font-mono text-sm text-muted-foreground mb-12">$ kubectl get tools --all-namespaces</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.06)}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STACK.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={SPRING_SNAPPY}
              className="material rounded-2xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <group.icon className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs px-2.5 py-1 rounded-full bg-panel-strong text-muted-foreground border border-border"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
