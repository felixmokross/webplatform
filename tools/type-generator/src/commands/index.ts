import { cmsPlugin } from "@fxmk/cms-plugin";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { program } from "commander";
import { sanitizeConfig } from "payload";
import { generateTypes } from "payload/node";

program.argument("<outputFile>").action(async (outputFile) => {
  let pluginConfig = cmsPlugin({
    mediaS3Storage: {
      accessKeyId: "",
      bucket: "",
      region: "",
      secretAccessKey: "",
    },
  })({
    db: mongooseAdapter({ url: false }),
    // @ts-expect-error secret is not needed for type generation
    secret: null,
    typescript: {
      outputFile,
    },
  });

  if (pluginConfig instanceof Promise) {
    pluginConfig = await pluginConfig;
  }

  generateTypes(await sanitizeConfig(pluginConfig));
});
