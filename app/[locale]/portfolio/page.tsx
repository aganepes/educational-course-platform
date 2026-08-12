"use client"

import { useEffect, useState } from 'react'
import { PROJECTS_DATA, Project } from '@/data/projects'
import { ProjectCard } from '@/components/portfolio/project-card'
import { Search, Layers, Box, Compass, Code2 } from 'lucide-react'


const CATEGORIES = ['Ähli', '3D Max', 'AutoCAD', 'Full Stack', 'Frontend'] as const

export default function ProjectGalleryDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Ähli')
  useEffect(() => {
    document.title = "Okuwçy işleri | Häzirki zaman bilim merkezi"
  }, [])
  // Maglumatlary süzmek (Filter)
  const filteredProjects = PROJECTS_DATA.filter((project: Project) => {
    const matchesCategory =
      selectedCategory === 'Ähli' || project.category === selectedCategory

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6 border-border">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Talyplaryň Taslama Galereýasy
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Programmalaşdyrma, 3D Modelleme we Arhitektura/Çyzgy ugurlary boýunça talyplarymyzyň taýýarlan iň gowy taslamalary.
          </p>
        </div>

        {/* Statistika Bölümi */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-secondary/50 p-2.5 rounded-xl border border-border">
            <Box className="h-5 w-5 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold whitespace-nowrap">3D Render</p>
              <p className="text-sm font-bold text-foreground whitespace-nowrap">
                {PROJECTS_DATA.filter((p) => p.category === '3D Max').length} Taslama
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-2.5 rounded-xl border border-border">
            <Compass className="h-5 w-5 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold whitespace-nowrap">AutoCAD</p>
              <p className="text-sm font-bold text-foreground whitespace-nowrap">
                {PROJECTS_DATA.filter((p) => p.category === 'AutoCAD').length} Çyzgy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-2.5 rounded-xl border border-border">
            <Code2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold whitespace-nowrap">Web Apps</p>
              <p className="text-sm font-bold text-foreground whitespace-nowrap">
                {PROJECTS_DATA.filter((p) => p.category === 'Full Stack' || p.category === 'Frontend').length} Kod
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Süzgüçler (Gözleg we Kategoriýalar) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Taslama, talyp ýa-da programma gözle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout (Project Card-lary görkezýän bölüm) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Netije Tapylmadyk Ýagdaýy */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <Layers className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-3 text-base font-semibold text-foreground">Hiç hili taslama tapylmady</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Gözleg sözüňizi üýtgedip ýa-da başga kategoriýa saýlap görüň.
          </p>
        </div>
      )}

    </div>
  )
}