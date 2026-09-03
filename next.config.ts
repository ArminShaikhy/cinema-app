import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.archivehonar.ir",
        pathname: "/**",
      },
    ],
  },
  // Prod serves /api from the same origin via nginx. Dev has no such proxy, so
  // point API_ORIGIN at a backend (e.g. http://localhost:3000) in .env.local.
  async rewrites() {
    const origin = process.env.API_ORIGIN;
    return origin
      ? [{ source: "/api/:path*", destination: `${origin}/api/:path*` }]
      : [];
  },
};

export default nextConfig;
