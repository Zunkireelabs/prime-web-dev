"use client";

import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import SplitHeading from "@/components/animations/SplitHeading";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="surface-light section-padding">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-5">Projects</p>
            </FadeIn>
            <SplitHeading as="h2" className="h2 text-[var(--ink-primary)]">
              Installed with Pride
            </SplitHeading>
          </div>
          <FadeIn delay={0.2}>
            <p className="body-lg text-[var(--ink-secondary)] max-w-sm">
              Real spaces, real surfaces. See how architects and designers bring
              their boldest ideas to life.
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Row 1: 2 cols */}
          <MaskReveal className="md:col-span-8" direction="up">
            <ProjectCard project={projects[0]} aspect="aspect-[16/9]" />
          </MaskReveal>
          <MaskReveal className="md:col-span-4" direction="right" delay={0.1}>
            <ProjectCard project={projects[1]} aspect="aspect-[16/9]" />
          </MaskReveal>

          {/* Row 2: 3 cols */}
          <MaskReveal className="md:col-span-4" direction="up" delay={0.05}>
            <ProjectCard project={projects[2]} aspect="aspect-[3/4]" />
          </MaskReveal>
          <MaskReveal className="md:col-span-4" direction="up" delay={0.15}>
            <ProjectCard project={projects[3]} aspect="aspect-[3/4]" />
          </MaskReveal>
          <MaskReveal className="md:col-span-4" direction="up" delay={0.25}>
            <ProjectCard project={projects[4]} aspect="aspect-[3/4]" />
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  aspect,
}: {
  project: (typeof projects)[0];
  aspect: string;
}) {
  return (
    <div className="relative group cursor-pointer overflow-hidden h-full">
      <div className={`${aspect} img-zoom h-full`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 inset-x-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="eyebrow text-[var(--accent-light)] mb-1">
          {project.type}
        </p>
        <h3 className="text-lg font-serif text-white">{project.title}</h3>
        <p className="text-xs text-white/50 mt-1">{project.tile}</p>
      </div>
      <div className="absolute top-5 right-5 w-9 h-9 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
        <ArrowUpRight size={14} className="text-white" />
      </div>
    </div>
  );
}
