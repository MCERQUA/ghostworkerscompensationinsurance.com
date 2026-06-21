import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_DISABLE_TURBOPACK: "1",
  },
};

export default nextConfig;
