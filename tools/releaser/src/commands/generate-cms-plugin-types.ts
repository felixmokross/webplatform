import { program } from "commander";
import { generateTypes } from "payload/node";
import { cmsPlugin } from "@fxmk/cms-plugin";
import { sanitizeConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

program
  .command("generate-cms-plugin-types")
  .argument("<outputFile>")
  .action(async (outputFile) => {
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
