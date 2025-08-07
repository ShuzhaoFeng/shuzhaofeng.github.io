/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // For static export compatibility
  // assetPrefix and basePath removed for root deployment
  trailingSlash: true, // Ensures static routing works on GitHub Pages
};

module.exports = nextConfig;
