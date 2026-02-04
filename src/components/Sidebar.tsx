"use client";

export default function Sidebar() {
  return (
    <aside
      className="
        fixed left-0 top-0 z-40
        h-screen w-[220px]
        bg-[#0B1120]/90
        border-r border-white/10
        backdrop-blur-xl
        flex flex-col
        px-4 py-6
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold tracking-widest text-white/60 uppercase">
          Navigation
        </h2>
      </div>

      {/* NAV ITEMS */}
      <nav className="flex flex-col gap-3">
        {["Home", "About", "Education", "Skills", "Projects", "Contact"].map(
          (s) => (
            <button
              key={s}
              onClick={() =>
                document
                  .getElementById(s.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                group
                text-left text-sm text-white/80
                px-3 py-2 rounded-lg
                bg-white/5
                border border-white/10
                backdrop-blur-md
                transition-all duration-200
                hover:bg-white/10
                hover:border-white/20
                hover:-translate-y-[2px]
                hover:shadow-lg hover:shadow-black/40
              "
            >
              <span className="group-hover:text-white transition-colors">
                {s}
              </span>
            </button>
          )
        )}
      </nav>

      {/* FOOTER (optional branding / spacer) */}
      <div className="mt-auto pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} Kunal Tyagi
      </div>
    </aside>
  );
}
