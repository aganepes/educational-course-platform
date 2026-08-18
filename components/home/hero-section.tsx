'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import data from "@/data/center-infor"

export function HeroSection() {
  const t = useTranslations('home.hero-section')

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
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-background/40" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
            {t('badge')}
          </p>

          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>

          <Button
            size="lg"
            className="mt-8 group bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/courses" className="flex items-center gap-2">
              <span>{t('button')}</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

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
              <span className="font-semibold text-foreground">{data.studentCount}+</span>{' '}
              {t('students_label')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}