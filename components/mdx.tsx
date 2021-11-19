import { ReactNode } from "react";
import { Heading, Text } from "@chakra-ui/react";

const Code = ({ children }: { children: ReactNode }) => {
  return <code className="p-1">{children}</code>;
};

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text className="mb-4">{children}</Text>
);

const H1 = ({ children }: { children: ReactNode }) => (
  <Heading as="h1" size="4xl">
    {children}
  </Heading>
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
  p: Paragraph,
  inlineCode: Code,
};

export default theme;
