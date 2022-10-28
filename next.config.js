/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  // Append the default value with md extensions
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
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
});
