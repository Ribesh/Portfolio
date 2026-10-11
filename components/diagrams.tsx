// Hand-authored inline diagrams for projects that don't have a real screenshot.
// Shared layout primitives kept deliberately small — these are five one-off
// illustrations, not a generic diagramming engine.

import type { ReactNode } from "react"

type Tone = "default" | "accent" | "amber" | "green"

const TONE: Record<Tone, { stroke: string; text: string }> = {
  default: { stroke: "var(--border-strong)", text: "var(--foreground)" },
  accent: { stroke: "var(--accent)", text: "var(--accent)" },
  amber: { stroke: "var(--amber)", text: "var(--amber)" },
  green: { stroke: "var(--status-green)", text: "var(--status-green)" },
}

function NodeBox({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  tone = "default",
  dashed = false,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  sublabel?: string
  tone?: Tone
  dashed?: boolean
}) {
  const c = TONE[tone]
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill="var(--panel-strong)"
        stroke={c.stroke}
        strokeWidth={1.4}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={x + w / 2}
        y={sublabel ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12}
        fill={c.text}
      >
        {label}
      </text>
      {sublabel && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize={9.5} fill="var(--muted-foreground)">
          {sublabel}
        </text>
      )}
    </g>
  )
}

function Edge({
  d,
  markerId,
  dashed = false,
}: {
  d: string
  markerId: string
  dashed?: boolean
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--border-strong)"
      strokeWidth={1.3}
      strokeDasharray={dashed ? "3 3" : undefined}
      markerEnd={`url(#${markerId})`}
    />
  )
}

function EdgeLabel({ x, y, text, width }: { x: number; y: number; text: string; width: number }) {
  return (
    <g>
      <rect x={x - width / 2} y={y - 9} width={width} height={14} fill="var(--panel-strong)" />
      <text x={x} y={y + 2} textAnchor="middle" fontSize={9.5} fill="var(--muted-foreground)">
        {text}
      </text>
    </g>
  )
}

function Arrowhead({ id }: { id: string }) {
  return (
    <marker id={id} markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="var(--border-strong)" />
    </marker>
  )
}

function DiagramFrame({
  viewBox,
  label,
  children,
}: {
  viewBox: string
  label: string
  children: ReactNode
}) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-panel-strong">
      <svg viewBox={viewBox} role="img" aria-label={label} className="w-full h-full p-3">
        {children}
      </svg>
    </div>
  )
}

export function KarpenterDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 520 260"
      label="Diagram: a pod the scheduler can't place triggers Karpenter inside the EKS cluster to provision a right-sized EC2 node, then later consolidates idle nodes and terminates them."
    >
      <defs>
        <Arrowhead id="arrow-karpenter" />
      </defs>

      <rect x={170} y={30} width={330} height={190} rx={6} fill="none" stroke="var(--border)" strokeDasharray="4 4" />
      <text x={185} y={48} fontSize={10.5} fill="var(--muted-foreground)">eks cluster</text>

      <NodeBox x={20} y={95} w={110} h={60} label="pod" sublabel="unschedulable" tone="amber" />
      <NodeBox x={205} y={95} w={125} h={60} label="karpenter" sublabel="controller" tone="accent" />
      <NodeBox x={390} y={95} w={100} h={60} label="EC2 node" sublabel="right-sized" tone="green" />

      <Edge d="M130,125 L205,125" markerId="arrow-karpenter" />
      <EdgeLabel x={167} y={113} text="watches" width={48} />

      <Edge d="M330,125 L390,125" markerId="arrow-karpenter" />
      <EdgeLabel x={360} y={113} text="provisions" width={56} />

      <Edge
        d="M440,155 C440,205 270,205 267,155"
        markerId="arrow-karpenter"
        dashed
      />
      <EdgeLabel x={353} y={214} text="consolidates idle nodes" width={128} />
    </DiagramFrame>
  )
}

export function BankingObservabilityDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 520 260"
      label="Diagram: WebSphere, Finacle and Oracle DB each report metrics to Zabbix, Grafana queries Zabbix for dashboards, and alerts route to the team that owns the problem."
    >
      <defs>
        <Arrowhead id="arrow-banking" />
      </defs>

      <NodeBox x={20} y={20} w={130} h={48} label="WebSphere" sublabel="frontend" />
      <NodeBox x={20} y={105} w={130} h={48} label="Finacle" sublabel="backend" />
      <NodeBox x={20} y={190} w={130} h={48} label="Oracle DB" />

      <NodeBox x={220} y={95} w={110} h={70} label="zabbix" sublabel="collects + alerts" tone="accent" />
      <NodeBox x={390} y={95} w={110} h={70} label="grafana" sublabel="dashboards" tone="green" />
      <NodeBox x={390} y={195} w={110} h={48} label="on-call" sublabel="owning team" tone="amber" />

      <Edge d="M150,44 L185,44 L185,120 L220,120" markerId="arrow-banking" />
      <Edge d="M150,129 L220,129" markerId="arrow-banking" />
      <Edge d="M150,214 L185,214 L185,145 L220,145" markerId="arrow-banking" />
      <EdgeLabel x={193} y={70} text="metrics" width={46} />

      <Edge d="M330,129 L390,129" markerId="arrow-banking" />
      <EdgeLabel x={360} y={117} text="query" width={38} />

      <Edge d="M445,165 L445,195" markerId="arrow-banking" />
      <EdgeLabel x={463} y={182} text="alerts" width={38} />
    </DiagramFrame>
  )
}

export function AwsThreeTierDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 520 260"
      label="Diagram: Route 53 and an ALB front an auto-scaling web tier inside a private subnet, which reads and writes a Multi-AZ RDS instance; a bastion host is the only SSH path in."
    >
      <defs>
        <Arrowhead id="arrow-aws" />
      </defs>

      <NodeBox x={20} y={20} w={110} h={46} label="Route 53" />
      <NodeBox x={330} y={20} w={120} h={46} label="bastion host" tone="amber" />

      <rect x={150} y={20} width={150} height={46} rx={4} fill="var(--panel-strong)" stroke="var(--accent)" strokeWidth={1.4} />
      <text x={225} y={40} textAnchor="middle" fontSize={12} fill="var(--accent)">ALB</text>
      <text x={225} y={53} textAnchor="middle" fontSize={9.5} fill="var(--muted-foreground)">public subnet</text>

      <rect x={120} y={100} width={360} height={140} rx={6} fill="none" stroke="var(--border)" strokeDasharray="4 4" />
      <text x={135} y={118} fontSize={10.5} fill="var(--muted-foreground)">private subnet</text>

      <NodeBox x={150} y={140} w={150} h={70} label="web / app tier" sublabel="auto scaling" tone="green" />
      <NodeBox x={360} y={140} w={100} h={70} label="RDS" sublabel="multi-AZ" />

      <Edge d="M130,43 L150,43" markerId="arrow-aws" />
      <Edge d="M225,66 L225,140" markerId="arrow-aws" />
      <Edge d="M300,175 L360,175" markerId="arrow-aws" />

      <Edge d="M390,66 L390,85 L140,85 L140,160 L150,160" markerId="arrow-aws" dashed />
      <EdgeLabel x={265} y={85} text="ssh" width={28} />
    </DiagramFrame>
  )
}

export function CentralLoggingDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 600 260"
      label="Diagram: Docker services ship logs through Logstash and Kubernetes pods ship them through Fluentd, both into one Elasticsearch index that Kibana searches."
    >
      <defs>
        <Arrowhead id="arrow-logging" />
      </defs>

      <NodeBox x={20} y={30} w={140} h={55} label="docker services" sublabel="ELK" />
      <NodeBox x={20} y={160} w={140} h={55} label="kubernetes pods" sublabel="EFK" />

      <NodeBox x={210} y={30} w={110} h={55} label="logstash" tone="accent" />
      <NodeBox x={210} y={160} w={110} h={55} label="fluentd" tone="accent" />

      <NodeBox x={380} y={95} w={120} h={70} label="elasticsearch" sublabel="index" tone="green" />
      <NodeBox x={540} y={95} w={50} h={70} label="" />
      <text x={565} y={135} textAnchor="middle" fontSize={11} fill="var(--foreground)">kibana</text>

      <Edge d="M160,57 L210,57" markerId="arrow-logging" />
      <Edge d="M160,187 L210,187" markerId="arrow-logging" />
      <EdgeLabel x={185} y={45} text="ship" width={30} />
      <EdgeLabel x={185} y={199} text="ship" width={30} />

      <Edge d="M320,57 L350,57 L350,120 L380,120" markerId="arrow-logging" />
      <Edge d="M320,187 L350,187 L350,140 L380,140" markerId="arrow-logging" />

      <Edge d="M500,130 L540,130" markerId="arrow-logging" />
      <EdgeLabel x={520} y={118} text="search" width={34} />
    </DiagramFrame>
  )
}

export function FrappeBooksDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 600 220"
      label="Diagram: Frappe Books is forked, stripped down and given department-store style bill printing, then self-hosted for daily use."
    >
      <defs>
        <Arrowhead id="arrow-frappe" />
      </defs>

      <NodeBox x={20} y={80} w={150} h={60} label="frappe books" sublabel="upstream" />
      <NodeBox x={240} y={80} w={180} h={60} label="customized build" sublabel="trimmed + bill printing" tone="accent" />
      <NodeBox x={490} y={80} w={95} h={60} label="self-hosted" sublabel="daily use" tone="green" />

      <Edge d="M170,110 L240,110" markerId="arrow-frappe" />
      <EdgeLabel x={205} y={98} text="fork" width={32} />

      <Edge d="M420,110 L490,110" markerId="arrow-frappe" />
      <EdgeLabel x={455} y={98} text="ships" width={36} />
    </DiagramFrame>
  )
}
