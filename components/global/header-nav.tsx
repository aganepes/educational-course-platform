import Link from "next/link";
import { useTranslations } from "next-intl";

const navLinks = [
  { label: "nav.home", href: "/" },
  { label: "nav.courses", href: "/courses" },
  { label: "nav.portfolio", href: "/portfolio" },
  { label: "nav.about", href: "/about" },
  { label: "nav.contact", href: "/contact" },
];

type promps = "mobile" | "desktop";

const HeaderNav = ({ type, click }: { type: promps; click?: () => void }) => {
  const t = useTranslations("header");

  return type == "desktop" ? (
    <nav
      className="hidden items-center gap-6 lg:gap-8 min-[1080px]:flex"
      aria-label="Main navigations"
    >
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
  ) : (
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={click}
        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {t(link.label)}
      </Link>
    ))
  );
};

export default HeaderNav;
