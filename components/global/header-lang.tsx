"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "tm", name: "Türkmen", flag: "TM" },
  { code: "en", name: "English", flag: "EN" },
  { code: "ru", name: "Русский", flag: "RU" },
];

type promps = "mobile" | "desktop";

function HeaderLang({ type }: { type: promps }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header");
  const [isPending, startTransition] = useTransition();

  // Dili çalyşmak üçin funksiýa
  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Häzirki path-den köneden bar bolan locale prefiksini çalyşmak
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.replace(newPathname || `/${newLocale}`);
    });
  };

  return type == "desktop" ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        className="flex items-center gap-2 px-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer p-2 rounded-lg"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span>{locale}</span>
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
  ) : (
    <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground font-semibold">
      <span className="flex items-center gap-1.5">
        <Globe className="h-4 w-4" /> {t("select-lang")}:
      </span>
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-2 py-1 rounded text-xs uppercase font-bold transition-colors cursor-pointer ${
              locale === lang.code
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {lang.code}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeaderLang;
