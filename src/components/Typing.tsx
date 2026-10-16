"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { roles } from "@/utils/data";

/** Cycles roles with a vertical slide instead of a typewriter. */
export default function Typing() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % roles.length), 2600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <span className="relative inline-block h-[1.3em] overflow-hidden align-bottom" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          className="inline-block whitespace-nowrap"
          style={{ color: "var(--accent-text)" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
