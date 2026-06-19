// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;

// // import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.0.165:3000",
    "192.168.0.165",
    "192.168.0.107:3000",
    "192.168.0.107",
    "192.168.1.18:3000",
    "192.168.1.18",
    "192.168.0.52:3000",
    "192.168.0.52",
    "192.168.0.52:3000",
    "192.168.0.52"
  ]
};

export default nextConfig;
