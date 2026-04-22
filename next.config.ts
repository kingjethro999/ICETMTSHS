import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve remote images directly without the Next.js optimizer
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Disable the X-Powered-By header (minor security hardening)
  poweredByHeader: false,

  // Compress responses
  compress: true,

  // Allow HMR and Dev resources from local network IP
  allowedDevOrigins: ["192.168.0.194", "localhost:3000"],
};

export default nextConfig;
