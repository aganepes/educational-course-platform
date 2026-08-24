import { Hero } from "@/components/courses/item/item-hero";
import { CourseDetails } from "@/components/courses/item/course-details";
import { TableOfContents } from "@/components/courses/item/table-of-contents";
import { Certificate } from "@/components/certificate";

export default function CoursesItem() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Hero />
      <CourseDetails />
      <TableOfContents />
      <Certificate />
    </main>
  );
}