"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/database/zod-schemas/users";

type HeaderAuthProps = {
  type: "mobile" | "desktop";
  user?: User | null;
  onLogout?: () => void;
};

function HeaderAuth({ type, user, onLogout }: HeaderAuthProps) {
  const locale = useLocale();
  const t = useTranslations("header");

  if (user) {
    return type === "desktop" ? (
      // Desktop: Profile Dropdown
      <DropdownMenu>
        <DropdownMenuTrigger className="px-2.5 p-2 text-xs hover:bg-accent cursor-pointer rounded-lg">
            <UserIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-2 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.username}
              </p>
              {user.phone && (
                <p className="text-xs leading-none text-muted-foreground">
                  {user.phone}
                </p>
              )}
              {user.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={onLogout}
            className="text-destructive focus:text-destructive cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("auth.logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      // Mobile: User Info & Logout Button
      <div className="flex flex-col gap-2 w-full pt-2 border-t border-border/40">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.username}</span>
            {user.phone && (
              <span className="text-xs text-muted-foreground">
                {user.phone}
              </span>
            )}
            {user.email && (
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full text-destructive hover:text-destructive cursor-pointer gap-2"
        >
          <LogOut className="h-4 w-4" />
          {t("auth.logout")}
        </Button>
      </div>
    );
  }

  return type == "desktop" ? (
    <>
      <Link href={`/${locale}/login`} passHref>
        <Button
          variant="ghost"
          className="text-foreground hover:bg-secondary cursor-pointer"
        >
          {t("auth.login")}
        </Button>
      </Link>
      <Link href={`/${locale}/register`} passHref>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
          {t("auth.register")}
        </Button>
      </Link>
    </>
  ) : (
    <>
      <Link href={`/${locale}/login`} className="w-full">
        <Button variant="outline" className="cursor-pointer w-full">
          {t("auth.login")}
        </Button>
      </Link>
      <Link href={`/${locale}/register`} className="w-full">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer  w-full">
          {t("auth.register")}
        </Button>
      </Link>
    </>
  );
}

export default HeaderAuth;
