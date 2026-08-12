'use client'

import Image from 'next/image'
import { Star, ShoppingCart, Play, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Course } from '@/lib/courses'

export function CourseCard({
  course,
  onPlay,
}: {
  course: Course
  onPlay: (course: Course) => void
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${course.categoryClass}`}
        >
          {course.category}
        </span>

        <button
          type="button"
          onClick={() => onPlay(course)}
          aria-label={`${course.title} wideosyny oýnat`}
          className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/25"
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
            <Star className="h-4 w-4 fill-chart-4 text-chart-4" aria-hidden="true" />
            <span className="font-semibold text-foreground">{course.rating}</span>
          </span>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {course.lessons}
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-balance font-display text-lg font-bold leading-snug text-foreground">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Mugallym: <span className="font-medium text-foreground">{course.instructor}</span>
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="font-display text-xl font-bold text-primary">{course.price}</span>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <ShoppingCart className="mr-1 h-4 w-4" />
            Satyn Al
          </Button>
        </div>
      </div>
    </article>
  )
}
