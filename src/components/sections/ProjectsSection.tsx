import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <section id="work" className="max-w-7xl mx-auto px-8 py-32">
      <SectionHeading
        label="Selected Work"
        title="Projects that shipped."
        description="Real problems, real architecture, measurable outcomes."
      />

      <div className="space-y-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
