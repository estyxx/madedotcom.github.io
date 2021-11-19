import matter from "gray-matter";

import { serialize } from "next-mdx-remote/serialize";

export const serializePage = async ({ page }: { page: string }) => {
  const { data, content } = matter(page);

  const source = await serialize(content);

  return { source, data };
};
