"use client";

import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import SectionHeading from "@/components/SectionHeading";
import Education from "./Education";
import { research } from "@/utils/data";

const enter = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const },
};

export default function About() {
  return (
    <section id="about" className="band">
      <div className="wrap">
        <SectionHeading title="About me" />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div {...enter} className="space-y-6">
            <p
              className="text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)", fontWeight: 500 }}
            >
              I like the whole loop of a project: cleaning messy data, training and comparing
              models, then wrapping the result in an API and a dashboard someone can actually use.
            </p>
            <p style={{ color: "var(--muted)" }} className="max-w-[62ch]">
              I&apos;m a B.Tech student in Computer Science and Engineering with a strong
              foundation in data structures, operating systems and databases. My work sits between
              data science, machine learning and full-stack web development, and I care about
              evaluating models honestly: the right metric, a fair baseline, no leakage.
            </p>
            <p style={{ color: "var(--muted)" }} className="max-w-[62ch]">
              Recently I contributed to open-source repositories through Elite Coders and finished
              a full-stack internship with Future Interns.
            </p>
          </motion.div>

          <motion.div {...enter} transition={{ ...enter.transition, delay: 0.12 }} className="space-y-5">
            <Education />
            <div className="panel spot relative p-7"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                  style={{ background: "var(--signal-soft)", color: "var(--signal)" }}
                >
                  <FiFileText size={20} />
                </span>
                <div>
                  <h3 className="text-lg leading-snug" style={{ color: "var(--text)" }}>
                    {research.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem]" style={{ color: "var(--muted)" }}>
                    {research.text}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
