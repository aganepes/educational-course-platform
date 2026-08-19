import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutCTA() {
  const t = useTranslations("about.cta");

  return (
    <section className="border-t border-border bg-secondary/10 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h3 className="text-2xl font-bold text-foreground">
              {t("title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex whitespace-nowrap items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-transform active:scale-95 hover:bg-primary/90"
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
}