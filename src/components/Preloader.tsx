"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntro } from "./IntroContext";

const NAME = "Kunal Tyagi".split("");

export default function Preloader() {
  const { done, finish } = useIntro();

  useEffect(() => {
    if (done) return;
    const seen = sessionStorage.getItem("intro-seen") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(
      () => {
        sessionStorage.setItem("intro-seen", "1");
        finish();
      },
      seen || reduce ? 120 : 1900
    );
    return () => window.clearTimeout(t);
  }, [done, finish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="presentation"
          onClick={finish}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="px-6 text-center">
            <h1
              aria-label="Kunal Tyagi"
              className="flex justify-center text-[clamp(2.8rem,9vw,6rem)]"
              style={{ color: "var(--text)" }}
            >
              {NAME.map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
                  <motion.span
                    aria-hidden
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.045,
                      duration: 0.7,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              className="mx-auto mt-5 h-px origin-left"
              style={{ background: "var(--accent)", width: "min(260px, 60vw)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.p
              className="mt-4 text-sm"
              style={{ color: "var(--muted)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              Full-stack development and machine learning
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
