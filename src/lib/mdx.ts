import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import remarkMdxCodeMeta from "remark-mdx-code-meta";

import { serialize } from "next-mdx-remote/serialize";

export const serializePage = async ({ page }: { page: string }) => {
  const { data, content } = matter(page);

  const source = await serialize(content, {
    mdxOptions: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rehypePlugins: [rehypeHighlight],
      remarkPlugins: [remarkMdxCodeMeta],
    },
  });

  return { source, data };
};
