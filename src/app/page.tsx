"use client";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Education from "@/sections/Education";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import SocialBar from "@/components/SocialBar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Page() {
  const [showSocial, setShowSocial] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content — ALWAYS visible */}
      <main className="flex-1 pt-20 pl-[260px] pr-10 pb-20">
        <section id="home">
          <Hero onHire={() => setShowSocial(true)} />
        </section>

        <section id="about"><About /></section>
        <section id="education"><Education /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>

      <SocialBar visible={showSocial} />
    </div>
  );
}
