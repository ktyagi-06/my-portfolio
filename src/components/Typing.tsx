"use client";
import { useState, useEffect } from "react";

const roles = [
  "Full Stack Developer",
  "AIML Engineer",
  "Problem Solver",
  "Tech Enthusiast"
];

export default function Typing() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 700);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 80 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-black dark:text-white font-medium">
      {roles[index].substring(0, subIndex)}
      <span className="border-r-2 border-black dark:border-white ml-1 animate-pulse"></span>
    </span>
  );
}
