import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // disable linting for now
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
