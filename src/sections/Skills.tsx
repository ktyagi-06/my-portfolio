export default function Skills() {
  return (
    <section id="skills" className="px-10 mt-24">
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
    hover:shadow-blue-500/20
  "
>

        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>

        <div className="space-y-6">

          <SkillRow title="Frontend" items={["React","Next.js","Tailwind CSS","JavaScript","HTML","CSS"]}/>
          <SkillRow title="Backend" items={["Node.js","Express.js","MongoDB","SQL"]}/>
          <SkillRow title="Machine Learning" items={["Python","Pandas","NumPy","Scikit-Learn"]}/>
          <SkillRow title="Tools" items={["Git","GitHub","VS Code"]}/>

        </div>
      </div>
    </section>
  );
}

function SkillRow({ title, items }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((i: string) => (
          <span
            key={i}
            className="
              px-3 py-1 rounded-md
              bg-white/20 border border-white/20
              text-sm
            "
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
