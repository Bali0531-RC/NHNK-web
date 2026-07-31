import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export so the site can be served from any plain web host.
  output: "export",
  // Emits /adatvedelem/index.html instead of /adatvedelem.html, so hosts resolve clean URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  // Pinned: an unrelated lockfile higher up the tree otherwise wins root inference.
  turbopack: { root: __dirname },
};

export default nextConfig;
