import Link from 'next/link'
import { Project } from '@/data/projects'
import { Box, Compass, Code2 } from 'lucide-react'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/40"
    >
      <div>
        {/* Prevyu suraty */}
        {project.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {project.category === '3D Max' && <Box className="h-3 w-3" />}
              {project.category === 'AutoCAD' && <Compass className="h-3 w-3" />}
              {(project.category === 'Full Stack' || project.category === 'Frontend') && (
                <Code2 className="h-3 w-3" />
              )}
              {project.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="bg-secondary text-secondary-foreground text-[11px] font-medium px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/20">
        <span className="text-xs text-muted-foreground font-medium">
          Talyp: <span className="text-foreground font-semibold">{project.studentName}</span>
        </span>
      </div>
    </Link>
  )
}