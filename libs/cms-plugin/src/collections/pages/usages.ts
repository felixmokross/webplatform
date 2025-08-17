import type { UsagesConfig } from "../../fields/usages/types.js";

import { usagesField } from "../../fields/usages/config.js";

const usagesConfig: UsagesConfig = {
  collections: ["pages", "banners", "redirects", "brands"],
  collectionToFind: "pages",
  fieldType: "relationship",
  globals: ["common"],
};

export function pageUsagesField() {
  return usagesField(usagesConfig);
}
