import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutHero from "@/components/about/about-hero";
import  TeachersSection  from "@/components/home/teachers-section";
import AboutValues from "@/components/about/about-values";
import AboutCoursesSlider from "@/components/about/about-moment-slider";
import AboutCTA from "@/components/about/about-cta";
import { ABOUT_MOMENTS } from "@/data/about-moments";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale,
      type: "website",
    },
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero Header */}
      <AboutHero />

      {/* 2. Teachers Section */}
      <TeachersSection />

      {/* 3. Biziň Gymmatlyklarymyz */}
      <AboutValues />

      {/* 4. Pursatlary */}
      <AboutCoursesSlider items={ABOUT_MOMENTS}/>

      {/* 5. CTA / FAQ Habarlaşmak Bilesi */}
      <AboutCTA />

    </main>
  );
}