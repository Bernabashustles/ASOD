/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 15 specific configurations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],





  },
  // Uncomment experimental features if needed
  // experimental: {
  //   typedRoutes: true,
  //   serverActions: {
  //     bodySizeLimit: '2mb'
  //   },
  // },
};

export default nextConfig;