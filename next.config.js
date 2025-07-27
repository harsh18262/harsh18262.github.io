/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    // Next.js 15 optimizations
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
