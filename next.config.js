/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-prism")],
  },
});
const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: true,
};

module.exports = nextConfig;
