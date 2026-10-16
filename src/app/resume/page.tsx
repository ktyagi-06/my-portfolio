import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft, FiDownload, FiExternalLink } from "react-icons/fi";
import { profile } from "@/utils/data";

export const metadata: Metadata = {
  title: "Resume — Kunal Tyagi",
};

export default function ResumePage() {
  return (
    <main className="wrap pb-20 pt-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Link
            href="/"
            className="ulink mb-5 inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--muted)" }}
          >
            <FiArrowLeft size={16} /> Back to portfolio
          </Link>
          <h1 className="text-[clamp(2.4rem,6vw,4.2rem)]" style={{ color: "var(--text)" }}>
            Resume
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={profile.resumePdf} download className="btn btn-primary">
            <FiDownload size={17} />
            Download PDF
          </a>
          <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Open in new tab
            <FiExternalLink size={16} />
          </a>
        </div>
      </div>

      <div
        className="mx-auto max-w-[900px] overflow-hidden rounded-2xl"
        style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow)", background: "#fff" }}
      >
        {/* Desktop: embedded PDF viewer. Falls back to the preview image where
            browsers can't render PDFs inline (most phones). */}
        <object
          data={`${profile.resumePdf}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          className="hidden h-[92vh] min-h-[760px] w-full md:block"
          aria-label="Kunal Tyagi resume (PDF)"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.resumePreview} alt="Kunal Tyagi resume" className="w-full" />
        </object>

        <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="block md:hidden" aria-label="Open resume PDF">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.resumePreview} alt="Kunal Tyagi resume" className="w-full" />
        </a>
      </div>
    </main>
  );
}
