import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilim Akademiýa — Sanly Bilim Platformasy",
  description:
    "Onlaýn wideo kurslar bilen täze başarnyklary öwreniň. Web ösüşi, dizaýn we marketing boýunça hünärmen mugallymlardan sapaklar.",
  generator: "Aganepes Ahmedow",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#171514",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html
      lang="tm"
      className={`dark ${jakarta.variable} ${inter.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen bg-background max-w-7xl mx-auto">
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
            </div>
            {process.env.NODE_ENV === "production" && <Analytics />}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
