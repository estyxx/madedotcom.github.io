import PostPage from "components/post";
import { getPostData, getPostFiles } from "lib/api";
import { serializePage } from "lib/mdx";
import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps } from "next";

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
      date: doc.date,
      ...data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostFiles().map((path) => {
    return { params: { slug: path.name } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
