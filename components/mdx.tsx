import { ReactNode } from "react";
import { Heading, Text, Wrap, Box, Link } from "@chakra-ui/react";

const Code = ({ children }: { children: ReactNode }) => {
  return (
    <Wrap bg="orange.50" borderRadius={10} mb={10} fontSize="sm" boxShadow="lg">
      <Box p={5}>{children}</Box>
    </Wrap>
  );
};

const PostLink = ({ children, href }: { href?: string; children: ReactNode }) => {
  return (
    <Link color="made.blue" href={href}>
      {children}
    </Link>
  );
};

const CodeInline = ({ children }: { children: ReactNode }) => {
  return <code>{children}</code>;
};

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text mb={4}>{children}</Text>
);

const heading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const wrapper = ({ children }: { children: ReactNode }) => {
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

const theme = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  a: PostLink,
  p: Paragraph,
  inlineCode: CodeInline,
  code: Code,
};

export default theme;
