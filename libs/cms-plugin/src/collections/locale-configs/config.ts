import type { CollectionConfig } from "payload";

import locales from "../../common/locales.json" with { type: "json" };
import {
  deeplSourceLanguageCodes,
  deeplTargetLanguage as deeplTargetLanguageCodes,
} from "../../common/translation.js";
import { adminGroup } from "../../groups.js";
import { googleMapLanguageCodes } from "./google-maps-language-codes.js";

export const LocaleConfigs: CollectionConfig = {
  slug: "locale-configs",
  admin: {
    defaultColumns: ["locale", "displayLabel"],
    group: adminGroup,
    listSearchableFields: ["locale", "displayLabel"],
    useAsTitle: "locale",
  },
  defaultPopulate: {
    displayLabel: true,
    googleMapsLanguage: true,
  },
  defaultSort: "displayLabel",
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        hidden: true,
      },
      label: {
        en: "ID",
        es: "ID",
      },
    },
    {
      name: "locale",
      type: "select",
      access: {
        update: () => false,
      },
      label: {
        en: "Locale",
        es: "Idioma",
      },
      options: locales
        .toSorted((a, b) => a.code.localeCompare(b.code))
        .map((locale) => ({
          label: Object.fromEntries(
            Object.entries(locale.label).map(([key, value]) => [
              key,
              `${value} (${locale.code})`,
            ]),
          ),
          value: locale.code,
        })),
      required: true,
    },
    {
      name: "displayLabel",
      type: "text",
      admin: {
        description: {
          en: "The label to be displayed in the application. This should be the name in the respective language so that it can be easily recognized by speakers of that language. E.g. 'English' for English, 'Español' for Spanish.",
          es: "La etiqueta que se mostrará en la aplicación. Debe ser el nombre en el idioma respectivo para que pueda ser fácilmente reconocido por los hablantes de ese idioma. Por ejemplo, 'English' para inglés, 'Español' para español.",
        },
      },
      label: {
        en: "Display Label",
        es: "Etiqueta de Visualización",
      },
      required: true,
    },
    {
      name: "deeplSourceLanguage",
      type: "select",
      label: {
        en: "DeepL Source Language",
        es: "Idioma de Origen DeepL",
      },
      options: deeplSourceLanguageCodes
        .toSorted((a, b) => a.localeCompare(b))
        .map((languageCode) => ({
          label: Object.fromEntries(
            Object.entries(
              locales.find((l) => l.code === languageCode)!.label,
            ).map(([key, value]) => [key, `${value} (${languageCode})`]),
          ),
          value: languageCode,
        })),
    },
    {
      name: "deeplTargetLanguage",
      type: "select",
      label: {
        en: "DeepL Target Language",
        es: "Idioma de Destino DeepL",
      },
      options: deeplTargetLanguageCodes
        .toSorted((a, b) => a.localeCompare(b))
        .map((languageCode) => ({
          label: Object.fromEntries(
            Object.entries(
              locales.find((l) => l.code === languageCode)!.label,
            ).map(([key, value]) => [key, `${value} (${languageCode})`]),
          ),
          value: languageCode,
        })),
    },
    {
      name: "googleMapsLanguage",
      type: "select",
      label: {
        en: "Google Maps Language",
        es: "Idioma de Google Maps",
      },

      options: googleMapLanguageCodes
        .toSorted((a, b) => a.localeCompare(b))
        .map((languageCode) => ({
          label: Object.fromEntries(
            Object.entries(
              locales.find((l) => l.code === languageCode)!.label,
            ).map(([key, value]) => [key, `${value} (${languageCode})`]),
          ),
          value: languageCode,
        })),
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        data.id = data.locale;
      },
    ],
  },
  labels: {
    plural: {
      en: "Locale Configurations",
      es: "Configuraciones de Idioma",
    },
    singular: {
      en: "Locale Configuration",
      es: "Configuración de Idioma",
    },
  },
};
