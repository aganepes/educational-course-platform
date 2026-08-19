import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ContactHeader from "@/components/contact/contact-header";
import ContactInfo from "@/components/contact/contact-info";
import ContactForm from "@/components/contact/contact-form";
import ContactMap from "@/components/contact/contact-map";

type Props = {
  params: Promise<{ locale: string }>;
};

// SEO & Meta Maglumatlary Generatory
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });

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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>

        <ContactMap />
      </div>
    </main>
  );
}