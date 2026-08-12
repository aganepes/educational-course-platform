import Link from 'next/link'
import { ArrowRight, Layers, Rocket, Sparkles, Cloud } from 'lucide-react'

const paths = [
  {
    tag: 'Fullstack',
    icon: Layers,
    title: 'Serwer tarapyny öwrenip, Fullstack ussady bol',
    time: 'Jemi wagt: 68 sagat',
    accent: 'text-primary',
    ring: 'group-hover:border-primary/60',
    glow: 'bg-primary/15 text-primary',
  },
  {
    tag: 'Professional',
    icon: Rocket,
    title: 'Senior Web Dörediji bolmak ýoluň',
    time: 'Jemi wagt: 71 sagat',
    accent: 'text-accent',
    ring: 'group-hover:border-accent/60',
    glow: 'bg-accent/15 text-accent',
  },
  {
    tag: 'AI bilen Kod',
    icon: Sparkles,
    title: 'Programma üpjünçiliginiň geljegini eýele',
    time: 'Jemi wagt: 38 sagat',
    accent: 'text-chart-5',
    ring: 'group-hover:border-chart-5/60',
    glow: 'bg-chart-5/15 text-chart-5',
  },
  {
    tag: 'Bulut',
    icon: Cloud,
    title: 'Islendik gerimde bulut infrastrukturasyny gur',
    time: 'Jemi wagt: 38 sagat',
    accent: 'text-chart-3',
    ring: 'group-hover:border-chart-3/60',
    glow: 'bg-chart-3/15 text-chart-3',
  },
]

export function LearningPaths() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meşhur Saýlanan Öwreniş Ýollary
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Aýdyň ýoly yzarlaň we öňdebaryjy döredijileriň ulanýan
              gurallaryny ussatlyk bilen öwreniň.
            </p>
          </div>
          <Link
            href="/kurslar"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Ählisini gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((path) => (
            <Link
              key={path.title}
              href="/kurslar"
              className={`group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 ${path.ring}`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${path.glow}`}>
                <path.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className={`mt-5 text-xs font-bold uppercase tracking-wider ${path.accent}`}>
                {path.tag}
              </span>
              <h3 className="mt-2 flex-1 text-balance font-display text-lg font-bold leading-snug text-foreground">
                {path.title}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">{path.time}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
