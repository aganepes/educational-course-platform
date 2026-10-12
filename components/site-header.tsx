"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import HeaderLogo from "./global/header-logo";
import HeaderNav from "./global/header-nav";
import HeaderTheme from "./global/header-theme";
import HeaderAuth from "./global/header-auth";
import HeaderLang from "./global/header-lang";
import type { User } from "@/database/zod-schemas/users";
import useSWR from "swr";

export const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? (res.json() as Promise<{ user: User | null; success: boolean }>)
      : null,
  );

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data, mutate } = useSWR("/api/auth/me", fetcher);
  const user = data?.user ?? null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    mutate(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4">
        {/* Logo */}
        <HeaderLogo />
        {/* Desktop Navigation */}
        <HeaderNav type="desktop" />

        {/* Actions (Theme, Language, Auth) */}
        <div className="hidden items-center gap-2 min-[1080px]:flex">
          {/* Theme Toggle Button */}
          <HeaderTheme type="desktop" />

          {/* Language Switcher (Modern Dropdown) */}
          <HeaderLang type="desktop" />

          <div className="h-4 w-px bg-border mx-1" />

          {/* Auth Buttons  */}
          {/* <HeaderAuth type="desktop" /> */}
          <HeaderAuth type="desktop" user={user} onLogout={handleLogout} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 min-[1080px]:hidden">
          {/* Mobile Theme Switcher */}
          <HeaderTheme type="mobile" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-border bg-background min-[1080px]:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4"
            aria-label="Mobile navigations"
          >
            {/* Mobile Language Selection */}
            <HeaderLang type="mobile" />

            <div className="my-1 h-px bg-border" />
            {/* Nav Links */}
            <HeaderNav type="mobile" click={() => setOpen(false)} />

            <div className="mt-2 flex flex-col gap-2">
              {/* <HeaderAuth type="mobile" /> */}
              <HeaderAuth type="mobile" user={user} onLogout={handleLogout} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
