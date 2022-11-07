import { GrayMatterFile } from "gray-matter";
import Meta from "lib/meta";
import { Path, Post as PostJSON } from "lib/types";

import rehypeHighlight from "rehype-highlight";
import remarkMdxCodeMeta from "remark-mdx-code-meta";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export default class Post {
  meta: Meta;
  contents: string;

  constructor(meta: Meta, contents: string) {
    this.meta = meta;
    this.contents = contents;
  }

  static fromGrayMatterFile(grayMatterFile: GrayMatterFile<Buffer>, path: Path) {
    return new Post(
      Meta.fromGrayMatterFile(grayMatterFile, path),
      grayMatterFile.content
    );
  }

  toJSON(): PostJSON {
    return { meta: this.meta.toJSON(), contents: this.contents };
  }

  hasAnyCategory(givenCategories: string[]): boolean {
    for (const category of givenCategories) {
      if (
        this.meta.tags
          .map((category) => category.toLowerCase())
          .includes(category.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  }

  isOnDate(year?: string, month?: string, day?: string): boolean {
    const date = new Date(
      parseInt(year || "1970"),
      parseInt(month || "1"),
      parseInt(day || "1")
    );

    return (
      this.meta.date?.getDate() == date.getDate() &&
      this.meta.date.getMonth() == date.getMonth() &&
      this.meta.date.getFullYear() == date.getFullYear()
    );
  }

  serialize = async (): Promise<MDXRemoteSerializeResult> => {
    return await serialize(this.contents, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
        remarkPlugins: [remarkMdxCodeMeta],
      },
    });
  };
}
