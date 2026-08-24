'use client'

import { useState, useMemo } from 'react'
import { GroupSection } from '@/components/courses/group-section'
import { VideoModal } from '@/components/courses/video-modal'
import { courses,courseConfig, type Course } from '@/data/courses';

export function CoursesCatalog() {
  const [selected, setSelected] = useState<Course | null>(null)

  const groupedCourses = useMemo(() => {
    return Array.from(new Set(courses.map(c=>c.group)));
  }, [])
  const getCourses = (groupKey:string)=>{
    return courses.filter(c=>c.group==groupKey)
  }
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Gurluşyk bölümi */}
      {groupedCourses.map((group)=>(
        <GroupSection
        key={group}
        groupKey={group}
        courses={getCourses(group)}
        categories={Object.keys(courseConfig[group])}
        onPlay={setSelected}
      />
      ))}

      <VideoModal course={selected} onClose={() => setSelected(null)} />
    </div>
  )
}