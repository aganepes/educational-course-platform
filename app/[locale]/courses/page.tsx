import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { CoursesCatalog } from "@/components/courses/courses-catalog";

export const metadata: Metadata = {
  title: "Kurslar | Häzirki zaman bilim merkezi",
  description:
    "Programmirleme, dizaýn, marketing, data ylym we dil öwreniş boýunça onlaýn wideo kurslar. Kategoriýa boýunça saýlaň we mugt öňgörnüşe serediň.",
};

export default function CoursePage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Ähli kurslar
          </span>
          <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Kategoriýa boýunça kurslary öwreniň
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Her kursyň mugt wideo öňgörnüşi bar — satyn almazdan ozal görüň.
            Isleýän ugryňyzy saýlaň we şu gün öwrenmäge başlaň.
          </p>
        </div>
      </section>

      <div className="pt-14">
        <CoursesCatalog />
      </div>
    </>
  );
}
