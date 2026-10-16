"use client";

import { usePathname } from "next/navigation";
import { IntroProvider } from "@/components/IntroContext";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <IntroProvider initialDone={pathname !== "/"}>
      {/* ambient background: soft colour pools that follow the active theme */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: "var(--glow-a)" }}
        />
        <div
          className="absolute -right-48 top-[45%] h-[560px] w-[560px] rounded-full blur-3xl"
          style={{ background: "var(--glow-b)" }}
        />
      </div>

      <Preloader />
      <ScrollProgress />
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </IntroProvider>
  );
}
