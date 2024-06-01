import { readFile } from "fs/promises";

// Function to transpile TypeScript file
export const transpileForBrowsers = async (filePath: string) => {
  const transpiler = new Bun.Transpiler({
    loader: "ts",
    target: "browser",
  });
  const code = await readFile(filePath, "utf-8");
  const result = await transpiler.transform(code);
  return result;
};
