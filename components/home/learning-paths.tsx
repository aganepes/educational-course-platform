'use client'

import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { courses, courseConfig, Locale } from '@/data/courses'

export function LearningPaths() {
  const t = useTranslations('home.learning-paths')
  const locale = useLocale() as Locale

  // Reýtingi iň ýokary bolan top 4 kursy filtirlemek
  const topCourses = [...courses]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 4)

  return (
    <section className="border-y border-border bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {t('description')}
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80 cursor-pointer"
          >
            {t('view_all')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topCourses.map((course) => {
            // courseConfig faýlyndan degişli subcategory stiling maglumatlaryny almak
            const subStyle = courseConfig[course.group]?.[course.category]?.styles?.[course.subcategory] || {
              bg: 'bg-primary/10',
              text: 'text-primary',
              border: 'border-primary/20',
              icon: '📚'
            }

            return (
              <Link
                key={course.id}
                href={`/courses?category=${course.category}&subcategory=${course.subcategory}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${subStyle.bg}`}>
                    {subStyle.icon}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <span className={`mt-5 text-xs font-bold uppercase tracking-wider ${subStyle.text}`}>
                  {course.subcategory.replace('-', ' ')}
                </span>

                <h3 className="mt-2 flex-1 text-balance font-display text-lg font-bold leading-snug text-foreground">
                  {course.title[locale] || course.title.tm}
                </h3>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t('total_time')}: {course.durationHours} {t('hours')}</span>
                  <span>{course.lessons} {t('lessons')}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}