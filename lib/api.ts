const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");
const fileExtension = ".md";

const getAllFilesInDirectory = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return path.parse(fileName);
  });
};

const getFiles = () => {
  const allFiles = getAllFilesInDirectory();
  return allFiles.filter((file) => file.ext == fileExtension);
};

export const getAllPostsPath = () => {
  const files = getFiles();
  return files.map((file) => {
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
  console.log("getPostData", slug);
  const fullPath = path.join(postsDirectory, slug + fileExtension);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // get metadata, content
  const { data, content } = matter(fileContents);

  const metadata = { slug: slug, ...data };

  return { metadata, content };
};
