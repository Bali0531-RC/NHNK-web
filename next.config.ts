import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served by Node rather than exported statically: the closed-test signup needs API routes.
  // Emits /adatvedelem/index.html style paths, so existing links keep working.
  trailingSlash: true,
  images: { unoptimized: true },
  // Pinned: an unrelated lockfile higher up the tree otherwise wins root inference.
  turbopack: { root: __dirname },
};

export default nextConfig;
