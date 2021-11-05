import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { getAllPostsPath, getPostData } from "lib/api";
import PostPage, { PostPageProps } from "components/post";

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  console.log(params);
  const doc = getPostData(params.slug);
  console.log(doc);
  const mdxSource = await serialize(doc.content);

  return {
    props: {
      content: mdxSource,
      ...doc.metadata,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const docs = getAllPostsPath()

  // return {
  //   paths: docs.map(doc => {
  //     return {
  //       params: {
  //         slug: doc.id
  //       }
  //     }
  //   }),
  //   fallback: false
  // }
  const paths = getAllPostsPath();
  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
