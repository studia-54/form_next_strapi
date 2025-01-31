import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     {
     protocol: "http",
     hostname: "192.168.89.1",
     port: "1337"
     },
    ],
},
};

export default nextConfig;
