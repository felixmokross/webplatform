import type { Block } from "payload";

import { descriptionField } from "../../fields/description.js";

export const SeparatorBlock: Block = {
  slug: "Separator",
  fields: [
    descriptionField({
      en: "Use this separator to create a visual break between two subsequent blocks.",
      es: "Utiliza este separador para crear una división visual entre dos bloques consecutivos.",
    }),
  ],
  interfaceName: "Separator",
  labels: {
    plural: {
      en: "Separators",
      es: "Separadores",
    },
    singular: {
      en: "Separator",
      es: "Separador",
    },
  },
};
