/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: { appDir: true },
  images: { domains: ['localhost', 'yoursite.ir'] },
  async rewrites() {
    return [
      { source: '/ai/:path*', destination: `${process.env.AI_SERVICE_URL || 'http://ai_service:8000'}/:path*` },
      { source: '/api/:path*', destination: `${process.env.BACKEND_URL || 'http://backend:4000'}/api/:path*` },
    ];
  },
};
module.exports = nextConfig;
