import type { LabelFunction } from "payload";
import type { I18nClient } from "@payloadcms/translations";

export type LabelData = LabelFunction | string | Record<string, string>;

export function getLabelText(data: LabelData, i18n: I18nClient) {
  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object") {
    return data[i18n.language];
  }

  if (typeof data === "function") {
    return data({ t: i18n.t as Parameters<LabelFunction>[0]["t"], i18n });
  }

  throw new Error("Invalid label type");
}
