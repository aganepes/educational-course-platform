'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-lesson.png"
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        {/* left-to-right dark gradient so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Sanly Bilim Platformasy
          </p>

          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Geljegiňizi Sanly Bilim Bilen Guruň
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Frontend-den Backend-e, DevOps-dan 3D Proýektirlemä çenli — hakyky taslamalar üstünde işleýän hünärmen mugallymlardan onlaýn wideo sapaklar. Islän wagtyň, islän ýeriňden öwren.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/courses" className="flex items-center gap-2">
                <span>Kurslary Gözden Geçir</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-card/60 text-foreground backdrop-blur hover:bg-secondary"
            >
              <Link href="/courses" className="flex items-center gap-1">
                <Play className="mr-1 h-4 w-4 fill-current" />
                <span>Mugt Sapaga Seret</span>
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['bg-primary', 'bg-accent', 'bg-chart-3', 'bg-chart-4'].map((c, i) => (
                <span
                  key={i}
                  className={`h-9 w-9 rounded-full border-2 border-background ${c}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span> okuwçy
              biziň bilen öwrenýär
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
