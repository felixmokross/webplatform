import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/common/labels.ts",
    "src/common/labels.client.ts",
    "src/fields/usages/usages-field.tsx",
  ],
  format: "esm",
  dts: true,
});
