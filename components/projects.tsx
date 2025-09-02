import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "GitOps in Action: CI/CD Workflow using GitLab, Helm, and ArgoCD",
      description:
        "CI/CD pipeline with GitLab, Docker, Helm, and ArgoCD for automated testing, containerization, and Kubernetes deployment with Nginx ingress and MetalLB.",
      image: "/GitOps.png",
      technologies: ["GitLab CI/CD", "Docker", "Helm", "ArgoCD", "Kubernetes", "Nginx", "MetalLB"],
      liveUrl: "https://medium.com/@ribeshshr/gitops-in-action-ci-cd-workflow-using-gitlab-helm-and-argocd-1b929870ba86",
      // ArticleLink: "#",
      // githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates, team collaboration, and progress tracking.",
      image: "/task-management-dashboard.png",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      // liveUrl: "https://medium.com/@ribeshshr/gitops-in-action-ci-cd-workflow-using-gitlab-helm-and-argocd-1b929870ba86",
      // githubUrl: "#",
    },
    {
      title: "Weather Analytics Dashboard",
      description:
        "Data visualization dashboard showing weather patterns and analytics with interactive charts and maps.",
      image: "/weather-analytics-dashboard.png",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media App",
      description: "Mobile-first social platform with real-time messaging, photo sharing, and social features.",
      image: "/social-media-app-interface.png",
      technologies: ["React Native", "Firebase", "Redux", "Expo", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground">Some of my recent work and side projects</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
