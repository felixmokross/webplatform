import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/common/labels.client.ts"],
  format: "esm",
  dts: true,
});
