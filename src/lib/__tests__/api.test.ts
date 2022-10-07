import { getPostFiles } from "lib/api";
import fs from "fs";

jest.mock("fs");

describe("api", () => {
  describe("getPostFiles", () => {
    it("should exclude files not strting with a date", () => {
      fs.readdirSync.mockReturnValue([
        "2022-10-07-hello-world.md",
        "something-else.md",
      ]);

      const files = getPostFiles();

      expect(files).toStrictEqual([
        {
          base: "2022-10-07-hello-world.md",
          date: "2022-10-07",
          dir: "",
          ext: ".md",
          name: "2022-10-07-hello-world",
          root: "",
        },
      ]);
    });
  });

  describe("getPostsMetaData", () => {
    it("should order posts by reverse date", () => {});
  });
});
