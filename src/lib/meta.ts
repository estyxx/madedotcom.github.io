// import { formatISO, parseISO } from "date-fns";
// import removeMarkdown from "markdown-to-text";
import { Meta as MetaJSON, Path } from "lib/types";

const averageWpm = 255;

export default class Meta {
  title: string;
  author: string;
  tags: string[];
  readLengthMin: number;
  date: Date;
  slug: string;
  // description: string;

  constructor(
    title: string,
    author: string,
    tags: string[],
    readLengthMin: number,
    // description: string,
    date: Date,
    slug: string
  ) {
    this.title = title;
    this.author = author;
    this.tags = tags;
    this.readLengthMin = readLengthMin;
    this.date = date;
    this.slug = slug;
    // this.description = description;
  }

  static fromGrayMatterFile(
    grayMatterFile: {
      content: string;
      data: {
        title?: string;
        author?: string;
        tags?: string[];
      };
    },
    path: Path
  ) {
    const wordCount = grayMatterFile.content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / averageWpm);

    // const split = grayMatterFile.content
    //   .split("\n\n")
    //   .filter((item) => item.trim() != "");
    // const summary: string = removeMarkdown(split[0] || "");

    return new Meta(
      grayMatterFile.data.title || "",
      grayMatterFile.data.author || "",
      grayMatterFile.data.tags || [],
      readingTime,
      // grayMatterFile.data.description || summary,
      new Date(path.date),
      path.name
    );
  }

  toJSON(): MetaJSON {
    return {
      title: this.title,
      author: this.author,
      slug: this.slug,
      date: this.date ? this.date.toISOString() : "",
      tags: this.tags,
      readLengthMin: this.readLengthMin,
      // description: this.description,
    };
  }
}
