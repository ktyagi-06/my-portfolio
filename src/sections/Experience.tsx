"use client";

const experiences = [
  {
    role: "Senior Finance Coordinator",
    company: "AIML Community",
    period: "Jun 2025 — Present",
  },
  {
    role: "Full Stack Developer (Internship)",
    company: "Future Interns",
    period: "Jan 2026 — Present",
  },
];

export default function Experience() {
  return (
    <section
  id="experience"
  className="w-full mt-20 px-8 lg:px-12"
>

      
      {/* ===== OUTER GLASS CONTAINER ===== */}
        <div
  className="
w-full
bg-white/5
border border-white/10
backdrop-blur-md
rounded-xl
p-10
shadow-lg
transition-all duration-300
hover:-translate-y-2
hover:bg-white/10
hover:border-white/20
hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]
"

>

        {/* HEADING */}
        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-8">
  Experience
</h2>

        {/* ===== EXPERIENCE CARDS — SAME AS PROJECT CARDS ===== */}
        <div className="grid gap-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
             className="
rounded-xl
p-6
bg-white/10
border border-white/15
backdrop-blur-md
shadow-md
transition-all duration-300
hover:-translate-y-1
hover:bg-white/15
hover:border-white/25
hover:shadow-xl
"

            >
              <h3 className="text-lg font-semibold text-[var(--text-main)]"
> {exp.company}
              </h3>

              <p className="text-[var(--text-sub)] mt-1"
>
                {exp.role}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {exp.period}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
