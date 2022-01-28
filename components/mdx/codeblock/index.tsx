import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { InlineCode } from "components/mdx/inline-code";

type CodeBlockProps = {
  children: ReactNode;
  className: string;
  viewlines: boolean;
  ln: string;
};

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const language = className?.replace(/language-/, "");

  if (!language) {
    return <InlineCode>{children}</InlineCode>;
  }
  return (
    <Box position="relative" zIndex="0">
      <Box
        p={5}
        overflow="hidden"
        bg="orange.50"
        borderRadius={10}
        mb={10}
        fontSize="sm"
        boxShadow="lg"
      >
        <Box>{children}</Box>
        {/* <Highlight
          codeString={children}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={viewlines}
        /> */}
      </Box>
      {/* <CopyButton top="4" code={children} /> */}
    </Box>
  );
};

export default CodeBlock;
