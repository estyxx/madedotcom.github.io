import { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import components from "components/mdx";
import { Container, Heading, Text } from "@chakra-ui/react";

export type PostPageProps = {
  slug: string;
  title: string;
  author?: string;
  date: string;
  content: string;
  source?: any;
};

const PostPage: NextPage<PostPageProps> = ({
  title,
  author,
  date,
  source,
  ...props
}) => {
  const publishDate = new Date(date);
  console.log("PostPage props:", props);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxW="2xl">
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
