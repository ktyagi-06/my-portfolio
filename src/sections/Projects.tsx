"use client";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/utils/projects";

export default function Projects() {
  return (
    <section id="projects" className="mt-24 flex justify-center">
        <div
  className="
    bg-white/5
    border border-white/10
    backdrop-blur-md
    rounded-xl
    p-10
    shadow-lg
    transition-all duration-300
    hover:-translate-y-2
    hover:shadow-2xl
    hover:shadow-purple-500/20
  "
>

        <SectionHeading title="Projects" />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="
                p-5 rounded-lg border border-[var(--card-border)]
                bg-white/20 shadow-sm hover:shadow-xl transition
              "
            >
              <h3 className="text-[var(--text-main)] font-semibold mb-1">
                {project.title}
              </h3>

              <p className="text-[var(--text-sub)] text-sm leading-relaxed mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="
                      text-xs px-2 py-1 rounded-md
                      bg-white/30 border border-[var(--card-border)]
                      text-[var(--text-main)]
                    "
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                className="text-sm text-blue-600 hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
