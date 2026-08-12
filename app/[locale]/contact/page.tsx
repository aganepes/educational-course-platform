import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: "Habarlaşmak | Häzirki zaman bilim merkezi",
  description:
    "Biz bilen habarlaşyň, kurslara ýazylyň ýa-da merkezimize myhman boluň. Salgymyz, telefon belgilerimiz we sosial mediýa sahypalarymyz.",
}

// TikTok ikonkasy üçin custom SVG
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Salgymyz',
    details: 'Aşgabat ş., Berkararlyq etr., Bitarap Türkmenistan şaýoly, 12-nji jaý',
  },
  {
    icon: Phone,
    title: 'Telefon belgilerimiz',
    details: '+993 (12) 00-00-00 / +993 (65) 00-00-00',
  },
  {
    icon: Mail,
    title: 'E-poçta',
    details: 'info@bilimmerkezi.tm',
  },
  {
    icon: Clock,
    title: 'Iş wagty',
    details: 'Duş-Şen: 09:00 - 20:00 (Ýekşenbe: Dynç)',
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Habarlaşmak
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Biz Bilen Aragatnaşyga Geçin
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Soraaglaryňyz barmy ýa-da kurslarymyza ýazylmak isaýärsiňizmi? Aşakdaky formany dolduryň ýa-da gönümel habarlaşyň.
          </p>
        </div>

        {/* Info Cards & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sol Tarap: Maglumatlar & TikTok/Sosial Media */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TikTok we Sosial Media Zolagy */}
            <div className="rounded-2xl border border-border bg-secondary/30 p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Sosial Mediada Bize Goşulyň
              </h3>
              <p className="text-xs text-muted-foreground">
                TikTok we beýleki sahypalarymyzda gündelik täze sapaklar, talyplaryň taslamalary we peýdaly maslahatlar paýlaşylýar.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                {/* TikTok Button */}
                <a
                  href="https://tiktok.com/@bilim_merkezi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-xs font-semibold shadow hover:bg-black/80 transition-all dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  <TikTokIcon className="h-4 w-4" />
                  TikTok-da Yzarlaň
                </a>

                {/* Beýleki Sosial Linkler */}
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-colors"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Sag Tarap: Kursa Ýazylmak Formasy */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-foreground">Kursa Ýazylmak</h2>
              <p className="text-xs text-muted-foreground">
                Formany dolduryň, menedjerlerimiz gysga wagtyň içinde siziň bilen habarlaşarlar.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Adyňyz we Familiýaňyz</label>
                  <input
                    type="text"
                    required
                    placeholder="Meselem: Mekan Nurmedow"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Telefon Belgiňiz</label>
                  <input
                    type="tel"
                    required
                    placeholder="+993 6X XX XX XX"
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Saýlamak Isleýän Kursyňyz</label>
                <select className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="fullstack">Full Stack Web Development</option>
                  <option value="frontend">Frontend (React / Next.js)</option>
                  <option value="3dmax">3D Max & Rendering</option>
                  <option value="autocad">AutoCAD & Arhitektura</option>
                  <option value="graphic">Grafik Dizaýn</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Bellik ýa-da Halamalar (Hökmany däl)</label>
                <textarea
                  rows={4}
                  placeholder="Islegleriňiz ýa-da goşmaça soraglaryňyz bar bolsa ýazyň..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <Button type="submit" className="w-full rounded-xl gap-2 py-6 text-sm font-semibold">
                <Send className="h-4 w-4" /> Haýyşnamany Ugratmak
              </Button>
            </form>
          </div>

        </div>

        {/* Karta (Map) Bölümi */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Karta Üsti Bilen Ýerleşýän Ýerimiz</h2>
            <span className="text-xs text-muted-foreground">Aşgabat şäheri</span>
          </div>
          
          <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50325.22818619934!2d58.3392359!3d37.949712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f70014b931d87bd%3A0x867451458e0a8115!2sAshgabat%2C%20Turkmenistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-90 transition-all hover:grayscale-0"
            />
          </div>
        </div>

      </div>
    </main>
  )
}