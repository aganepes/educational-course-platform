import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CoursesCatalog } from "@/components/courses/courses-catalog";
import CoursesHero from "@/components/courses/courses-hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "course.meta" });

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

export default async function CoursePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Dynamic Hero Section */}
      <CoursesHero />

      {/* Main Courses Catalog */}
      <div className="pt-14">
        <CoursesCatalog />
      </div>
    </main>
  );
}