import { BadgeCheck, GraduationCap } from "lucide-react"

const CERTIFICATIONS = [
  { name: "AWS Certified Solutions Architect – Associate (SAA-C03)", issuer: "AWS", date: "Jun 2025" },
]

const TRAINING = [
  { name: "CKA Course, Kubernetes & Docker for Beginners, DevOps Prerequisites", issuer: "KodeKloud", date: "2025" },
  { name: "RHEL 9 Bootcamp", issuer: "N9 Solution", date: "2024" },
  { name: "AZ-500: Microsoft Azure Security Technologies", issuer: "Styava", date: "2022" },
  { name: "Programming in Python, Version Control, Databases for Back-end Development", issuer: "Meta · Coursera", date: "2024" },
]

export function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">certifications</h2>
        <p className="font-mono text-sm text-muted-foreground mb-12">$ cat credentials.log</p>

        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <BadgeCheck className="h-4 w-4 text-status-green" />
          certification
        </div>
        <div className="divide-y divide-border border border-border rounded-sm overflow-hidden mb-10">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="flex items-start gap-3 px-5 py-4 bg-panel">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">{cert.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} · exam-verified</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground shrink-0">{cert.date}</span>
            </div>
          ))}
        </div>

        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <GraduationCap className="h-4 w-4 text-amber" />
          training &amp; courses
        </div>
        <div className="divide-y divide-border border border-border rounded-sm overflow-hidden">
          {TRAINING.map((item) => (
            <div key={item.name} className="flex items-start gap-3 px-5 py-4 bg-panel">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.issuer}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground shrink-0">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
