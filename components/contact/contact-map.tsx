import { useTranslations } from "next-intl";
import { CONTACT_CONFIG } from "@/data/contact-config";

export default function ContactMap() {
  const t = useTranslations("contact");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          {t("map.title")}
        </h2>
        <span className="text-xs text-muted-foreground">
          {t("map.location")}
        </span>
      </div>

      <div className="relative h-95 w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
        <iframe
          src={CONTACT_CONFIG.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 opacity-90 transition-all hover:grayscale-0"
        />
      </div>
    </div>
  );
}