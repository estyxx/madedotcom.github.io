import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import components from "components/mdx";

export type PostPageProps = {
  slug: string;
  title: string;
  content: string;
  source?: any;
};

const PostPage: NextPage<PostPageProps> = ({ title, source, ...props }) => {
  console.log("PostPage props:", props);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <MDXRemote {...source} components={components} />
      </div>
    </>
  );
};

export default PostPage;
