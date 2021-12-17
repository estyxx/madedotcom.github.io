import { ReactNode } from "react";
import { Heading, Text, Wrap, Box, Link } from "@chakra-ui/react";
import Highlight from "components/mdx/codeblock/highlight";
import theme from "prism-react-renderer/themes/nightOwl";
import CopyButton from "components/mdx/codeblock/copy-button";
import { InlineCode } from "components/mdx/inline-code";

type CodeBlockProps = {
  children: ReactNode;
  className: string;
  viewlines: boolean;
  ln: string;
};

const CodeBlock = ({ children, className, viewlines, ln }: CodeBlockProps) => {
  console.log({ className });
  const language = className?.replace(/language-/, "");

  if (!language) {
    return <InlineCode>{children}</InlineCode>;
  }
  return (
    <Box position="relative" zIndex="0">
      <Box px="0" overflow="hidden" rounded="8px" my="8" bg="#011627">
        <Box>{children}</Box>
        {/* <Highlight
          codeString={children}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={viewlines}
        /> */}
      </Box>
      <CopyButton top="4" code={children} />
    </Box>
  );
};

export default CodeBlock;
