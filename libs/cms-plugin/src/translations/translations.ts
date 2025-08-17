import type { TFunction } from "@payloadcms/translations";
import type { Config } from "payload";

import type { TranslationsKey, TranslationsObject } from "./types.js";

import { en } from "./locales/en.js";
import { es } from "./locales/es.js";

export const translations = {
  en,
  es,
} satisfies NonNullable<Config["i18n"]>["translations"];

export function translated(key: TranslationsKey) {
  return ({ t }: { t: TFunction }) => t(key as Parameters<TFunction>[0]);
}

export function allTranslations(
  getFn: (translations: TranslationsObject) => string,
) {
  return Object.fromEntries(
    Object.entries(translations).map(([key, value]) => [key, getFn(value)]),
  );
}
