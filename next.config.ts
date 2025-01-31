import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     {
     protocol: "https",
     hostname: "admin.forms.studia-54.com"
     },
    ],
},
};

export default nextConfig;
