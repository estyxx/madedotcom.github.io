/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [require("remark-mdx-code-meta")],
  },
});

module.exports = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/blog/:slug([^.]*)?(.html)?",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/micro-service-boundaries-are-logical-not-physical",
        destination: "/2016-02-28-micro-service-boundaries-are-logical-not-physical",
        permanent: true,
      },
      {
        source: "/testing-quadrants-test-levels-and-testing-types",
        destination: "/2016-03-13-testing-quadrants-test-levels-and-testing-types",
        permanent: true,
      },
      { source: "/rek-it", destination: "/2016-11-24-rek-it", permanent: true },
      {
        source: "/monitoring-with-riemann-and-rsyslog-part-1",
        destination: "/2016-12-30-monitoring-with-riemann-and-rsyslog-part-1",
        permanent: true,
      },
      {
        source: "/monitoring-with-riemann-and-rsyslog-part-2",
        destination: "/2017-05-29-monitoring-with-riemann-and-rsyslog-part-2",
        permanent: true,
      },
      {
        source: "/monitoring-with-riemann-and-rsyslog-part-3",
        destination: "/2017-06-18-monitoring-with-riemann-and-rsyslog-part-3",
        permanent: true,
      },
      {
        source: "/riemann-workshop-materials",
        destination: "/2017-06-21-riemann-workshop-materials",
        permanent: true,
      },
      {
        source: "/introducing-command-handler",
        destination: "/2017-09-07-introducing-command-handler",
        permanent: true,
      },
      {
        source: "/repository-and-unit-of-work-pattern-in-python",
        destination: "/2017-09-08-repository-and-unit-of-work-pattern-in-python",
        permanent: true,
      },
      {
        source: "/commands-and-queries-handlers-and-views",
        destination: "/2017-09-13-commands-and-queries-handlers-and-views",
        permanent: true,
      },
      {
        source: "/why-use-domain-events",
        destination: "/2017-09-19-why-use-domain-events",
        permanent: true,
      },
    ];
  },
};
