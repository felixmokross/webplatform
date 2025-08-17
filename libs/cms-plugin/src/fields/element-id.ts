import type { TextField } from "payload";

import { translated } from "../translations/translations.js";

export function elementIdField(): TextField {
  return {
    name: "elementId",
    type: "text",
    admin: {
      description: translated("cmsPlugin:fields:elementId:description"),
    },
    label: translated("cmsPlugin:fields:elementId:label"),
  };
}
