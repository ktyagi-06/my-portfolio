import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // old links to the resume keep working
    return [
      { source: "/resume.pdf", destination: "/Kunal_Tyagi_Resume.pdf", permanent: true },
      { source: "/MyResume.pdf", destination: "/Kunal_Tyagi_Resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
