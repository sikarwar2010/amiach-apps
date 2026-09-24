/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets CI / verification builds use a separate dir so a running `next dev` is never clobbered.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
  },
};

export default nextConfig;
