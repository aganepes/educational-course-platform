import { Mail, Globe, GraduationCap } from 'lucide-react';
import { SiTiktok, SiInstagram } from 'react-icons/si';
import {useTranslations} from 'next-intl';
import HeaderLogo from './global/header-logo';

const columns = [
  {
    title: 'platform.title',
    links: [
      { label: 'platform.home', url: '/' },
      { label: 'platform.courses', url: '/courses' },
      { label: 'platform.teachers', url: '/teachers' },
      { label: 'platform.pricing', url: '/pricing' },
    ],
  },
  {
    title: 'company.title',
    links: [
      { label: 'company.about', url: '/about' },
      { label: 'company.careers', url: '/careers' },
      { label: 'company.blog', url: '/blog' },
      { label: 'company.contact', url: '/contact' },
    ],
  },
  {
    title: 'support.title',
    links: [
      { label: 'support.helpCenter', url: '/help' },
      { label: 'support.terms', url: '/terms' },
      { label: 'support.privacy', url: '/privacy' },
      { label: 'support.faq', url: '/faq' },
    ],
  },
];

const socials = [
  {
    icon: SiTiktok,
    label: 'TikTok',
    url: 'https://www.tiktok.com/@usernamenniz',
  },
  {
    icon: SiInstagram,
    label: 'Instagram',
    url: 'https://www.instagram.com/usernamenniz',
  },
  {
    icon: Mail,
    label: 'E-poçta',
    url: 'mailto:info@mysite.com',
  },
  {
    icon: Globe,
    label: 'Web sahypa',
    url: 'https://www.mysite.com',
  },
];

export function SiteFooter() {
  const t = useTranslations("footer")
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <HeaderLogo/>
            {/* <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                Bilim Akademiýa
              </span>
            </div> */}
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              {t('description')}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={t(column.title)}>
              <h3 className="font-display text-sm font-semibold text-foreground">
                {t(column.title)}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={t(link.label)}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("rights")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("madeIn")}
          </p>
        </div>
      </div>
    </footer>
  )
}
