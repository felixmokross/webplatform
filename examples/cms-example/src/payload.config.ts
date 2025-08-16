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
      publicMediaBaseUrl: process.env.PUBLIC_MEDIA_BASE_URL,
      mediaS3Storage: {
        bucket: process.env.MEDIA_S3_BUCKET || "",
        accessKeyId: process.env.MEDIA_S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.MEDIA_S3_SECRET_ACCESS_KEY || "",
        region: process.env.MEDIA_S3_REGION || "",
      },
    }),
  ],
});
