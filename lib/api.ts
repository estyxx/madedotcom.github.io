const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");
const fileExtension = ".md";

type Path = {
  root?: string;
  dir?: string;
  base: string;
  ext?: string;
  name: string;
};

const getAllFilesInDirectory = (): Path[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName: string) => {
    return path.parse(fileName);
  });
};

const getFiles = (): Path[] => {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter((file) => file.ext == fileExtension);
};

export const getAllPostsPath = () => {
  const files = getFiles();
  return files.map((file: Path) => {
    return {
      params: {
        slug: file.name,
      },
    };
  });
};

export const getPostsMetaData = () => {
  const files = getFiles();

  const postsMetaData = files.map(getPostMetaData);

  return postsMetaData.sort((post) => post.date).reverse();
};

const getPostMetaData = (file: Path) => {
  const fullPath = path.join(postsDirectory, file.base);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // get metadata, content
  const { data } = matter(fileContents);

  const match = /([0-9]{4})-([0-9]{2})-([0-9]{2})/.exec(file.name);

  return { slug: file.name, date: match && match[0], ...data };
};

export const getPostData = (slug: string) => {
  const fullPath = path.join(postsDirectory, slug + fileExtension);
  const meta = getPostMetaData({ base: slug + fileExtension, name: slug });
  // get MDX metadata and content
  const page = fs.readFileSync(fullPath, "utf8");

  return { slug: slug, page, ...meta };
};
