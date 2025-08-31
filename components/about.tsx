import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: Code,
      title: "Automation & CI/CD",
      description: "Designing automated pipelines and workflows to streamline deployments and reduce errors.",
    },
    {
      icon: Palette,
      title: "Reliable Infrastructure",
      description: "Building scalable, maintainable, and fault-tolerant systems that stand the test of time.",
    },
    {
      icon: Zap,
      title: "Performance & Scalability",
      description: "Optimizing systems for high availability, efficiency, and seamless cross-environment operation.",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate DevOps & Cloud Engineer with over 3 years of experience. I'm passionate about 
            solving complex problems, automating infrastracture, and improving system reliability to accelerate
            delivery in on-prem or cloud-native environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Started as a curious Computer Engineering student, I quickly fell in love with solving problems 
              through technology. What began with writing simple scripts has grown into building reliable 
              CI/CD pipelines, automating deployments, and managing scalable cloud-native systems that 
              empower teams and serve thousands of users.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, I specialize in DevOps practices, cloud infrastructure, CI/CD pipelines, containerization 
              with Docker and Kubernetes, and automation tools, always staying current with industry trends 
              and best practices.
            </p>
          </div>
          <div className="relative">
            <img
              src="public/professional-developer-headshot.png"
              alt="Developer portrait"
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <highlight.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
