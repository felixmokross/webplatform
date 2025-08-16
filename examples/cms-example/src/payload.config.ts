import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { buildConfig } from "payload";
import { cmsPlugin } from "@fxmk/cms-plugin";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  plugins: [
    cmsPlugin({
      deeplApiKey: process.env.DEEPL_API_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
      publicMediaBaseUrl: "http://localhost:3000/api/media/file",
    }),
  ],
});
