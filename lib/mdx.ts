import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";
export const serializePage = async ({ page }: { page: string }) => {
  const { data, content } = matter(page);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-prism"), remarkMdxCodeMeta],
    },
  });

  return { source, data };
};
