/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export" ,
  images: {
    domains: [],
  },
  experimental: {
    // Next.js 15 optimizations
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

module.exports = nextConfig
