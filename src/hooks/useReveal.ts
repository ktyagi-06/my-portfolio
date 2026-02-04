"use client";
import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    });

    elements.forEach(el => observer.observe(el));
  }, []);
}
