import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to ./out.
// On GitHub Pages the site lives under /portfolio, so the deploy workflow
// sets NEXT_PUBLIC_BASE_PATH; locally it is empty and the site is at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
