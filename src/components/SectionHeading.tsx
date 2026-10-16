"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  title,
  text,
  className = "",
}: {
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <h2 className="h-section overflow-hidden pb-2" style={{ color: "var(--text)" }}>
        <motion.span
          className="block"
          initial={{ y: "105%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {title}
        </motion.span>
      </h2>
      {text && (
        <motion.p
          className="lede mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
