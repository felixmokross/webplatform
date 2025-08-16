import type { UIField } from "payload";

import type { UsagesConfig } from "./types.js";

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
    label: {
      en: "Usages",
      es: "Usos",
    },
  };
}
