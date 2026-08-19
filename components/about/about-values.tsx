import { Target, Users, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutValues() {
  const t = useTranslations("about.values");

  const values = [
    {
      icon: Target,
      title: t("items.practical.title"),
      description: t("items.practical.description"),
    },
    {
      icon: Users,
      title: t("items.support.title"),
      description: t("items.support.description"),
    },
    {
      icon: Award,
      title: t("items.certificate.title"),
      description: t("items.certificate.description"),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}