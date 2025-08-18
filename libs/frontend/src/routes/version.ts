import { readFile } from "fs/promises";

export async function loader() {
  const packageJson = JSON.parse(await readFile("./package.json", "utf-8"));
  return Response.json({ version: packageJson.version });
}
