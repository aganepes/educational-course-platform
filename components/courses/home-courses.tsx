'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CourseCard } from '@/components/courses/course-card'
import { VideoModal } from '@/components/video-modal'
import { courses, type Course } from '@/data/courses'

const groups = [
  { eyebrow: 'Iň täze kurslar', courses: courses.slice(0, 3) },
  { eyebrow: 'Meşhur kurslar', courses: courses.slice(3, 6) },
]

export function HomeCourses() {
  const [active, setActive] = useState<Course | null>(null)

  return (
    <section id="courses" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-16">
        {groups.map((group) => (
          <div key={group.eyebrow}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {group.eyebrow}
              </h2>
              <Link
                href="/kurslar"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Görä köp
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {group.courses.map((course) => (
                <CourseCard key={course.id} course={course} onPlay={setActive} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <VideoModal course={active} onClose={() => setActive(null)} />
    </section>
  )
}
