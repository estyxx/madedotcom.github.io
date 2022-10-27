import { Box } from "@chakra-ui/react";
import Container from "components/container";
import LandingPage from "components/landing-page";
import { TagLine } from "components/tag-line";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { getPostsMetaData } from "../lib/api";
import { Post } from "lib/types";
import { PostCard } from "components/post-card";
import { Posts } from "components/posts";
import { SecondaryButton } from "components/button";

export async function getStaticProps() {
  const posts = getPostsMetaData();
  return {
    props: {
      posts: posts,
    },
  };
}

type HomeProps = {
  posts: Post[];
};

const Home: NextPage<HomeProps> = ({ posts }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Made.com Tech Blog</title>
      </Head>

      <LandingPage />
      <Container>
        <Box mt="80px" mb="64px">
          {" "}
          <TagLine tags={["All", "Infrastructure", "Process", "Frontend", "Backend"]} />
        </Box>
        <Posts posts={posts} />
        <SecondaryButton>LoadMore</SecondaryButton>
      </Container>
    </>
  );
};

export default Home;
