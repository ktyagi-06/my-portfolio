"use client";

import { motion } from "framer-motion";
import type { VisualKind } from "@/utils/projects";

/* deterministic pseudo-random so server and client render identical SVG */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const view = { once: true, margin: "-60px" } as const;
const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: view,
};

/* ---------- supply chain: stock heading for the reorder point ---------- */
function Forecast() {
  const r = rng(7);
  const hist = Array.from({ length: 10 }, (_, i) => ({
    x: 20 + i * 20,
    y: 40 + (i / 9) * 108 + (r() - 0.5) * 12,
  }));
  const fut = Array.from({ length: 8 }, (_, i) => ({
    x: 200 + (i + 1) * 17.5,
    y: hist[9].y + ((i + 1) / 8) * 56 + (r() - 0.5) * 4,
    b: 4 + i * 2.4,
  }));
  const hd = hist.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y.toFixed(1)}`).join(" ");
  const fd = [hist[9], ...fut].map((p, i) => `${i ? "L" : "M"}${p.x},${p.y.toFixed(1)}`).join(" ");
  const band =
    `M${hist[9].x},${hist[9].y.toFixed(1)} ` +
    fut.map((p) => `L${p.x},${(p.y - p.b).toFixed(1)}`).join(" ") +
    " " +
    [...fut].reverse().map((p) => `L${p.x},${(p.y + p.b).toFixed(1)}`).join(" ") +
    " Z";
  const ROP = 172;
  const cross = fut.find((p) => p.y >= ROP) ?? fut[fut.length - 2];

  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full" role="img" aria-label="Chart of stock level declining toward the reorder point, with a forecast band">
      <line x1="16" y1="204" x2="344" y2="204" stroke="var(--line)" />
      <motion.path d={band} fill="var(--accent)" initial={{ opacity: 0 }} whileInView={{ opacity: 0.16 }} viewport={view} transition={{ delay: 0.9, duration: 0.8 }} />
      <motion.path d={hd} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...draw} transition={{ duration: 1.2, ease: "easeOut" }} />
      <motion.path d={fd} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" {...draw} transition={{ delay: 1, duration: 0.9, ease: "easeOut" }} />
      <line x1="16" y1={ROP} x2="344" y2={ROP} stroke="var(--signal)" strokeDasharray="3 5" opacity="0.8" />
      <text x="18" y={ROP - 6} fontSize="10" fill="var(--signal)">reorder point</text>
      <motion.circle cx={cross.x} cy={cross.y} r="5" fill="var(--signal)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={{ delay: 1.7, type: "spring", stiffness: 300, damping: 14 }} />
      <motion.circle cx={cross.x} cy={cross.y} r="11" fill="none" stroke="var(--signal)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.6 }} viewport={view} transition={{ delay: 1.8, duration: 0.5 }} />
      <text x={hist[9].x - 18} y="22" fontSize="10" fill="var(--muted)">today</text>
      <line x1={hist[9].x} y1="28" x2={hist[9].x} y2="204" stroke="var(--line)" strokeDasharray="2 4" />
    </svg>
  );
}

/* ---------- fraud: outliers beyond the decision boundary ---------- */
function Fraud() {
  const r = rng(42);
  const boundary = (x: number) => 206 - (x - 150) * 0.86;
  const normal = Array.from({ length: 64 }, () => {
    const x = 24 + r() * 290;
    const hi = 204;
    const lo = x < 150 ? 18 : Math.min(hi - 12, boundary(x) + 16);
    return { x, y: lo + r() * (hi - lo) };
  });
  const odd = Array.from({ length: 7 }, () => {
    const x = 215 + r() * 120;
    return { x, y: 14 + r() * Math.max(8, boundary(x) - 30) };
  });
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full" role="img" aria-label="Scatter plot of transactions with a few outliers flagged beyond a decision boundary">
      <motion.line x1="150" y1="206" x2="350" y2={boundary(350)} stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 6" {...draw} transition={{ duration: 1, ease: "easeOut" }} />
      {normal.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="3.2" fill="var(--muted)" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 0.55, scale: 1 }} viewport={view} transition={{ delay: 0.02 * i, duration: 0.4 }} />
      ))}
      {odd.map((p, i) => (
        <g key={i}>
          <motion.circle cx={p.x} cy={p.y} r="4.6" fill="var(--signal)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 320, damping: 14 }} />
          <motion.circle cx={p.x} cy={p.y} r="10" fill="none" stroke="var(--signal)" initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 0.6, scale: 1 }} viewport={view} transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }} />
        </g>
      ))}
      <text x="154" y="217" fontSize="10" fill="var(--accent-text)">decision boundary</text>
    </svg>
  );
}

/* ---------- sales: revenue bars, last three are forecast ---------- */
function Sales() {
  const h = [46, 58, 52, 74, 66, 88, 84, 102, 96, 118, 112, 132];
  const pts = h.map((v, i) => `${i ? "L" : "M"}${34 + i * 25},${204 - v}`).join(" ");
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full" role="img" aria-label="Bar chart of monthly revenue trending up, with the last three months forecast">
      <line x1="16" y1="204" x2="344" y2="204" stroke="var(--line)" />
      {h.map((v, i) => {
        const f = i >= h.length - 3;
        return (
          <motion.rect
            key={i}
            x={24 + i * 25}
            width="19"
            rx="4"
            y={204 - v}
            height={v}
            fill={f ? "none" : "var(--accent)"}
            stroke={f ? "var(--signal)" : "none"}
            strokeWidth="1.6"
            strokeDasharray={f ? "4 3" : undefined}
            opacity={f ? 1 : 0.85}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={view}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          />
        );
      })}
      <motion.path d={pts} fill="none" stroke="var(--text)" strokeWidth="1.6" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" {...draw} transition={{ delay: 0.8, duration: 1 }} />
      <text x="262" y="30" fontSize="10" fill="var(--signal)">forecast</text>
    </svg>
  );
}

/* ---------- CRM: pipeline columns ---------- */
function Crm() {
  const cols = [
    { x: 14, name: "New", cards: 3 },
    { x: 126, name: "Contacted", cards: 2 },
    { x: 238, name: "Won", cards: 2 },
  ];
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full" role="img" aria-label="Kanban-style sales pipeline with leads in three stages">
      {cols.map((c, ci) => (
        <g key={c.name}>
          <rect x={c.x} y="14" width="108" height="192" rx="12" fill="var(--accent)" opacity="0.07" stroke="var(--line)" />
          <text x={c.x + 12} y="35" fontSize="11" fontWeight="600" fill="var(--muted)">{c.name}</text>
          {Array.from({ length: c.cards }).map((_, i) => {
            const hot = ci === 1 && i === 0;
            return (
              <motion.g key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ delay: ci * 0.15 + i * 0.12, duration: 0.5 }}>
                <rect x={c.x + 10} y={46 + i * 52} width="88" height="42" rx="8" fill="var(--card)" stroke={hot ? "var(--signal)" : "var(--line)"} strokeWidth={hot ? 1.8 : 1} />
                <rect x={c.x + 19} y={56 + i * 52} width="46" height="5" rx="2.5" fill="var(--text)" opacity="0.55" />
                <rect x={c.x + 19} y={69 + i * 52} width="30" height="5" rx="2.5" fill="var(--muted)" opacity="0.4" />
                {hot && <circle cx={c.x + 86} cy={59 + i * 52} r="4" fill="var(--signal)" />}
              </motion.g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export default function ProjectVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "forecast":
      return <Forecast />;
    case "fraud":
      return <Fraud />;
    case "sales":
      return <Sales />;
    case "crm":
      return <Crm />;
  }
}
