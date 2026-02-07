import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "ws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
