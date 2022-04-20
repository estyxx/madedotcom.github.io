import { Box, Text } from "@chakra-ui/react";
import { InlineCode } from "components/mdx/inline-code";
import { ReactNode } from "react";

type CodeBlockProps = {
  children: ReactNode;
  className: string;
  title?: string;
  viewlines: boolean;
  ln: string;
};

const CodeBlock = ({ children, className, title }: CodeBlockProps) => {
  const language = className?.replace(/language-/, "");

  if (!language) {
    return <InlineCode>{children}</InlineCode>;
  }
  return (
    <Box position="relative" zIndex="0">
      <Box
        overflow="hidden"
        bg="#22272e"
        color="#adbac7"
        borderRadius={10}
        mb={10}
        fontSize="sm"
        boxShadow="lg"
      >
        {title && (
          <Box borderBottom="1px" px={5} py={3}>
            <Text color="#768390">{title}</Text>
          </Box>
        )}

        <Box px={5} py={5}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default CodeBlock;
