import { Box, Container, Heading, Text } from "@chakra-ui/react";
import components from "components/mdx";

import { NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { Post } from "lib/types";
import DefaultErrorPage from "next/error";
import { TagLine } from "./tag-line";

interface Props {
  post?: Post;
  contents?: MDXRemoteSerializeResult<Record<string, unknown>>;
}

const PostPage: NextPage<Props> = ({ post, contents }) => {
  if (!post || !contents) {
    return (
      <>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const postDate = new Date(post.meta.date);

  return (
    <>
      <Head>
        <title>{post.meta.title}</title>
      </Head>
      <Container maxW="4xl">
        <Box mt="120px">
          <Box mb="24px">
            <TagLine tags={post.meta.tags} mb="24px" />
          </Box>

          <Heading
            as="h1"
            size="3xl"
            mb={6}
            fontFamily="heading"
            lineHeight="60px"
            fontWeight="500"
            fontSize="48px"
          >
            {post.meta.title}
          </Heading>

          <Text mb={2} fontWeight="bold">
            by {post.meta.author}
          </Text>

          <Text mb={4} color="made.50">
            {postDate.toDateString()}
          </Text>
        </Box>
        <MDXRemote {...contents} components={components} />
      </Container>
    </>
  );
};

export default PostPage;
