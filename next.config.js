/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [require("remark-mdx-code-meta")],
  },
});
const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/blog/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ];
  },
};
