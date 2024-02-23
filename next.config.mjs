/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allowed remote URLs in Image component
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
