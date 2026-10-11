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
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">about</h2>
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
          <img
            src="/Ribesh.jpg"
            alt="Ribesh Shrestha"
            className="rounded-sm border border-border w-full max-w-xs mx-auto md:mx-0 md:ml-auto"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden border border-border">
          {FACTS.map((fact) => (
            <div key={fact.label} className="bg-panel p-6">
              <div className="font-mono text-2xl text-accent mb-1">{fact.value}</div>
              <div className="text-sm font-medium text-foreground mb-2">{fact.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
