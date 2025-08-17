import type { UsagesConfig } from "../../fields/usages/types.js";

import { usagesField } from "../../fields/usages/config.js";

const usagesConfig: UsagesConfig = {
  collections: ["brands"],
  collectionToFind: "banners",
  fieldType: "relationship",
};

export function bannerUsagesField() {
  return usagesField(usagesConfig);
}
