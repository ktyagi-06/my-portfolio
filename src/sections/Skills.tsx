"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import type { IconType } from "react-icons";
import {
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiHtml5, SiCss3, SiTailwindcss, SiPandas, SiNumpy, SiScikitlearn, SiGit, SiGithub,
  SiFastapi, SiStreamlit, SiJupyter, SiCplusplus, SiC,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiDatabase } from "react-icons/fi";
import { skillGroups } from "@/utils/data";

const icons: Record<string, [IconType, string]> = {
  Python: [SiPython, "#3776AB"], JavaScript: [SiJavascript, "#C9A800"], React: [SiReact, "#149ECA"],
  "Next.js": [SiNextdotjs, "#111111"], "Node.js": [SiNodedotjs, "#339933"], Express: [SiExpress, "#111111"],
  MongoDB: [SiMongodb, "#47A248"], HTML: [SiHtml5, "#E34F26"], CSS: [SiCss3, "#1572B6"],
  "Tailwind CSS": [SiTailwindcss, "#06B6D4"], Pandas: [SiPandas, "#150458"], NumPy: [SiNumpy, "#013243"],
  "Scikit-learn": [SiScikitlearn, "#F7931E"], Git: [SiGit, "#F05032"], GitHub: [SiGithub, "#111111"],
  FastAPI: [SiFastapi, "#009688"], Streamlit: [SiStreamlit, "#FF4B4B"], "Jupyter Notebook": [SiJupyter, "#F37626"],
  "C++": [SiCplusplus, "#00599C"], C: [SiC, "#555555"], "VS Code": [VscVscode, "#007ACC"], SQL: [FiDatabase, "#336791"],
};

export default function Skills() {
  return (
    <section id="skills" className="band">
      <div className="wrap">
        <SectionHeading
          title="Skills"
          text="The tools I reach for across data work, web apps and day-to-day development."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.title}
              className="panel p-7"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (gi % 2) * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h3 className="mb-5 text-xl" style={{ color: "var(--text)" }}>
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((s) => {
                  const entry = icons[s];
                  return (
                    <li key={s} className="chip !py-1.5 !pl-2 !pr-3.5">
                      {entry ? (
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-white" aria-hidden>
                          {(() => { const Icon = entry[0]; return <Icon size={14} color={entry[1]} />; })()}
                        </span>
                      ) : (
                        <span aria-hidden className="ml-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--signal)" }} />
                      )}
                      {s}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
