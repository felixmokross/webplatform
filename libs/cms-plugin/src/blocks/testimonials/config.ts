import type { Block } from "payload";

import { richTextField } from "../../fields/rich-text.js";
import { textField } from "../../fields/text.js";
import { textareaField } from "../../fields/textarea.js";

export const testimonialsBlock: Block = {
  slug: "testimonials",
  fields: [
    textField({
      name: "heading",
      label: {
        en: "Heading",
        es: "Título",
      },
      required: false,
    }),
    richTextField({
      name: "supportingText",
      label: {
        en: "Supporting Text",
        es: "Texto de apoyo",
      },
      required: false,
    }),
    {
      name: "items",
      type: "array",
      admin: {
        components: {
          RowLabel: {
            clientProps: {
              textProp: "author",
            },
            exportName: "RowLabel",
            path: "@fxmk/cms-plugin/client",
          },
        },
      },
      fields: [
        textareaField(),
        textField({
          name: "author",
          label: {
            en: "Author",
            es: "Autor",
          },
        }),
      ],
      label: {
        en: "Items",
        es: "Elementos",
      },
    },
  ],
  interfaceName: "Testimonials",
  labels: {
    plural: {
      en: "Testimonials",
      es: "Testimonios",
    },
    singular: {
      en: "Testimonials",
      es: "Testimonios",
    },
  },
};
