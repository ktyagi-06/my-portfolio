"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FiDownload, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-full border transition hover:scale-105"
      style={{ borderColor: "var(--line)", color: "var(--text)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={dark ? "sun" : "moon"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="grid place-items-center"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // scroll-spy
  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (e): e is HTMLElement => !!e
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const top = () => {
      if (window.scrollY < 300) setActive("");
    };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, [onHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isResume = pathname.startsWith("/resume");

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        aria-label="Main"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass-nav relative flex w-full max-w-[860px] items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 transition-shadow duration-300"
        style={{ boxShadow: scrolled ? "var(--shadow)" : "none" }}
      >
        <Link
          href="/"
          aria-label="Kunal Tyagi — home"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, var(--accent-btn), var(--signal))",
            fontFamily: "var(--font-display)",
          }}
        >
          KT
        </Link>

        {/* desktop links */}
        <ul className="relative hidden items-center md:flex">
          {LINKS.map((l) => {
            const current = active === l.id;
            return (
              <li key={l.id} className="relative">
                <Link
                  href={`/#${l.id}`}
                  className="relative z-10 block px-3.5 py-2 text-[0.92rem] font-medium transition-colors"
                  style={{ color: current ? "var(--text)" : "var(--muted)" }}
                >
                  {l.label}
                </Link>
                {current && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--accent-soft)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="btn btn-primary btn-sm"
            aria-current={isResume ? "page" : undefined}
          >
            <FiDownload size={15} />
            Resume
          </Link>
          <ThemeButton />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border md:hidden"
            style={{ borderColor: "var(--line)", color: "var(--text)" }}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {/* mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="glass-nav absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top rounded-3xl p-2 md:hidden"
              style={{ boxShadow: "var(--shadow)" }}
            >
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium"
                    style={{
                      color: active === l.id ? "var(--text)" : "var(--muted)",
                      background: active === l.id ? "var(--accent-soft)" : "transparent",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
