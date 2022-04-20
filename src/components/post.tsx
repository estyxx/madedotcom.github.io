import { Container, Heading, Text } from "@chakra-ui/react";
import components from "components/mdx";

import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";

export type PostPageProps = {
  slug: string;
  title: string;
  author?: string;
  date: string;
  content: string;
  source?: any;
};

const PostPage: NextPage<PostPageProps> = ({ title, author, date, source }) => {
  const publishDate = new Date(date);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxW="4xl">
        <Heading as="h1" size="3xl" mb={6}>
          {title}
        </Heading>
        <Text mb={2} fontWeight="bold">
          by {author}
        </Text>
        <Text mb={4} color="made.50">
          {publishDate.toDateString()}
        </Text>
        <MDXRemote {...source} components={components} />
      </Container>
    </>
  );
};

export default PostPage;
