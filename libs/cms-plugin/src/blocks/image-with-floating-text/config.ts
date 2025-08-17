import type { Block } from "payload";

import { elementIdField } from "../../fields/element-id.js";
import { imageField } from "../../fields/image.js";
import { moreOptionsField } from "../../fields/more-options.js";
import { overlayTitleField } from "../../fields/overlay-title.js";
import { richTextField } from "../../fields/rich-text.js";

export const ImageWithFloatingTextBlock: Block = {
  slug: "ImageWithFloatingText",
  fields: [
    imageField(),
    overlayTitleField({
      supportsCallToAction: false,
      supportsPositions: ["top-left", "top-right"],
      supportsSupportingText: false,
    }),
    richTextField(),
    moreOptionsField(elementIdField()),
  ],
  interfaceName: "ImageWithFloatingText",
  labels: {
    plural: {
      en: "Images with Floating Text",
      es: "Imágenes con texto flotante",
    },
    singular: {
      en: "Image with Floating Text",
      es: "Imagen con texto flotante",
    },
  },
};
