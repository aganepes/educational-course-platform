import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CoursesHero() {
  const t = useTranslations("course.hero");

  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {t("badge")}
        </span>
        <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>
    </section>
  );
}