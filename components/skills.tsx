import { Cloud, Boxes, GitBranch, FileCode2, ShieldCheck, Activity, Code2, Server } from "lucide-react"

const STACK = [
  { title: "cloud", icon: Cloud, tools: ["Azure", "AWS EC2", "AWS S3", "AWS VPC", "Lambda", "RDS", "IAM", "CloudWatch"] },
  { title: "containers & orchestration", icon: Boxes, tools: ["Kubernetes", "Ingress", "MetalLB", "StatefulSets", "Helm", "Docker", "Docker Compose"] },
  { title: "ci/cd & gitops", icon: GitBranch, tools: ["GitLab CI", "Jenkins", "GitHub Actions", "ArgoCD"] },
  { title: "iac & config", icon: FileCode2, tools: ["Terraform", "Ansible", "CloudFormation", "Vagrant"] },
  { title: "security & quality", icon: ShieldCheck, tools: ["SonarQube", "Trivy", "Gitleaks"] },
  { title: "observability", icon: Activity, tools: ["Prometheus", "Grafana", "Zabbix", "ELK / EFK"] },
  { title: "languages", icon: Code2, tools: ["Bash", "Python", "Go"] },
  { title: "os", icon: Server, tools: ["Linux (RHEL)"] },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">stack</h2>
        <p className="font-mono text-sm text-muted-foreground mb-12">$ kubectl get tools --all-namespaces</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-sm overflow-hidden">
          {STACK.map((group) => (
            <div key={group.title} className="bg-panel p-5">
              <div className="flex items-center gap-2 mb-4">
                <group.icon className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs px-2 py-1 rounded-sm bg-panel-strong text-muted-foreground border border-border"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
