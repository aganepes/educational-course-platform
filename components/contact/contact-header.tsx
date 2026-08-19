import { useTranslations } from "next-intl";

export default function ContactHeader() {
  const t = useTranslations("contact");

  return (
    <div className="text-center max-w-2xl mx-auto space-y-4">
      <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
        {t("header.badge")}
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {t("header.title")}
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
        {t("header.description")}
      </p>
    </div>
  );
}