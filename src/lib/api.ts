import fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import path, { ParsedPath } from "path";
// import { Post } from "lib/types";
import Post from "lib/post";
import { MetaJSON } from "lib/meta";

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");

const FILE_EXTENSION = ".md";
const DATE_REGEX = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;

export type Path = ParsedPath & {
  date: string;
};

export const getPostFiles = (): Path[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .map((fileName: string) => {
      const match = DATE_REGEX.exec(fileName);
      const date = match ? match[0] : "";
      const filePath: Path = { ...path.parse(fileName), date: date };

      return filePath;
    })
    .filter((file) => file.date && file.ext == FILE_EXTENSION);
};

export const getPostsMetaData = (): MetaJSON[] => {
  const files = getPostFiles();

  const postsMetaData = files.map(getPostMetaData);

  return postsMetaData.sort((a, b) => +new Date(a.date) - +new Date(b.date)).reverse();
};

const getPostMetaData = ({ base, name }: { base: string; name: string }): MetaJSON => {
  const fullPath = path.join(postsDirectory, base);

  // get MDX metadata and content
  const rawContents = fs.readFileSync(fullPath, "utf8");

  // get metadata, content
  const grayMatterFile: GrayMatterFile<string> = matter(rawContents);

  const post = Post.fromGrayMatterFile(grayMatterFile);
  const match = DATE_REGEX.exec(name);
  post.meta.date = match ? new Date(match[0]) : undefined;

  return post.meta.toJSON();
};

export const getPostData = (slug: string) => {
  const fullPath = path.join(postsDirectory, slug + FILE_EXTENSION);
  const meta = getPostMetaData({ base: slug + FILE_EXTENSION, name: slug });
  // get MDX metadata and content
  const page = fs.readFileSync(fullPath, "utf8");

  return { page, ...meta };
};
