"use client";

import SocialBar from "@/components/SocialBar";

export default function Hero({ onHire }: { onHire: () => void }) {
  return (
    <section
      id="hero"
      className="
        pt-4 px-8
        flex flex-col lg:flex-row
        items-center lg:items-center
        justify-between
        gap-12
        min-h-[60vh]
      "
    >
      {/* LEFT */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-main)] mb-4 leading-[1.1]">
          Kunal Tyagi
        </h1>

        <p className="text-[var(--text-sub)] text-lg mb-6 leading-relaxed">
          CSE Undergraduate • Full Stack Developer • Aspiring ML Engineer •
          Enthusiastic Learner
        </p>

        <button
          onClick={onHire}
          className="
            px-5 py-2 rounded-lg
            border border-[var(--card-border)]
            hover:bg-[var(--card-border)]
            transition
          "
        >
          Hire Me
        </button>
      </div>
      {/* RIGHT — PHOTO */}
      <div className="w-56 h-56 rounded-full overflow-hidden border border-[var(--card-border)] shadow-xl">
        <img
          src="/profile.jpg"
          className="w-full h-full object-cover object-[50%_25%]"
        />
      </div>
    </section>
  );
}
