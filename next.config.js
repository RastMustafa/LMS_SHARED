/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["localhost", "www.bigfootdigital.co.uk"],
    
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.sanity.io",
    //     port: "",
    //   },
    // ],
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
