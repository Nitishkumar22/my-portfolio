import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // ~5 KB of CSS total — inlining it removes the render-blocking
    // stylesheet requests on first load.
    inlineCss: true,
  },
};

export default nextConfig;