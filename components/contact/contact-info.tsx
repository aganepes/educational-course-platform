import { Globe } from 'lucide-react'
import { useTranslations } from "next-intl";
import { CONTACT_CONFIG } from "@/data/contact-config";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function ContactInfo() {
  const t = useTranslations("contact");

  const getDetailText = (key: string) => {
    switch (key) {
      case "address":
        return t("info.address_detail");
      case "phone":
        return CONTACT_CONFIG.phones;
      case "email":
        return CONTACT_CONFIG.email;
      case "working_hours":
        return t("info.working_hours_detail");
      default:
        return "";
    }
  };

  return (
    <div className="lg:col-span-5 space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {CONTACT_CONFIG.infoCardKeys.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.key}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {t(`info.${item.key}_title`)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {getDetailText(item.key)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* TikTok we Sosial Media Zolagy */}
      <div className="rounded-2xl border border-border bg-secondary/30 p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          {t("social.title")}
        </h3>
        <p className="text-xs text-muted-foreground">
          {t("social.description")}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <a
            href={CONTACT_CONFIG.socialLinks.tiktok}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-xs font-semibold shadow hover:bg-black/80 transition-all dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <TikTokIcon className="h-4 w-4" />
            {t("social.tiktok_btn")}
          </a>

          <a
            href={CONTACT_CONFIG.socialLinks.website}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-colors"
            aria-label="Website"
          >
            <Globe className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}