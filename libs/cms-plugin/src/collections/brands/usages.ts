import type { UsagesConfig } from "../../fields/usages/types.js";

import { usagesField } from "../../fields/usages/config.js";

const usagesConfig: UsagesConfig = {
  collections: ["pages"],
  collectionToFind: "brands",
  fieldType: "relationship",
};

export function brandUsagesField() {
  return usagesField(usagesConfig);
}
