import PostPage from "components/post";
import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps } from "next";
import PostService from "lib/post-service";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const service = new PostService();
  const posts = await service.find({ slug });
  const post = posts[0];

  return {
    props: {
      post: post.toJSON(),
      contents: await post.serialize(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new PostService();
  const posts = await service.findPaths();

  return {
    paths: posts.map((path) => ({
      params: {
        slug: path.name,
      },
    })),
    fallback: false,
  };
};

export default PostPage;
