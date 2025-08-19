import { program } from "commander";

import { cmsPlugin } from "@fxmk/cms-plugin";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { sanitizeConfig } from "payload";
import { generateTypes } from "payload/node";

program
  .name("type-generator")
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
        declare: false,
      },
    });

    if (pluginConfig instanceof Promise) {
      pluginConfig = await pluginConfig;
    }

    generateTypes(await sanitizeConfig(pluginConfig));
  })
  .parse();
