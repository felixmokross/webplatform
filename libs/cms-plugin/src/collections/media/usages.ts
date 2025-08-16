import type { UsagesConfig } from "../../fields/usages/types.js";

import { usagesField } from "../../fields/usages/config.js";

const usagesConfig: UsagesConfig = {
  // TODO add existing collections
  collections: [],
  collectionToFind: "media",
  fieldType: "upload",
};

export function mediaUsagesField() {
  return usagesField(usagesConfig);
}
