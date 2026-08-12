import { Metadata } from 'next'
import Image from 'next/image'
import { Play, Target, Users, Award, BookOpen, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: "Biz barada | Häzirki zaman bilim merkezi",
  description:
    "Biz barada giňişleýin maglumat. Ýokary hilli IT we peşewi bilim berýän merkezimiz, tejribeli mugallymlarymyz we hedeflerimiz bilen tanyşyň.",
}

const stats = [
  { value: '300+', label: 'Sagat wideo sapak' },
  { value: '15+', label: 'Hünärmen mugallym' },
  { value: '500+', label: 'Işjeň okuwçy' },
  { value: '98%', label: 'Kanagatlanma derejesi' },
]

const values = [
  {
    icon: Target,
    title: 'Amaly Bilim',
    description: 'Diňe teoriýa däl, eýsem hakyky taslamalar (Real Projects) üzre amaly tejribe öwredýäris.',
  },
  {
    icon: Users,
    title: 'Mugallym Goldawy',
    description: 'Sapaklaryň dowamynda we sonundan soň mugallymlarymyz bilen 24/7 aragatnaşyk saklap bilersiňiz.',
  },
  {
    icon: Award,
    title: 'Sertifikat we Portfolio',
    description: 'Kursy üstünlikli tamamlan talyplara halkara standartlaryna gabat gelýän sertifikat we portfolio berilýär.',
  },
]

export function TeachersSection() {
  return (
    <section id="about" className="border-y border-border bg-secondary/30 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border">
          <Image
            src="/images/hero-lesson.png"
            alt="Sapak berýän mugallym"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/70 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 cursor-pointer">
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Biz kim?
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-3xl mx-auto">
            Gelejegiň Hünärmenlerini Bilelikde Taýýarlaýarys
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Biz zamandaw web tehnologiýalary, dizaýn we inženerçilik ugurlary boýunça ýaşlara we hünärmenlere ýokary hilli amaly bilim hödürleýäris.
          </p>
        </div>
      </section>

      {/* Siziň komponentiňiz (TeachersSection) */}
      <TeachersSection />

      {/* Biziň Gymmatlyklarymyz (Our Values) */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Biziň Esasy Ýörelgelerimiz
            </h2>
            <p className="mt-3 text-muted-foreground">
              Bilim berliş ulgamymyz talyplaryň iň ýokary netijä ýetmegi üçin düzülgendir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Okuw Prosesi Barada FAQ / Tassyklar */}
      <section className="border-t border-border bg-secondary/10 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h3 className="text-2xl font-bold text-foreground">
                Gelejekki Karyeraňyzy Biz Bilen Başlaň
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kurslarymyza ýazylmak ýa-da giňişleýin konsulýatasyýa almak üçin biziň bilen habarlaşyp bilersiňiz.
              </p>
            </div>
            <a
              href="/courses"
              className="inline-flex whitespace-nowrap items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-transform active:scale-95 hover:bg-primary/90"
            >
              Kurslary Gör
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}