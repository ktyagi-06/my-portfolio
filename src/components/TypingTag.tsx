"use client";

import { useEffect, useState } from "react";

const items = [
  "Aspiring AIML Engineer",
  "Full Stack Developer",
  "Tech Enthusiast",
  "Problem Solver",
  "Lifelong Learner"
];

export default function TypingTag() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === items[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 900);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % items.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 70 : 120); // smooth balanced

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);


  return (
    <p className="text-lg text-gray-600 dark:text-gray-300">
      {items[index].slice(0, subIndex)}
      <span className="opacity-60">|</span>
    </p>
  );
}
