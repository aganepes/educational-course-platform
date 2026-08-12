import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Bu platforma karýeramy düýbünden özgertdi. Web ösüşi kursyny tamamlap, alty aýyň içinde ilkinji işime başladym.',
    name: 'Merdan Çaryýew',
    role: 'Frontend Dörediji',
    initials: 'MÇ',
    color: 'bg-primary/15 text-primary',
  },
  {
    quote:
      'Mugallymlar hakykatdan-da öz ugrunyň ussatlary. Sapaklar düşnükli, amaly we hemişe goldaw bar.',
    name: 'Aýnur Hojaýewa',
    role: 'UI/UX Dizaýner',
    initials: 'AH',
    color: 'bg-accent/15 text-accent',
  },
  {
    quote:
      'Islän wagtym öwrenip bilýärin. Data ylym kursy meniň üçin täze mümkinçilikleriň gapysyny açdy.',
    name: 'Serdar Ataýew',
    role: 'Data Analitik',
    initials: 'SA',
    color: 'bg-chart-3/15 text-chart-3',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Pikirler
        </p>
        <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Okuwçylarymyz näme diýýär
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-8"
          >
            <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold ${t.color}`}
              >
                {t.initials}
              </span>
              <span>
                <span className="block font-display font-bold text-foreground">
                  {t.name}
                </span>
                <span className="block text-sm text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
