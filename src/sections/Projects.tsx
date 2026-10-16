"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeading from "@/components/SectionHeading";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/utils/projects";
import { profile } from "@/utils/data";

function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Projects() {
  return (
    <section id="projects" className="band">
      <div className="wrap">
        <SectionHeading
          title="Projects"
          text="Each one is end to end: data, model, and an interface you can open. Three have live demos."
        />

        {/* On larger screens each card sticks and the next one slides over it. */}
        <div className="space-y-8 md:space-y-[18vh]">
          {projects.map((p, i) => (
            <article
              key={p.id}
              onPointerMove={trackPointer}
              className="panel spot relative grid gap-8 p-6 sm:p-8 md:sticky lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-10"
              style={{ top: `calc(6rem + ${i * 1.1}rem)` }}
            >
              <div className="flex flex-col">
                <h3 className="text-[clamp(1.6rem,3vw,2.3rem)]" style={{ color: "var(--text)" }}>
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[56ch]" style={{ color: "var(--muted)" }}>
                  {p.tagline}
                </p>

                <ul className="mt-6 space-y-3">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[0.97rem]" style={{ color: "var(--text)" }}>
                      <span
                        aria-hidden
                        className="mt-[0.72em] h-px w-4 shrink-0"
                        style={{ background: "var(--signal)" }}
                      />
                      <span className="max-w-[60ch] opacity-90">{h}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li key={t} className="chip !text-[0.82rem]">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      {p.demoLabel ?? "Live demo"}
                      <FiArrowUpRight size={16} />
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                    <FiGithub size={16} />
                    Source code
                  </a>
                </div>
              </div>

              <figure
                className="flex flex-col justify-center rounded-2xl p-5 sm:p-6"
                style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              >
                <ProjectVisual kind={p.visual} />
                <figcaption className="mt-4 text-center text-sm" style={{ color: "var(--muted)" }}>
                  {p.caption}
                </figcaption>
              </figure>
            </article>
          ))}
        </div>

        <p className="mt-16 text-center" style={{ color: "var(--muted)" }}>
          More experiments, including this portfolio, live on{" "}
          <a
            href={profile.githubRepos}
            target="_blank"
            rel="noreferrer"
            className="ulink font-semibold"
            style={{ color: "var(--accent-text)" }}
          >
            my GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
