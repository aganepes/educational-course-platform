import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { TopicsStrip } from "@/components/home/topics-strip";
import { LearningPaths } from "@/components/home/learning-paths";
import { TeachersSection } from "@/components/home/teachers-section";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Page() {
  return (
    <>
      <HeroSection />
      <TopicsStrip />
      <LearningPaths />
      <TeachersSection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
