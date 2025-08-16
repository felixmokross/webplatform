import type { NestedKeysStripped } from "@payloadcms/translations";
import type { Config } from "payload";

export const translations = {
  en: {
    cmsPlugin: {
      common: {
        loading: "Loading…",
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
    },
  },
  es: {
    cmsPlugin: {
      common: {
        loading: "Cargando…",
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
    },
  },
} satisfies NonNullable<Config["i18n"]>["translations"];

export type TranslationsObject = typeof translations.en;
export type TranslationsKey = NestedKeysStripped<TranslationsObject>;
