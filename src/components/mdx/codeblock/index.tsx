import { Box, Text } from "@chakra-ui/react";
import { InlineCode } from "components/mdx/inline-code";
import { ReactNode } from "react";

type CodeBlockProps = {
  children: ReactNode;
  className: string;
  filename?: string;
  viewlines: boolean;
  ln: string;
};

const CodeBlock = ({ children, className, filename }: CodeBlockProps) => {
  const language = className?.replace(/language-/, "");

  if (!language) {
    return <InlineCode>{children}</InlineCode>;
  }
  return (
    <Box position="relative" zIndex="0">
      <Box
        p={5}
        overflow="hidden"
        bg="#22272e"
        color="#adbac7"
        borderRadius={10}
        mb={10}
        fontSize="sm"
        boxShadow="lg"
      >
        {filename && <Text color="#768390"># {filename} </Text>}
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default CodeBlock;
