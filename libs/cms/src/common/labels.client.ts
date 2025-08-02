"use client";

import { useTranslation } from "@payloadcms/ui";
import { getLabelText, type LabelData } from "./labels";

export function Label({ children }: { children: LabelData }) {
  const { i18n } = useTranslation();
  return getLabelText(children, i18n);
}
