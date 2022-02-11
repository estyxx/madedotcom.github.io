import fs from "fs";
import matter from "gray-matter";
import path, { ParsedPath } from "path";

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");
console.log(postsDirectory);
const FILE_EXTENSION = ".md";
const DATE_REGEX = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;

type Path = ParsedPath & {
  date: string;
};

const getPostFiles = (): Path[] => {
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

export const getAllPostsPath = () => {
  const files = getPostFiles();
  return files.map((file: Path) => {
    return {
      params: {
        slug: file.name,
      },
    };
  });
};

export const getPostsMetaData = () => {
  const files = getPostFiles();

  const postsMetaData = files.map(getPostMetaData);

  return postsMetaData.sort((a, b) => +new Date(a.date) - +new Date(b.date)).reverse();
};

const getPostMetaData = ({ base, name }: { base: string; name: string }) => {
  const fullPath = path.join(postsDirectory, base);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // get metadata, content
  const { data } = matter(fileContents);
  const match = DATE_REGEX.exec(name);

  return { slug: name, date: match ? match[0] : "", ...data };
};

export const getPostData = (slug: string) => {
  const fullPath = path.join(postsDirectory, slug + FILE_EXTENSION);
  const meta = getPostMetaData({ base: slug + FILE_EXTENSION, name: slug });
  // get MDX metadata and content
  const page = fs.readFileSync(fullPath, "utf8");

  return { page, ...meta };
};
