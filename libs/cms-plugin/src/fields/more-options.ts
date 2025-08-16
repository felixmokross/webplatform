import type { CollapsibleField, Field } from "payload";

import { translated } from "../translations/index.js";

export function moreOptionsField(...fields: Field[]): CollapsibleField {
  return {
    type: "collapsible",
    admin: {
      initCollapsed: true,
    },
    fields,
    label: translated("cmsPlugin:fields:moreOptions:label"),
  };
}
