import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve remote images directly without the Next.js optimizer
    // This eliminates 504 timeouts from the slow upstream WordPress server.
    // Images are still lazy-loaded; we just bypass the resize proxy.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icetmtshs.lincoln.edu.my",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Cache optimized images aggressively — 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Use a larger upstream fetch timeout (default is 7s; WordPress can be slow)
    // Individual <Image> components that still time out should use unoptimized={true}
  },

  // Disable the X-Powered-By header (minor security hardening)
  poweredByHeader: false,

  // Compress responses
  compress: true,

  // Allow HMR and Dev resources from local network IP
  allowedDevOrigins: ["192.168.0.194", "localhost:3000"],
};

export default nextConfig;
