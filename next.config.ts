import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     {
     protocol: "https",
     hostname: "5kv2js7v-1337.euw.devtunnels.ms",
     },
    ],
},
};

export default nextConfig;
