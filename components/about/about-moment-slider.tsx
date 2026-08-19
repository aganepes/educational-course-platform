"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import MomentCard from "./moment-card";

import { useState, useEffect } from "react";
import { useMotionValue, animate, motion } from "framer-motion";
import type { AboutMomentItem } from "@/data/about-moments";

interface MotionSliderProps {
  items: AboutMomentItem[];
  cardWidth?: number;
  gap?: number;
  speed?: number;
}

export default function AboutMomentSlider({
  items,
  cardWidth = 300,
  gap = 24,
  speed = 25,
}: MotionSliderProps) {
  const t = useTranslations("about.moment_slider");

  const [isPaused, setIsPaused] = useState(false);
  const xTranslation = useMotionValue(0);

  // Tükeniksiz döwran üçin 2 gezek gaýtalanýar
  const doubledItems = [...items, ...items];

  // Bir kartnyň gap bilen bilelikdäki umumy ini
  const step = cardWidth + gap;
  // Doly ýarym zolagyň ini
  const totalWidth = items.length * step;

  useEffect(() => {
    if (isPaused || totalWidth === 0) return;

    // Häzirki duran ýerinden bashlap dowam etmek üçin
    const currentX = xTranslation.get();

    const controls = animate(xTranslation, [currentX, -totalWidth], {
      ease: "linear",
      duration: (1 - Math.abs(currentX) / totalWidth) * speed,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      onUpdate: (latest) => {
        // Çäkden geçende amasyzlyk bilen başa dolamak
        if (latest <= -totalWidth) {
          xTranslation.set(0);
        }
      },
    });

    return () => controls.stop();
  }, [isPaused, totalWidth, speed, xTranslation]);

  // Sag we Çep düwmeler üçin scroll funksiýasy
  const handleScroll = (direction: "left" | "right") => {
    setIsPaused(true);
    const currentX = xTranslation.get();
    let targetX = direction === "left" ? currentX + step : currentX - step;

    // Çäkleri dolandyrmak (Loop Reset)
    if (targetX > 0) {
      targetX = -totalWidth + step;
    } else if (targetX < -totalWidth) {
      targetX = 0;
    }

    animate(xTranslation, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: () => setIsPaused(false),
    });
  };

  return (
    <section className="py-20 bg-secondary/10 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Control Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              {t("subtitle")}
            </p>
          </div>

          {/* Sag we Çep Düwmeler */}
          <div
            className="flex items-center gap-3"
          >
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm hover:bg-accent transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm hover:bg-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Endless Scroll Slider Track */}
        <div
          className="flex overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex shrink-0"
            style={{ x: xTranslation, gap: `${gap}px` }}
          >
            {doubledItems.map((moment) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                style={{ width: `${cardWidth}px` }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
