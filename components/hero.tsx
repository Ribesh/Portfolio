import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-primary mb-4">Ribesh Shrestha</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">DevOps & Cloud Enthusiast</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about delivering reliable, scalable, and efficient systems through automation, infrastructure-as-code, and best-in-class DevOps practices
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            <Mail className="mr-2 h-4 w-4" />
            Get In Touch
          </Button>
        
          <a href="/resume.pdf" download>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </a>
   
          {/* <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div> */}

        <div className="flex justify-center space-x-6">
          <Button variant="ghost" size="sm">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Mail className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
