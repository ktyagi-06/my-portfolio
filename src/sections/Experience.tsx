"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/utils/data";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="band">
      <div className="wrap">
        <SectionHeading
          title="Experience"
          text="Hands-on work in remote teams, from shipping features to reviewing other people's code."
        />

        <div ref={ref} className="relative pl-8 md:pl-12">
          {/* track + progress line */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px md:left-[11px]"
            style={{ background: "var(--line)" }}
          />
          <motion.div
            aria-hidden
            className="absolute left-[7px] top-2 w-px origin-top md:left-[11px]"
            style={{
              scaleY: grow,
              bottom: "0.5rem",
              background: "linear-gradient(to bottom, var(--accent), var(--signal))",
            }}
          />

          <ul className="space-y-10">
            {experiences.map((x, i) => (
              <motion.li
                key={x.company}
                className="relative"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              >
                <span
                  aria-hidden
                  className="absolute -left-8 top-2 h-[15px] w-[15px] rounded-full md:-left-12 md:h-[23px] md:w-[23px]"
                  style={{
                    background: "var(--bg)",
                    border: "3px solid var(--accent)",
                    boxShadow: "0 0 0 6px var(--accent-soft)",
                  }}
                />
                <div className="panel p-7 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-2xl" style={{ color: "var(--text)" }}>
                      {x.company}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: "var(--accent-text)" }}>
                      {x.period}
                    </p>
                  </div>
                  <p className="mt-1" style={{ color: "var(--muted)" }}>
                    {x.role} · {x.place}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {x.points.map((p) => (
                      <li key={p} className="flex gap-3" style={{ color: "var(--muted)" }}>
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-px w-4 shrink-0"
                          style={{ background: "var(--accent)" }}
                        />
                        <span className="max-w-[70ch]">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
