import type { UIField } from "payload";

import type { UsagesConfig } from "./types.js";

import { allTranslations } from "../../translations/index.js";

export function usagesField(config: UsagesConfig): UIField {
  return {
    name: "usages",
    type: "ui",
    admin: {
      components: {
        Field: {
          exportName: "UsagesField",
          path: "@fxmk/cms-plugin/rsc",
          serverProps: { config },
        },
      },
    },
    // UIField doesn't seem to support a 't' function
    label: allTranslations((v) => v.cmsPlugin.fields.usages.label),
  };
}
