"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);

  // simple particles only during intro
  useEffect(() => {
    if (!showIntro) return;

    const canvas = document.getElementById("particle-bg") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#6b7280";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [showIntro]);

  return (
    <>{/* ===== 3D GLASS BACKGROUND LAYERS ===== */}
<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

  {/* deep gradient base */}
  <div className="
    absolute inset-0
    bg-gradient-to-br
    from-[#0b1220]
    via-[#0a1a33]
    to-[#1a1333]
  " />

  {/* glow orb 1 */}
  <div className="
    absolute
    -top-40 -left-40
    w-[600px] h-[600px]
    bg-blue-600/20
    rounded-full
    blur-3xl
  " />

  {/* glow orb 2 */}
  <div className="
    absolute
    top-[40%] -right-40
    w-[600px] h-[600px]
    bg-purple-600/20
    rounded-full
    blur-3xl
  " />

  {/* glass panel layer */}
  <div className="
    absolute inset-0
    backdrop-blur-[2px]
    bg-white/[0.02]
  " />

</div>

      {/* ===== YOUR EXISTING SITE (UNCHANGED) ===== */}
      {children}

      {/* ===== INTRO OVERLAY ===== */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center text-center bg-[#0B1120]"
          >
            <canvas
              id="particle-bg"
              className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
            />

           <div className="relative z-10 px-6 max-w-3xl mx-auto text-center">

  <h1 className="
    text-5xl md:text-6xl font-bold mb-6
    bg-gradient-to-r from-blue-500 to-purple-500
    bg-clip-text text-transparent
    leading-tight
  ">
    Hi! Welcome to my Portfolio
  </h1>

  <p className="
    text-lg md:text-xl
    text-gray-300
    mb-10
    leading-relaxed
    max-w-2xl
    mx-auto
  ">
    Explore my work, projects, and experience in
    Full Stack Development and Machine Learning.
  </p>

  <button
    onClick={() => setShowIntro(false)}
    className="
      px-10 py-3
      rounded-xl
      bg-blue-600 hover:bg-blue-700
      text-white font-medium
      shadow-lg shadow-blue-500/30
      transition-transform hover:scale-105
    "
  >
    Enter Portfolio
  </button>

</div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
