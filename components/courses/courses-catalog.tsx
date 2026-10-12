"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { GroupSection } from "@/components/courses/group-section";
import { VideoModal } from "@/components/courses/video-modal";
import { courseConfig, type Course } from "@/data/courses";
import Loading from "../ui/loading";
import ErrorMessage from "../ui/error-message";
import { useTranslations } from "next-intl";

export type TCourseGroup = { count: number; group: string };
export type TCourseCategory = { category: string; count: number; group: string };
export type TCourseFatchSuccess = {
  success: true;
  group: TCourseGroup[];
  category: TCourseCategory[];
};
export type TCourseFatchError = { success: false; message: string };

const fetcher = (
  url: string,
): Promise<TCourseFatchSuccess | TCourseFatchError> =>
  fetch(url).then((r) => r.json());

export function CoursesCatalog() {
  const t = useTranslations();

  const { data, error, isLoading } = useSWR(
    "/api/courses/category-count",
    fetcher,
  );
  const [selected, setSelected] = useState<Course | null>(null);
  const [groupedCourses, setGroupedCourses] = useState<TCourseFatchSuccess>();

  useEffect(() => {
    if (data) {
      setGroupedCourses(data as TCourseFatchSuccess);
    }
  }, [data]);

  if (isLoading) return <Loading message={t("course.loading-message")} />;
  if (error) return <ErrorMessage message={t(error.message)} />;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {groupedCourses?.group.map((group) => (
        <GroupSection
          key={group.group}
          group={group}
          categories={groupedCourses.category.filter(c=>c.group==group.group)}
          onPlay={setSelected}
        />
      ))}

      <VideoModal course={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
