import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { getAllPostsPath, getPostData } from "lib/api";
import PostPage, { PostPageProps } from "components/post";
import { serializePage } from "lib/mdx";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const doc = getPostData(slug);

  const { source, data } = await serializePage({
    page: doc.page,
  });

  return {
    props: {
      source: source,
      ...data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsPath();

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
