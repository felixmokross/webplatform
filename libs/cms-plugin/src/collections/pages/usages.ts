import type { UsagesConfig } from "../../fields/usages/types.js";

import { usagesField } from "../../fields/usages/config.js";

const usagesConfig: UsagesConfig = {
  // TODO add brands
  collections: ["pages", "banners", "redirects"],
  collectionToFind: "pages",
  fieldType: "relationship",
  globals: ["common"],
};

export function pageUsagesField() {
  return usagesField(usagesConfig);
}
