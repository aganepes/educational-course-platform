"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/data/projects";
import {
  ArrowLeft,
  User,
  ExternalLink,
  Box,
  Compass,
  Code2,
} from "lucide-react";
import { AiFillGithub } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { ImageLightbox } from "@/components/image-lightbox";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const project = getProjectById(id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  if (!project) {
    notFound();
  }
  useEffect(() => {
    document.title = "Okuwçy işleri | Häzirki zaman bilim merkezi";
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Yza dolanmak düwmesi */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Galereýa gaýdyp gelmek
        </Link>

        {/* Sahypanyň Başlygy (Header) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {project.category === "3D Max" && (
                  <Box className="h-3.5 w-3.5" />
                )}
                {project.category === "AutoCAD" && (
                  <Compass className="h-3.5 w-3.5" />
                )}
                {project.category === "Full Stack" && (
                  <Code2 className="h-3.5 w-3.5" />
                )}
                {project.category === "Frontend" && (
                  <Code2 className="h-3.5 w-3.5" />
                )}
                {project.category}
              </span>
              {project.featured && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  Tapawutlanan
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {project.title}
            </h1>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4 text-primary" /> Awtor:{" "}
              <span className="font-semibold text-foreground">
                {project.studentName}
              </span>
            </p>
          </div>

          {/* Web baglanyşyk düwmeleri */}
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <AiFillGithub className="h-4 w-4" /> GitHub Kod
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Esasy Suraty / Prevyu */}
        {project.imageUrl && (
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-auto max-h-125 w-full object-cover"
            />
          </div>
        )}

        {/* Jikme-jiklikler we Ulanylan Gurallar */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Taslama barada
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDetails || project.description}
            </p>

            {/* Galereýa suratlary bar bolsa görkezmek */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Goşmaça Renders/Suratlar
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.galleryImages.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-muted"
                    >
                      <img
                        src={img}
                        alt={`${project.title} - ${idx + 1}`}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold">
                        Uly görmek
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lightbox Modal */}
            {project.galleryImages && (
              <ImageLightbox
                images={project.galleryImages}
                currentIndex={activeImageIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onIndexChange={setActiveImageIndex}
              />
            )}
          </div>

          {/* Ulanylan Skiller & Programmalar */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4 h-fit">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Ulanylan Programmalar
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
