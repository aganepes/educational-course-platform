"use client"

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { GraduationCap, Menu, X, Sun, Moon, Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navLinks = [
  { label: 'nav.home', href: '/' },
  { label: 'nav.courses', href: '/courses' },
  { label: 'nav.portfolio', href: '/portfolio' },
  { label: 'nav.about', href: '/about' },
  { label: 'nav.contact', href: '/contact' },
]

const languages = [
  { code: 'tm', name: 'Türkmen', flag: 'TM' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('header')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  // Dili çalyşmak üçin funksiýa
  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Häzirki path-den köneden bar bolan locale prefiksini çalyşmak
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
      router.replace(newPathname || `/${newLocale}`)
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display font-bold tracking-tight text-foreground text-lg/tight">
            Häzirki zaman <br /> &nbsp;&nbsp;&nbsp;bilim merkezi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Main navigations">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Actions (Theme, Language, Auth) */}
        <div className="hidden items-center gap-2 md:flex">
          
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 rounded-md transition-all"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-accent" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Language Switcher (Modern Dropdown) */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button 
                variant="ghost" 
                size="sm" 
                disabled={isPending}
                className="flex items-center gap-2 px-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span>{locale}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 backdrop-blur-lg">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between cursor-pointer text-sm font-medium"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="text-xs">{lang.flag}</span>
                    {lang.name}
                  </span>
                  {locale === lang.code && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Auth Buttons */}
          <Button variant="ghost" className="text-foreground hover:bg-secondary">
            {t('auth.login')}
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t('auth.register')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile navigations">
            
            {/* Mobile Language Selection */}
            <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4" /> Dil seçiň:
              </span>
              <div className="flex gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-2 py-1 rounded text-xs uppercase font-bold transition-colors ${
                      locale === lang.code
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="my-1 h-px bg-border" />

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t(link.label)}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline">{t('auth.login')}</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('auth.register')}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}