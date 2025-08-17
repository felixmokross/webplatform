import type { UsagesConfig } from "../../fields/usages/types.js";

import { usagesField } from "../../fields/usages/config.js";

const usagesConfig: UsagesConfig = {
  collections: ["pages", "brands"],
  collectionToFind: "media",
  fieldType: "upload",
};

export function mediaUsagesField() {
  return usagesField(usagesConfig);
}
