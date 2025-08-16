import type { NestedKeysStripped } from "@payloadcms/translations";
import type { Config } from "payload";

export const translations = {
  en: {
    cmsPlugin: {
      common: {
        loading: "Loading…",
      },
      media: {
        generate: {
          confirm:
            "This will send the image to OpenAI to generate an alternative text for the current locale.\n\nThe existing alternative text will be overwritten. Do you want to continue?",
          failure: "Failed to generate alt text",
          generate: "Generate",
          generating: "Generating…",
          pleaseSaveYourChangesToGenerateAltText:
            "Please save your changes to generate the alt text.",
          success: "Alt text generated successfully",
        },
      },
      translations: {
        autoTranslate: "Auto-Translate",
        autoTranslatedSuccessfully: "Auto-translated successfully",
        confirmAutoTranslate:
          "This will translate the {{ sourceLocale }} text to the other locales and overwrite the other translations.\n\nDo you want to proceed?",
        currentLocale: "Current Locale",
        failedToAutoTranslate: "Failed to auto-translate",
        goToTranslation: "Go to Translation",
        pleaseSaveYourChangesToEnableAutoTranslate:
          "Please save your changes to enable translation.",
        selectLocales: "Select Locales",
        selectLocalesDescription:
          "Please confirm the target locales below. The text will be translated from the current locale {{ sourceLocale }} into the selected locales. The translation is powered by the machine translation service <a>DeepL</a>.",
        selectLocalesNote:
          "<s>Note:</s> The existing translations will be overwritten.",
        translateToSelectedLocales: "Translate to Selected Locales",
        translating: "Translating…",
        translationsButtonLabel: "Translations…",
        translationsTitle: "Translations",
      },
      usages: {
        name: "Name",
        type: "Type",
        fieldPath: "Field Path",
        global: "Global",
        noUsages: "There are no usages of this item.",
        numberOfUsages_one: "{{ count }} usage",
        numberOfUsages_other: "{{ count }} usages",
      },
    },
  },
  es: {
    cmsPlugin: {
      common: {
        loading: "Cargando…",
      },
      media: {
        generate: {
          confirm:
            "Esto enviará la imagen a OpenAI para generar un texto alternativo para el idioma actual.\n\nEl texto alternativo existente será sobrescrito. ¿Desea continuar?",
          failure: "Error al generar el texto alternativo",
          generate: "Generar",
          generating: "Generando…",
          pleaseSaveYourChangesToGenerateAltText:
            "Por favor, guarde sus cambios para generar el texto alternativo.",
          success: "Texto alternativo generado con éxito",
        },
      },
      translations: {
        autoTranslate: "Auto-traducir",
        autoTranslatedSuccessfully: "Auto-traducido con éxito",
        confirmAutoTranslate:
          "Esto traducirá el texto de {{ sourceLocale }} a los otros idiomas y sobrescribirá las otras traducciones.\n\n¿Desea continuar?",
        currentLocale: "Idioma actual",
        failedToAutoTranslate: "Error al auto-traducir",
        goToTranslation: "Ir a la traducción",
        pleaseSaveYourChangesToEnableAutoTranslate:
          "Por favor, guarde sus cambios para habilitar la traducción.",
        selectLocales: "Seleccionar idiomas",
        selectLocalesDescription:
          "Confirme los idiomas de destino a continuación. El texto se traducirá del idioma actual {{ sourceLocale }} a los idiomas seleccionados. La traducción es proporcionada por el servicio de traducción automática <a>DeepL</a>.",
        selectLocalesNote:
          "<s>Nota:</s> Las traducciones existentes se sobrescribirán.",
        translateToSelectedLocales: "Traducir a los idiomas seleccionados",
        translating: "Traduciendo…",
        translationsButtonLabel: "Traducciones…",
        translationsTitle: "Traducciones",
      },
      usages: {
        name: "Nombre",
        type: "Tipo",
        fieldPath: "Ruta del campo",
        global: "Global",
        noUsages: "No hay usos de este elemento.",
        numberOfUsages_one: "{{ count }} uso",
        numberOfUsages_other: "{{ count }} usos",
      },
    },
  },
} satisfies NonNullable<Config["i18n"]>["translations"];

export type TranslationsObject = typeof translations.en;
export type TranslationsKey = NestedKeysStripped<TranslationsObject>;
