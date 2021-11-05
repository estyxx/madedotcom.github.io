import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";

export type PostPageProps = {
  title: string;
  meta: string;
  content: string;
};

const components = {
  h1: (props) => (
    <h1
      style={{
        fontSize: "calc(1rem + 1.5vw)",
        color: "black",
        margin: "1vh 0 1vh 0",
      }}
      {...props}
    />
  ),

  p: (props) => (
    <p
      style={{
        fontSize: "calc(1rem + 0.1vw)",
        color: "#000000e6",
        margin: "0vh 0 1vh 0",
      }}
      {...props}
    />
  ),
};

const PostPage: NextPage<PostPageProps> = ({ title, ...props }) => {
  console.log("PostPage props:", props);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <MDXRemote {...props.content} components={components} />
      </div>
    </>
  );
};

export default PostPage;
