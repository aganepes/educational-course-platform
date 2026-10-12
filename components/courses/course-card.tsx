"use client";

import useSWR from "swr";
import Image from "next/image";
import { Star, ShoppingCart, Play, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  type Course,
  type Locale,
  courseConfig,
} from "@/data/courses";
import Link from "next/link";
import { useEffect, useState } from "react";

type CourseCardProps = {
  course: Course;
  onPlay: (course: Course) => void;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function CourseCard({ course, onPlay }: CourseCardProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const id = course.id;
  const title = course.title[locale];
  const { data } = useSWR(`/api/instructors/${course.instructorId}`, fetcher);
  const [instructor, setInstructor] = useState("...");
  useEffect(() => {
    if (data?.data) {
      setInstructor(data.data.name[locale]);
    }
  }, [data]);

  const durationText = `${course.durationHours} ${t("global.hour")}`;
  const priceText = `${course.price} TMT`;
  const buyNow = t("global.buyNow");
  const subCategory = t(`course.subcategory.${course.subcategory}`);
  const category = t(`course.category.${course.category}`);

  const subcategoryStyle =
    courseConfig[course.group][course.category].styles[course.subcategory];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={course.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subkategoriýa */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${subcategoryStyle.bg} ${subcategoryStyle.text} ${subcategoryStyle.border} border`}
        >
          {category} · {subCategory}
        </span>

        <button
          type="button"
          onClick={() => onPlay(course)}
          aria-label={`${title} play`}
          className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/25 cursor-pointer"
        >
          <span className="flex h-16 w-16 scale-90 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <Star
              className="h-4 w-4 fill-chart-4 text-chart-4"
              aria-hidden="true"
            />
            <span className="font-semibold text-foreground">
              {course.rating}
            </span>
          </span>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {durationText}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {course.lessons}
            </span>
          </div>
        </div>

        <Link
          href={`/${locale}/courses/${id}`}
          className="mt-3 text-balance font-display text-lg font-bold leading-snug text-foreground"
        >
          {title}
        </Link>

        <p className="mt-2 text-sm text-muted-foreground">
          {t("global.teacher")}:{" "}
          <span className="font-medium text-foreground">{instructor}</span>
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="font-display text-xl font-bold text-primary">
            {priceText}
          </span>
          <Link href={`/${locale}/courses/${id}/buy`}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
              <ShoppingCart className="mr-1 h-4 w-4" />
              {buyNow}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
