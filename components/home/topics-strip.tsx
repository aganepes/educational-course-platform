import Link from 'next/link';
import Image from 'next/image';
import topics from '@/data/topics';

export function TopicsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Inženerçiligiň we Stackyň Her Gatlagyna Çuňňur Giriň:  3D Proýektirleme we Web Development, DevOps.
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          Demolar däl — hakyky ulgamlary we taslamalary gurýan hünärmenler tarapyndan berilýän amaly okuwlar. 3D Binagärlik hem-de Web & Mobil, Maglumat Bazalary & DevOps boýunça önümçilige taýýar hünärmen boluň.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link
            key={topic.label}
            href={`/courses/${topic.slug}`}
            className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-sm">
              <Image
                src={topic.icon}
                alt={`${topic.label} logosy`}
                width={20}
                height={20}
                className="h-full w-full object-contain transition-transform group-hover:scale-110"
              />
            </div>
            {topic.label}
          </Link>
        ))}
      </div>
    </section>
  )
}