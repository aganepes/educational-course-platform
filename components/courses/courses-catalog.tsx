'use client'

import { useMemo, useState } from 'react'
import { courses, categories, type Course } from '@/data/courses'
import { CourseCard } from '@/components/courses/course-card'
import { VideoModal } from '@/components/video-modal'

export function CoursesCatalog() {
  const [active, setActive] = useState<string>('Ählisi')
  const [selected, setSelected] = useState<Course | null>(null)

  const filtered = useMemo(
    () =>
      active === 'Ählisi'
        ? courses
        : courses.filter((c) => c.category === active),
    [active],
  )

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Kategoriýalar"
      >
        {categories.map((cat) => {
          const isActive = active === cat
          const count =
            cat === 'Ählisi'
              ? courses.length
              : courses.filter((c) => c.category === cat).length
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  isActive ? 'bg-primary-foreground/20' : 'bg-secondary text-muted-foreground'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} onPlay={setSelected} />
        ))}
      </div>

      <VideoModal course={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
