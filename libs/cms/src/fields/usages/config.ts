import type { UIField } from "payload";
import type { UsagesConfig } from "./types";

export function usagesField(config: UsagesConfig): UIField {
  return {
    type: "ui",
    name: "usages",
    label: {
      en: "Usages",
      es: "Usos",
    },
    admin: {
      components: {
        Field: {
          path: "@fxmk/cms/usages-field",
          exportName: "UsagesField",
          serverProps: { config },
        },
      },
    },
  };
}
