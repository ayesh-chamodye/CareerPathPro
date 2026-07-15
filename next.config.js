/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  experimental: {
    serverComponentsExternalPackages: ['puppeteer', 'cheerio', 'axios'],
  },
};

export default nextConfig;
