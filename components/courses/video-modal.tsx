"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Course, Locale } from "@/data/courses";
import { useLocale, useTranslations } from "next-intl";
import { instructorData } from "@/data/instructors";

export function VideoModal({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const local = useLocale() as Locale;
  const t = useTranslations();

  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${course.title[local]} wideo öňgörnüşi`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Ýapmak"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition-transform hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>

        <video
          ref={videoRef}
          src={course.video}
          poster={course.image}
          controls
          autoPlay
          playsInline
          crossOrigin="anonymous"
          className="aspect-video w-full bg-foreground"
        />

        <div className="flex flex-col gap-1 p-5">
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold`}
          >
            {t(`course.category.${course.category}`)}
          </span>
          <h3 className="mt-2 text-balance font-display text-lg font-bold text-foreground">
            {course.title[local]}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("global.teacher")}:{" "}
            <span className="font-medium text-foreground">
              {instructorData[course.instructorId].name[local]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
