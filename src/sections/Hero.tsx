"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowUpRight, FiGithub } from "react-icons/fi";
import SignalField from "@/components/SignalField";
import Typing from "@/components/Typing";
import { useIntro } from "@/components/IntroContext";
import { profile } from "@/utils/data";

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Hero() {
  const { done } = useIntro();

  // photo tilts toward the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const item = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { delay: 0.1 + i * 0.1, duration: 0.8, ease },
  });

  return (
    <section
      id="home"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      <SignalField className="fade-bottom absolute inset-0 h-full w-full" />

      <div className="wrap relative z-10 grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.p {...item(0)} className="mb-5 text-lg" style={{ color: "var(--muted)" }}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            {...item(1)}
            className="text-[clamp(3.1rem,9vw,7.2rem)] leading-[0.92]"
            style={{ color: "var(--text)" }}
          >
            Kunal Tyagi
          </motion.h1>

          <motion.p
            {...item(2)}
            className="mt-6 text-[clamp(1.35rem,3vw,2rem)] font-medium"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            <Typing />
          </motion.p>

          <motion.p {...item(3)} className="lede mt-5 text-lg">
            Computer Science student building machine-learning systems and the full-stack apps
            around them, from fraud detection to supply-chain forecasting.
          </motion.p>

          <motion.div {...item(4)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              See my projects
              <FiArrowDown size={17} />
            </a>
            <Link href="/resume" className="btn btn-ghost">
              View resume
              <FiArrowUpRight size={17} />
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="btn btn-ghost !px-3.5"
            >
              <FiGithub size={19} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ delay: 0.35, duration: 0.9, ease }}
          className="mx-auto w-full max-w-[340px] lg:max-w-[400px]"
          style={{ perspective: 900 }}
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* accent offset frame */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem]"
              style={{ border: "1.5px solid var(--accent)", opacity: 0.6 }}
            />
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
              style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt="Portrait of Kunal Tyagi"
                className="h-full w-full object-cover object-[50%_22%]"
              />
            </div>

            <div
              className="glass absolute -bottom-5 -left-3 rounded-2xl px-4 py-3 text-sm sm:-left-8"
              style={{ transform: "translateZ(40px)", boxShadow: "var(--shadow)" }}
            >
              <p className="font-semibold" style={{ color: "var(--text)" }}>
                B.Tech CSE, class of 2028
              </p>
              <p style={{ color: "var(--muted)" }}>Manipal University Jaipur</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
