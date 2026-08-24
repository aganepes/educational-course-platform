"use client";

import { useEffect, useRef, useState } from "react";
import { X, Lock, ShoppingBag, RotateCcw } from "lucide-react";
import type { Course, Locale } from "@/data/courses";
import { useLocale, useTranslations } from "next-intl";
import { instructorData } from "@/data/instructors";

// Vidstack Dogry Importlary
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

// Vidstack CSS Stil importlary
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";


export function VideoModal({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const local = useLocale() as Locale;
  const t = useTranslations();

  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (course) {
      setIsEnded(false);
    }
  }, [course]);

  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      // document.body.style.overflow = "";
    };
  }, [course, onClose]);

  if (!course) return null;

  // Stream gutaranda işleýän event
  const handleVideoEnded = () => {
    setIsEnded(true);
  };

  // Täzeden Syn Etmek (Replay)
  const handleReplay = () => {
    setIsEnded(false);
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${course.title.en} - video preview`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ýapmak düwmesi */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition-transform hover:scale-110 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Player Konteneri */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          {/* VIDSTACK PLAYER */}
          <MediaPlayer
            ref={playerRef}
            title={course.title[local]}
            // src={`/api/courses/${course.id}/video/public`}
            src=""
            poster={course.image}
            autoplay
            playsInline
            onEnded={handleVideoEnded}
            className="h-full w-full object-contain"
          >
            <MediaProvider />
            {/* Vidstack-iň taýýar UI Layout-y */}
            {!isEnded && <DefaultVideoLayout icons={defaultLayoutIcons} />}
          </MediaPlayer>

          {/* WIDEO GUTARANDA ÇYKÝAN OVERLAY BANNER */}
          {isEnded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/95 p-6 text-center backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="h-7 w-7" />
              </div>

              <h4 className="text-xl font-bold text-foreground sm:text-2xl">
                {t("course.player.preview_ended_title")}
              </h4>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {t("course.player.preview_ended_desc")}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`/courses/${course.id}/buy`}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {t("course.player.buy_now")}
                </a>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t("course.player.replay_preview")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kurs Maglumaty */}
        <div className="flex flex-col gap-1 p-5">
          <span className="w-fit rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">
            {t(`course.category.${course.category}`)}
          </span>
          <h3 className="mt-2 text-balance font-display text-lg font-bold text-foreground">
            {course.title[local]}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("global.teacher")}:{" "}
            <span className="font-medium text-foreground">
              {instructorData[course.instructorId]?.name[local]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}