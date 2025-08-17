import type { Block } from "payload";

import { callToActionField } from "../../fields/call-to-action.js";
import { elementIdField } from "../../fields/element-id.js";
import { moreOptionsField } from "../../fields/more-options.js";
import { richTextField } from "../../fields/rich-text.js";
import { textField } from "../../fields/text.js";

export const LeadTextBlock: Block = {
  slug: "LeadText",
  fields: [
    textField({
      name: "heading",
      label: { en: "Heading", es: "Título" },
      required: false,
    }),
    richTextField(),
    callToActionField({ optional: true, showByDefault: false }),
    moreOptionsField(elementIdField()),
  ],
  interfaceName: "LeadText",
  labels: {
    plural: {
      en: "Lead Texts",
      es: "Textos de introducción",
    },
    singular: {
      en: "Lead Text",
      es: "Texto de introducción",
    },
  },
};
