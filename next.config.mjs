/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allowed remote URLs in Image component
  images: {
    // loader: "cloudinary",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
