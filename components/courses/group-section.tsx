// components/courses/group-section.tsx
"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CourseCard } from "@/components/courses/course-card";
import { courseConfig,type Course } from "@/data/courses";

type GroupSectionProps = {
  groupKey: keyof typeof courseConfig;
  courses: Course[];
  categories: readonly string[];
  onPlay: (course: Course) => void;
};

const groupColors:any = {
  construction: "border-blue-600",
  programming: "border-green-600",
};

export function GroupSection({
  groupKey,
  courses,
  categories,
  onPlay,
}: GroupSectionProps) {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Kategoriýa boýunça süzülen kurslar
  const filteredCourses = useMemo(() => {
    if (activeCategory === "all") {
      return courses;
    }
    return courses.filter((c) => c.category === activeCategory);
  }, [courses, activeCategory]);
  
  const getCategoryCount = (category: string) => {
    if (category === "all") {
      return courses.length;
    }
    return courses.filter((c) => c.category === category).length;
  };

  return (
    <section className="mb-14">
      {/* Group title */}
      <div
        className={`mb-6 flex items-center gap-3 border-l-4 ${groupColors[groupKey]} pl-4`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t(`course.groups.${String(groupKey)}.title`)}
        </h2>
        <span className="text-sm text-muted-foreground">
          ({courses.length} {t('global.course')})
        </span>
      </div>
        <p className="text-sm text-muted-foreground my-2">{t(`course.groups.${String(groupKey)}.description`)}</p>

      {/* Categories filter buttons */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={`${t(`course.groups.${String(groupKey)}.title`)} ${t('global.categories')}`}
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
            {getCategoryCount("all")}
          </span>
        </button>

        {/* Kategoriýa düwmeleri */}
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = getCategoryCount(category);
          const categoryLabel = t(`course.category.${category}`);

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
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
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPlay={onPlay}
          />
        ))}
      </div>
    </section>
  );
}
