/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-assets.swiggy.com",
        pathname: "/swiggy/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
