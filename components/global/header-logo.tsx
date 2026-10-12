import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

function HeaderLogo() {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
        <Image
          src={"/logo_2.png"}
          height={80}
          width={160}
          className="object-contain"
          alt="logo"
        />
    </Link>
  );
}

export default HeaderLogo;
/* 
<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="h-5 w-5" aria-hidden="true" /> 
      </span>
      <span className="font-display font-bold tracking-tight text-foreground text-lg/tight">
        Häzirki zaman <br /> &nbsp;&nbsp;&nbsp;bilim merkezi
      </span>

*/
