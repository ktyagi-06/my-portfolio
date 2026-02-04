"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-full mt-6 px-4 py-2 rounded-md border border-gray-500/40">
        &nbsp;
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-full mt-6 px-4 py-2 text-sm rounded-md border border-gray-500/40 hover:bg-white/10"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
