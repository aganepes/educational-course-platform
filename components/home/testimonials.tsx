import { Quote } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import testimonials from "@/data/testimonials";
import type { Locale} from "@/data/testimonials";


export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const l = useLocale() as Locale

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
          {t("badge")}
        </p>
        <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name.en}
            className="flex flex-col rounded-2xl border border-border bg-card p-8"
          >
            <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
              {t.quote[l]}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
              <span
                className={`relative flex h-11 w-11 overflow-hidden items-center justify-center rounded-full font-display text-sm font-bold ${t.color}`}
              >
                {t.avatarUrl ? (
                  <Image
                    src={t.avatarUrl}
                    fill
                    className="object-cover"
                    alt={t.name[l]}
                  />
                ) : (
                  t.name[l]
                    .split(" ")
                    .map((item) => item.trim()[0].toUpperCase())
                    .join("")
                )}
              </span>
              <span>
                <span className="block font-display font-bold text-foreground">
                  {t.name[l]}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {t.role[l]}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}