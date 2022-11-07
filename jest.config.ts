import type { Config } from "jest";
import { defaults } from "jest-config";
import { compilerOptions } from "./tsconfig.json";

const moduleNameMapper = Object.entries(compilerOptions.paths).reduce<
  Record<string, string>
>((aliases, item) => {
  aliases[`^${item[0].replace("/*", "/(.*)")}`] = `<rootDir>/${item[1][0].replace(
    "/*",
    "/$1"
  )}`;
  return aliases;
}, {});

export default async (): Promise<Config> => {
  return {
    verbose: true,
    testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "<rootDir>/.next"],
    setupFilesAfterEnv: ["<rootDir>/scripts/jest-setup.js"],
    moduleNameMapper,
  };
};
