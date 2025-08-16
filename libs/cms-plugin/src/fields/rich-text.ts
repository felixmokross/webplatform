import type { RichTextField } from "payload";

import { translated } from "../translations/index.js";

export function optionalRichTextField(
  config: Partial<RichTextField> = {},
): RichTextField {
  return richTextField({ ...config, required: false });
}

export function richTextField(
  config: Partial<RichTextField> = {},
): RichTextField {
  return {
    name: "text",
    type: "richText",
    label: translated("cmsPlugin:fields:richText:label"),
    localized: true,
    required: true,
    ...config,
    admin: {
      ...config.admin,
      components: {
        Label: "@fxmk/cms-plugin/client#TranslationsFieldLabel",
        ...config.admin?.components,
      },
    },
  };
}
