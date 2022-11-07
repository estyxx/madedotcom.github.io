import path from "path";
import fs from "fs/promises";
import matter, { GrayMatterFile } from "gray-matter";
import Post from "lib/post";
import { Path } from "lib/types";

const FILE_EXTENSION = ".md";
const DATE_REGEX = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const POSTS_PATH = path.join(process.cwd(), "posts");

export default class PostService {
  findPaths = async (): Promise<Path[]> => {
    const postFiles = await fs.readdir(POSTS_PATH);

    return postFiles
      .map((fileName: string) => {
        const match = DATE_REGEX.exec(fileName);
        const date = match ? match[0] : "";
        const filePath: Path = { ...path.parse(fileName), date: date };

        return filePath;
      })
      .filter((file) => file.date && file.ext == FILE_EXTENSION);
  };

  find = async (query?: { slug?: string[] | string }): Promise<Post[]> => {
    let postFiles = await this.findPaths();

    if (query?.slug) {
      postFiles = postFiles.filter((file) => file.name === query?.slug);
    }

    return await Promise.all(
      postFiles.map(async (file) => {
        const fullPath = path.join(POSTS_PATH, file.base);

        const rawContents = await fs.readFile(fullPath);
        const grayMatterFile: GrayMatterFile<Buffer> = matter(rawContents);
        return await Post.fromGrayMatterFile(grayMatterFile, file);
      })
    ).then((posts) =>
      posts.sort((a, b) => b.meta.date.valueOf() - a.meta.date.valueOf())
    );
  };
}
