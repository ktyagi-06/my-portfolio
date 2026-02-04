export default function About() {
  return (
    <section id="about" className="px-10 mt-24">
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

        <h2 className="text-3xl font-bold mb-6 text-center">
          A Brief Introduction
        </h2>
        <p className="text-[var(--text-sub)] leading-relaxed max-w-none">
          Hi, I'm Kunal — a Computer Science undergraduate passionate about Full Stack
          Development and Machine Learning. With a foundation in data structures,
          system design, and scalable architecture, I enjoy bringing projects to life
          through clean engineering, thoughtful design, and continuous iteration.
          I believe in the power of technology to solve real-world problems and am always eager
          to learn and grow in this ever-evolving field. Currently Iam exploring new frameworks
          and tools to enhance my skill set and contribute to impactful projects.
        </p>
      </div>
    </section>
  );
}
