import { ParsedPath } from "path";

export type Post = {
  meta: Meta;
  contents: string;
};

export type Meta = {
  title: string;
  author: string;
  slug: string;
  tags: string[];
  readLengthMin: number;
  date: string;
  // description: string;
};

export type Path = ParsedPath & {
  date: string;
};
