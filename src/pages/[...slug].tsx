import PostPage from "components/post";
import { OLD_BLOG_URLS_MAPPING, OLD_HTML_BLOG_URLS } from "lib/old-blog-mapping";
import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps } from "next";
import PostService from "lib/post-service";

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const service = new PostService();

  let file =
    slug[0] in OLD_BLOG_URLS_MAPPING ? OLD_BLOG_URLS_MAPPING[slug[0]] : slug[0];

  const hasBlogPrefix = slug.length > 1;
  if (hasBlogPrefix) {
    const oldHtmlFile = slug[1];
    if (OLD_HTML_BLOG_URLS.includes(oldHtmlFile)) {
      file = oldHtmlFile.substring(0, oldHtmlFile.length - ".html".length);
    }
  }

  const posts = await service.find({ slug: file });
  const post = posts[0];

  return {
    props: {
      post: post.toJSON(),
      contents: await post.serialize(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // New blog posts
  const service = new PostService();
  const posts = await service.findPaths();

  // Blog posts without .html or date
  const oldPaths = Object.keys(OLD_BLOG_URLS_MAPPING).map((key: string) => {
    return {
      name: [key],
    };
  });

  // Blogposts with /blog/something.html
  const htmlPaths = OLD_HTML_BLOG_URLS.map((key: string) => {
    return {
      name: ["blog", key],
    };
  });

  const paths = [
    ...posts.map((item) => {
      return { ...item, name: [item.name] };
    }),
    ...oldPaths,
    ...htmlPaths,
  ];

  return {
    paths: paths.map((path) => ({
      params: {
        slug: path.name,
      },
    })),
    fallback: false,
  };
};

export default PostPage;
