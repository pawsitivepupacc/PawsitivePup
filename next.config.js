/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // for static export (Vercel/Netlify friendly)
  images: { unoptimized: true },
};

module.exports = nextConfig;
