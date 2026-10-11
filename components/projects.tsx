import { ArrowUpRight } from "lucide-react"

const PROJECTS = [
  {
    name: "gitops-delivery",
    title: "GitOps delivery on Kubernetes",
    description:
      "GitLab CI builds and tests the app, pushes the image, then bumps the Helm chart. ArgoCD picks up the change and deploys it — services exposed on bare metal with MetalLB and an ingress controller.",
    stack: ["GitLab CI", "Docker", "Helm", "ArgoCD", "Kubernetes", "MetalLB"],
    image: "/GitOps.png",
    flow: ["git push", "helm bump", "argocd sync"],
    link: "https://medium.com/@ribeshshr/gitops-in-action-ci-cd-workflow-using-gitlab-helm-and-argocd-1b929870ba86",
  },
  {
    name: "devsecops-pipeline",
    title: "DevSecOps pipeline",
    description:
      "Jenkins pipeline that runs Gitleaks for secrets, SonarQube for code quality and Trivy for image vulnerabilities before pushing and deploying to Kubernetes.",
    stack: ["Jenkins", "Gitleaks", "SonarQube", "Trivy", "Kubernetes"],
    image: "/Pipeline.png",
    flow: ["gitleaks", "sonarqube", "trivy", "deploy"],
  },
  {
    name: "banking-observability",
    title: "Monitoring for Newgen & Finacle",
    description:
      "Zabbix and Grafana dashboards covering host health, WebSphere frontend services, Finacle backend services and Oracle DB for a banking client.",
    stack: ["Zabbix", "Grafana", "WebSphere", "Oracle DB"],
    flow: ["collect", "alert", "dashboard"],
  },
  {
    name: "aws-three-tier",
    title: "Three-tier & serverless on AWS",
    description:
      "Three-tier architecture in Terraform deployed through GitHub Actions, a serverless image-processing pipeline on S3, Lambda, API Gateway and DynamoDB, and a highly available web tier behind an ALB.",
    stack: ["Terraform", "GitHub Actions", "Lambda", "DynamoDB", "CloudFront", "ALB"],
    flow: ["terraform apply", "actions deploy", "cloudfront"],
  },
  {
    name: "central-logging",
    title: "Central logging with ELK / EFK",
    description:
      "ELK stack on Docker and an EFK stack on Kubernetes, giving containerized services a single place to search logs from.",
    stack: ["Elasticsearch", "Fluentd", "Kibana", "Docker", "Kubernetes"],
    flow: ["ship logs", "index", "search"],
  },
  {
    name: "frappe-books",
    title: "Frappe Books, customized",
    description:
      "Customized the open-source accounting app for my own business — stripped what I didn't need, added department-store style bill printing. Still in daily use.",
    stack: ["Frappe", "Python"],
    flow: ["fork", "customize", "self-host"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-panel/40">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">projects</h2>
        <p className="font-mono text-sm text-muted-foreground mb-12">$ kubectl get deployments</p>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="rounded-sm border border-border bg-panel overflow-hidden flex flex-col"
            >
              {project.image ? (
                <div className="aspect-video overflow-hidden border-b border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 px-5 py-4 border-b border-border font-mono text-xs text-muted-foreground overflow-x-auto">
                  {project.flow.map((step, i) => (
                    <div key={step} className="flex items-center gap-2 shrink-0">
                      {i > 0 && <span className="text-border-strong">→</span>}
                      <span className="px-2 py-1 rounded-sm bg-panel-strong border border-border">{step}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-green shrink-0" />
                  <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-0.5 rounded-sm bg-panel-strong text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-auto"
                  >
                    Read the write-up
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
