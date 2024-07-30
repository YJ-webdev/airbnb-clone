/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0, // Dynamic content is always fetched freshly.
      static: 180, // Static content is refetched every 180 seconds.
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com", // Allow images from this hostname.
        protocol: "https", // Use HTTPS protocol.
        port: "", // Default port (443 for HTTPS).
      },
      {
        hostname: "media.cntraveler.com", // Allow images from this hostname.
        protocol: "https", // Use HTTPS protocol.
        port: "", // Default port (443 for HTTPS).
      },
    ],
  },
};

export default nextConfig;
