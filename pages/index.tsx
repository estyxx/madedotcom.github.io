import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getPostsMetaData } from "../lib/api";

export async function getStaticProps() {
  const posts = getPostsMetaData();
  return {
    props: {
      posts: posts,
    },
  };
}

type HomeProps = {
  posts: any[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Made.com Tech Team</title>
      </Head>
      {posts.map((post) => {
        return (
          <div key={post.slug}>
            <Link href={`${post.slug}`} key={post.title}>
              <a className="post-title">{post.title}</a>
            </Link>
            <p className="post-description">{post.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
