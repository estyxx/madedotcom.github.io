/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: true,
});
