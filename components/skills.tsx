import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code, Database, Palette, Server } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      title: "CI/CD",
      icon: Code,
      skills: [
        { name: "Jenkins", level: 80 },
        { name: "Gitlab", level: 95 },
        { name: "Github Action", level: 60 },
        // { name: "Vue.js", level: 80 },
      ],
    },
    {
      title: "Containerization & Orchestration",
      icon: Server,
      skills: [
        { name: "Docker", level: 90 },
        { name: "Kubernetes", level: 85 },
        { name: "Helm", level: 88 },
        // { name: "GraphQL", level: 75 },
      ],
    },
    {
      title: "Infrastructure as Code (IaC) & Automation",
      icon: Database,
      skills: [
        { name: "Terraform", level: 75 },
        { name: "Ansible", level: 80 },
        // { name: "Redis", level: 75 },
        // { name: "Prisma", level: 90 },
      ],
    },
    {
      title: "Security & Monitoring",
      icon: Palette,
      skills: [
        { name: "Trivy", level: 70 },
        { name: "Prometheus & Grafana", level: 75 },
        { name: "Cloud Platforms (AWS)", level: 80 },
        // { name: "AWS", level: 75 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Skills</h2>
          <p className="text-lg text-muted-foreground">Technologies and tools I work with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <category.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
