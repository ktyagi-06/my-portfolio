import "./globals.css";
import type { Metadata, Viewport } from "next";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Kunal Tyagi — Full Stack & Machine Learning Developer",
  description:
    "Portfolio of Kunal Tyagi: B.Tech CSE student building machine-learning systems and the full-stack apps around them. Fraud detection, supply-chain forecasting, sales analytics and more.",
  openGraph: {
    title: "Kunal Tyagi — Full Stack & Machine Learning Developer",
    description:
      "Machine-learning projects with live demos, full-stack builds and open-source work.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1021" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <ThemeProviderClient>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
