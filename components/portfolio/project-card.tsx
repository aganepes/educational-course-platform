import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Project } from "@/data/projects";
import { Box, Compass, Code2 } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale() as "tm" | "ru" | "en";
  const t = useTranslations("portfolio");

  // Locale boýunça maglumatlary almak
  const title = project.title[locale] || project.title.tm;
  const description = project.description[locale] || project.description.tm;
  const categoryLabel = project.category.label[locale] || project.category.label.tm;
  const categoryType = project.category.type;

  return (
    <Link
      href={`/${locale}/portfolio/${project.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/40"
    >
      <div>
        {/* Prevyu suraty */}
        {project.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={project.imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {categoryType === "3d-max" && <Box className="h-3 w-3" />}
              {categoryType === "autocad" && <Compass className="h-3 w-3" />}
              {(categoryType === "full-stack" || categoryType === "frontend") && (
                <Code2 className="h-3 w-3" />
              )}
              {categoryLabel}
            </span>
          </div>

          <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4 line-clamp-2">
            {description}
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
          {t("student")}:{" "}
          <span className="text-foreground font-semibold">
            {project.studentName}
          </span>
        </span>
      </div>
    </Link>
  );
}