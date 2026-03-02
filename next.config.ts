// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com", // DummyJSON product images
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // fallback placeholder
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;