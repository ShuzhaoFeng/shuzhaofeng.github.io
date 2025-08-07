/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // For static export compatibility
  assetPrefix: "/repository/", // Set to subfolder name for GitHub Pages
  basePath: "/repository",     // Set to subfolder name for GitHub Pages
  trailingSlash: true,          // Ensures static routing works on GitHub Pages
};

module.exports = nextConfig;
