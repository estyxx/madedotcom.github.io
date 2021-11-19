const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");
const fileExtension = ".md";

type Path = {
  root: string;
  dir: string;
  base: string;
  ext: string;
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

  const postsMetaData = files.map((file) => {
    const fullPath = path.join(postsDirectory, file.base);

    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // get metadata, content
    const { data, content } = matter(fileContents);
    const metadata = { slug: file.name, ...data };
    return metadata;
  });

  return postsMetaData;
};

export const getPostData = (slug: string) => {
  const fullPath = path.join(postsDirectory, slug + fileExtension);

  // get MDX metadata and content
  const page = fs.readFileSync(fullPath, "utf8");

  const match = /([0-9]{4})-([0-9]{2})-([0-9]{2})/.exec(slug);

  return { slug: slug, date: match && match[0], page };
};
