import PostPage from "components/post";
import { getAllPostsPath, getPostData } from "lib/api";
import { serializePage } from "lib/mdx";
import { OLD_BLOG_URLS_MAPPING, OLD_HTML_BLOG_URLS } from "lib/old-blog-mapping";
import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps } from "next";

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  let file =
    slug[0] in OLD_BLOG_URLS_MAPPING ? OLD_BLOG_URLS_MAPPING[slug[0]] : slug[0];

  const hasBlogPrefix = slug.length > 1;
  if (hasBlogPrefix) {
    const oldHtmlFile = slug[1];
    if (OLD_HTML_BLOG_URLS.includes(oldHtmlFile)) {
      file = oldHtmlFile.substring(0, oldHtmlFile.length - ".html".length);
    }
  }

  const doc = getPostData(file);

  const { source, data } = await serializePage({
    page: doc.page,
  });

  return {
    props: {
      source: source,
      date: doc.date,
      ...data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // New blog posts
  let paths = getAllPostsPath();

  // Blog posts without .html or date
  const oldPaths = Object.keys(OLD_BLOG_URLS_MAPPING).map((key: string) => {
    return {
      params: {
        slug: [key],
      },
    };
  });

  // Blogposts with /blog/something.html
  const htmlPaths = OLD_HTML_BLOG_URLS.map((key: string) => {
    return {
      params: {
        slug: ["blog", key],
      },
    };
  });

  paths = [...paths, ...oldPaths, ...htmlPaths];

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
