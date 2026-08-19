"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { AboutMomentItem } from "@/data/about-moments";
import { CSSProperties } from "react";

interface MomentCardProps {
  moment: AboutMomentItem;
  className?: string;
  style?: CSSProperties
}

export default function MomentCard({ moment, className = "",style}: MomentCardProps) {
  const locale = useLocale() as "tm" | "ru" | "en";

  const title = moment.title[locale] || moment.title.tm;
  const description = moment.description[locale] || moment.description.tm;
  const category = moment.category[locale] || moment.category.tm;

  return (
    <div
      className={`group shrink-0 rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between ${className}`}
      style={style}
    >
      <div>
        {/* Surat Bölümi */}
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          <Image
            src={moment.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 300px, 350px"
          />
        </div>

        {/* Maglumat Bölümi */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-primary font-medium">
              {category}
            </span>
            <span className="font-medium text-muted-foreground/80">
              {moment.date}
            </span>
          </div>

          <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}