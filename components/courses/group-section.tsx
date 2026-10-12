"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Course } from "@/data/courses";
import type { TCourseCategory, TCourseGroup } from "./courses-catalog";
import useSWR from "swr";
import { CourseCard } from "@/components/courses/course-card";
import Loading from "../ui/loading";
import ErrorMessage from "../ui/error-message";
type GroupSectionProps = {
  group: TCourseGroup;
  categories: TCourseCategory[];
  onPlay: (course: Course) => void;
};

const groupColors: any = {
  construction: "border-blue-600",
  programming: "border-green-600",
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// page bahasyny ulanmadym . Eger gerekli bolsa goşulyp bilersiň.
export function GroupSection({ group, categories, onPlay }: GroupSectionProps) {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const url =
    activeCategory === "all"
      ? `/api/courses?group=${group.group}`
      : `/api/courses?group=${group.group}&category=${activeCategory}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  const courses = data?.data ?? [];

  function Contents() {
    if (error) return <ErrorMessage message={t(error.message)} />;
    if (isLoading) return <Loading message={t("course.loading-message")} />;
    return courses.map((course:Course) => (
      <CourseCard key={course.id} course={course} onPlay={onPlay} />
    ));
  }

  return (
    <section className="mb-14">
      {/* Group title */}
      <div
        className={`mb-6 flex items-center gap-3 border-l-4 ${groupColors[group.group]} pl-4`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t(`course.groups.${String(group.group)}.title`)}
        </h2>
        <span className="text-sm text-muted-foreground">
          ({group.count} {t("global.course")})
        </span>
      </div>
      <p className="text-sm text-muted-foreground my-2">
        {t(`course.groups.${String(group.group)}.description`)}
      </p>

      {/* Categories filter buttons */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={`${t(`course.groups.${String(group.group)}.title`)} ${t("global.categories")}`}
      >
        {/* "all" düwmesi */}
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {t(`global.all`)}
          <span
            className={`rounded-full px-1.5 py-0.5 text-xs ${
              activeCategory === "all"
                ? "bg-primary-foreground/20"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {group.count}
          </span>
        </button>

        {/* Kategoriýa düwmeleri */}
        {categories.map((dataCategory) => {
          const isActive = activeCategory === dataCategory.category;
          const count = categories.filter(
            (c) => c.category == dataCategory.category,
          )[0].count;
          const categoryLabel = t(`course.category.${dataCategory.category}`);

          return (
            <button
              key={dataCategory.category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(dataCategory.category)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {categoryLabel}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  isActive
                    ? "bg-primary-foreground/20"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kurs kartoçkalary */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Contents />
      </div>
    </section>
  );
}
