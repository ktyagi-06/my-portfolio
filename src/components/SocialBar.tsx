"use client";

import { FaGithub, FaLinkedin, FaXTwitter, FaSun, FaMoon } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SocialBar({ visible }: { visible: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ✅ prevents hydration mismatch

  return (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-4 px-5 py-3 rounded-2xl
        backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      <a href="https://github.com/ktyagi-06" target="_blank" className="icon-btn">
        <FaGithub />
      </a>

      <a href="https://linkedin.com" target="_blank" className="icon-btn">
        <FaLinkedin />
      </a>

      <a href="https://x.com/KunalKtyagi0506" target="_blank" className="icon-btn">
        <FaXTwitter />
      </a>

      <a
        href="/resume.pdf"
        target="_blank"
        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
      >
        Resume
      </a>

      <button
        className="icon-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
}
