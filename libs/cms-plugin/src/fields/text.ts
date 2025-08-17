import type { TextField } from "payload";

import { translated } from "../translations/translations.js";

export function optionalTextField(config: Partial<TextField> = {}): TextField {
  return textField({ ...config, required: false });
}

export function textField(config: Partial<TextField> = {}): TextField {
  return {
    name: "text",
    type: "text",
    label: translated("cmsPlugin:fields:text:label"),
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
  } as TextField;
}
