import { Container, Heading } from "@chakra-ui/react";

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
  console.log("home");
  return (
    <Container maxW="4xl">
      <Head>
        <title>Made.com Tech Team</title>
      </Head>

      <Heading as="h1" size="4xl">
        Made.com Tech Team
      </Heading>

      <Heading as="h3" size="lg">
        <Link href="https://github.com/madedotcom">View GitHub Profile</Link>
      </Heading>
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
  );
};

export default Home;
