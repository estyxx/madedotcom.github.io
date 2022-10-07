import { Heading } from "@chakra-ui/react";
import Container from "components/container";
import LandingPage from "components/landing-page";
import { TagLine } from "components/tag-line";

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
    <>
      <Head>
        <title>Made.com Tech Blog</title>
      </Head>

      <LandingPage />
      <TagLine tags={[]} />
      <Container>
        {posts?.map((post) => {
          return (
            <div key={post.slug}>
              <Link href={`${post.slug}`} key={post.title}>
                {post.title}
              </Link>
              <p className="post-description">{post.description}</p>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default Home;
