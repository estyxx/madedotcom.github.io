import { Box, Heading, Link, Text } from "@chakra-ui/react";
import CodeBlock from "components/mdx/codeblock";
import { ReactNode } from "react";

const PostLink = ({ children, href }: { href?: string; children?: ReactNode }) => {
  return (
    <Link color="made.blue" href={href} target="_blank">
      {children}
    </Link>
  );
};

const CodeInline = ({ children }: { children?: ReactNode }) => {
  return <code>{children}</code>;
};

const Paragraph = ({ children }: { children?: ReactNode }) => (
  <Text mb={4}>{children}</Text>
);

const heading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const wrapper = ({ children }: { children?: ReactNode }) => {
    const sizes = {
      1: "4xl",
      2: "3xl",
      3: "lg",
      4: "md",
      5: "sm",
      6: "xs",
    };
    return (
      <Heading as={`h${level}`} size={sizes[level]}>
        {children}
      </Heading>
    );
  };

  return wrapper;
};

const BlockQuote = ({ children }: { children?: ReactNode }) => {
  return (
    <Box
      as="blockquote"
      borderLeft="2px"
      borderLeftColor="made.blue"
      pt={3}
      px={3}
      mb={4}
      overflow="auto"
      opacity="80%"
    >
      <Text as="i">{children}</Text>
    </Box>
  );
};

const theme = {
  blockquote: BlockQuote,
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  a: PostLink,
  p: Paragraph,
  inlineCode: CodeInline,
  code: CodeBlock,
};

export default theme;
