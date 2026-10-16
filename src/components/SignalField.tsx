"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; odd: boolean; ph: number };

/**
 * A field of drifting "transactions". A scanner (your cursor, or a slow
 * automatic sweep on touch / idle) flags nearby points and links them, the way
 * a fraud model flags outliers. A few points are permanent anomalies in amber.
 */
export default function SignalField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const RADIUS = 140;
    let w = 0;
    let h = 0;
    let pts: P[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    const pointer = { x: 0, y: 0, active: false };
    let col = { dot: "150 156 220", accent: "132 115 255", signal: "255 181 71" };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      col = {
        dot: s.getPropertyValue("--field-dot").trim() || col.dot,
        accent: s.getPropertyValue("--field-accent").trim() || col.accent,
        signal: s.getPropertyValue("--field-signal").trim() || col.signal,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(150, Math.max(54, Math.round((w * h) / 8500)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 1.1,
        odd: Math.random() < 0.07,
        ph: Math.random() * Math.PI * 2,
      }));
      if (reduce) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // scanner: cursor if present, otherwise a slow automatic sweep
      const sx = pointer.active ? pointer.x : w * (0.5 + 0.36 * Math.sin(t * 0.00031));
      const sy = pointer.active ? pointer.y : h * (0.46 + 0.28 * Math.sin(t * 0.00047 + 1));

      // scanner ring
      const pulse = 1 + 0.04 * Math.sin(t * 0.004);
      ctx.beginPath();
      ctx.arc(sx, sy, RADIUS * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgb(${col.accent} / 0.18)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        const dx = p.x - sx;
        const dy = p.y - sy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const flagged = d < RADIUS;
        const k = flagged ? 1 - d / RADIUS : 0;

        if (flagged) {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgb(${p.odd ? col.signal : col.accent} / ${0.28 * k})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (p.odd) {
          const beat = 0.5 + 0.5 * Math.sin(t * 0.003 + p.ph);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${col.signal} / ${flagged ? 0.95 : 0.55 + 0.25 * beat})`;
          ctx.fill();
          if (flagged) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + 5 + 3 * beat, 0, Math.PI * 2);
            ctx.strokeStyle = `rgb(${col.signal} / ${0.7 * k + 0.2})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + k * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = flagged
            ? `rgb(${col.accent} / ${0.45 + 0.5 * k})`
            : `rgb(${col.dot} / 0.5)`;
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || running || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = y;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    readColors();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      inView ? start() : stop();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColors();
      if (reduce) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
