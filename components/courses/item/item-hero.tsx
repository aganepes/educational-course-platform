"use client"

import { Clock, User, Briefcase, Play } from "lucide-react";

export function Hero() {
  return (<section className="py-8 md:py-12 bg-black">
      <CourseHeader
        coverImage="/images/courses/angular.png"
        title="Yapay Zeka Çağında TypeScript"
        authorName="Adam Rackis"
        authorCompany="Spotify"
        authorAvatar="/images/instructors/aygul-myradowa.jpg"
        duration="4 saat, 28 dakika"
        hasSubtitles={true}
      />
     <CourseOverview
        thumbnailUrl="/images/courses/angular.png"
        onPreviewClick={() => console.log("Preview modal açyldy")}
        onStartFreeClick={() => console.log("Mugt synlamak başlady")}
        onExamModeClick={() => console.log("Sınaw rejimine girildi")}
      />
    </section>
  );
}


import Image from "next/image";

interface CourseHeaderProps {
  coverImage?: string;
  title?: string;
  authorName?: string;
  authorCompany?: string;
  authorAvatar?: string;
  duration?: string;
  hasSubtitles?: boolean;
}

export default function CourseHeader({
  coverImage = "/images/typescript-course.jpg", // Kursyň uly örtük suraty
  title = "Yapay Zeka Çağında TypeScript",
  authorName = "Adam Rackis",
  authorCompany = "Spotify",
  authorAvatar = "/images/adam-rackis.jpg", // Mugallymyň awatary
  duration = "4 saat, 28 dakika",
  hasSubtitles = true,
}: CourseHeaderProps) {
  return (
    <div className="flex gap-6 p-6 text-white w-full">
      {/* 1. Kurs Örtük Suraty (Left Cover Image) */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 2. Maglumatlar Bölümi (Right Details Section) */}
      <div className="flex flex-col justify-center gap-3">
        {/* Kursyn Sözbaşysy */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h1>

        {/* Awtor Bölümi (Avatar + Ady + Kompaniýasy) */}
        <div className="flex items-center gap-3 mt-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-700 flex-shrink-0">
            <Image
              src={authorAvatar}
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-white leading-none">
              {authorName}
            </span>
            <span className="text-xs text-neutral-400 mt-1 leading-none">
              {authorCompany}
            </span>
          </div>
        </div>

        {/* Wagty we Subtitr/CC nyşany */}
        <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
          <span>{duration}</span>
          {hasSubtitles && (
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-neutral-500 text-neutral-300 rounded text-[10px] font-bold uppercase tracking-wider">
              CC
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


import {  BookOpen } from "lucide-react";

interface CourseOverviewProps {
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  prerequisiteText?: string;
  prerequisiteCourseName?: string;
  onPreviewClick?: () => void;
  onStartFreeClick?: () => void;
  onExamModeClick?: () => void;
}

export function CourseOverview({
  thumbnailUrl = "/images/course-preview.jpg", // Çep tarapdaky wideo suraty
  title = "Ders Tanımı",
  description = "TypeScript'te uzmanlaşın ve karmaşık yapay zeka tarafından oluşturulan kodlarda kolayca gezinin. Jenerikler, koşullu tipler ve ayrıştırılmış birleşimler gibi gelişmiş teknikleri öğrenirken, ince hataları tespit etme ve daha iyi komut istemleri oluşturma becerileri kazanın. Ekibinizin TypeScript uzmanı olun ve tip sisteminizin sorumluluğunu üstlenin.",
  prerequisiteText = "TypeScript'e sağlam bir hakimiyet veya",
  prerequisiteCourseName = "TypeScript Temelleri kursumuzu tamamlamış",
  onPreviewClick
}: CourseOverviewProps) {
  return (
    <div className="w-full text-white p-6 border-y border-y-neutral-900 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* 1. ÇEP TARAP: Video Thumbnail + Overlay Preview Button */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden group cursor-pointer border border-neutral-800 shadow-2xl">
        <Image
          src={thumbnailUrl}
          alt="Course Preview"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

        {/* Center Preview Button Badge */}
        <button
          onClick={onPreviewClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-900/95 text-white px-5 py-2.5 rounded-full border border-neutral-600 backdrop-blur-md transition-all shadow-lg group-hover:scale-105"
        >
          <Play className="w-5 h-5 fill-white text-white" />
          <span className="font-semibold text-base tracking-wide">Preview</span>
        </button>
      </div>

      {/* 2. SAG TARAP: Maglumatlar & Tumujak Yüzlenme */}
      <div className="flex flex-col justify-center gap-5">
        {/* Sözbaşy */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {title}
        </h3>

        {/* Giňişleýin Maglumat */}
        <p className="text-neutral-300 text-base leading-relaxed font-normal">
          {description}
        </p>

        {/* Ön Koşul (Öňşart) Bölümi */}
        <div className="flex items-start gap-3 mt-1">
          <BookOpen className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-neutral-300 leading-snug">
            <span className="font-bold text-white">Ön koşul:</span>{" "}
            {prerequisiteText}{" "}
            <span className="text-red-500 font-medium hover:underline cursor-pointer">
              {prerequisiteCourseName}
            </span>{" "}
            olmak .
          </p>
        </div>
      </div>
    </div>
  );
}