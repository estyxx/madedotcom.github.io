import { Box } from "@chakra-ui/react";
import Container from "components/container";
import LandingPage from "components/landing-page";
import { TagLine } from "components/tag-line";

import type { NextPage } from "next";
import Head from "next/head";

import { Meta } from "lib/types";
import Post from "lib/post";
import { Posts } from "components/posts";
import { SecondaryButton } from "components/button";
import PostService from "lib/post-service";

export async function getStaticProps() {
  const service = new PostService();
  const posts = (await service.find()).map((post: Post) => post.meta.toJSON());

  return {
    props: {
      posts: posts,
    },
  };
}

type HomeProps = {
  posts: Meta[];
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
          <TagLine tags={["All", "Infrastructure", "Process", "Frontend", "Backend"]} />
        </Box>
        <Posts posts={posts} />
        <SecondaryButton>LoadMore</SecondaryButton>
      </Container>
    </>
  );
};

export default Home;
