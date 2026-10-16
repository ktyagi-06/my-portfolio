import { FiBookOpen } from "react-icons/fi";
import { education } from "@/utils/data";

export default function Education() {
  return (
    <div className="panel p-7 md:p-8">
      <div className="flex items-start gap-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
          style={{ background: "var(--accent-soft)", color: "var(--accent-text)" }}
        >
          <FiBookOpen size={20} />
        </span>
        <div>
          <h3 className="text-xl" style={{ color: "var(--text)" }}>
            {education.school}
          </h3>
          <p className="mt-1 text-[0.95rem]" style={{ color: "var(--muted)" }}>
            {education.degree}
          </p>
          <p className="mt-1 text-[0.95rem]" style={{ color: "var(--muted)" }}>
            {education.period} · CGPA {education.cgpa}
          </p>
        </div>
      </div>

      <p className="mb-3 mt-6 text-sm font-semibold" style={{ color: "var(--text)" }}>
        Relevant coursework
      </p>
      <ul className="flex flex-wrap gap-2">
        {education.coursework.map((c) => (
          <li key={c} className="chip !text-[0.82rem]">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
