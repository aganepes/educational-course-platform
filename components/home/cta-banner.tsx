import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  const t = useTranslations('home.cta-banner')

  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:px-8 lg:py-20">
        <div className="max-w-2xl text-center lg:text-left">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
        </div>
        <Button
          size="lg"
          className="group shrink-0 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/courses" className="flex items-center gap-2">
            {t('button')}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  )
}