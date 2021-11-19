import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { getAllPostsPath, getPostData } from "lib/api";
import PostPage, { PostPageProps } from "components/post";
import { serializePage } from "lib/mdx";

export const getStaticProps: GetStaticProps<DocsPageProps> = async ({ params }) => {
  const doc = getPostData(params.slug);

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
