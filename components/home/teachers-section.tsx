import Image from 'next/image'
import { Play } from 'lucide-react'

const stats = [
  { value: '300+', label: 'Sagat wideo sapak' },
  { value: '15+', label: 'Hünärmen mugallym' },
  { value: '500+', label: 'Işjeň okuwçy' },
  { value: '98%', label: 'Kanagatlanma derejesi' },
]

export function TeachersSection() {
  return (
    <section id="about" className="border-y border-border bg-secondary/30 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <Image
            src="/images/hero-lesson.png"
            alt="Sapak berýän mugallym"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </span>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Näme üçin biz
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Iň gowy mugallymlardan öwreniň
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Sapaklarymyz öz ugrunda hakyky iş tejribesi bolan hünärmenler
            tarapyndan taýýarlanýar. 24/7 elýeterlilik, resmi sertifikatlar we
            mugallym goldawy bilen öz depginiňizde öwreniň.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary pl-4">
                <dt className="font-display text-3xl font-extrabold text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
