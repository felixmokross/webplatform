import type {
  SourceLanguageCode,
  TargetLanguageCode,
  TranslateTextOptions,
} from "deepl-node";

const deeplTranslateTextOptions: TranslateTextOptions = {
  formality: "prefer_less",
  modelType: "prefer_quality_optimized",
};

export async function translate(
  text: string,
  sourceLocale: SourceLanguageCode,
  targetLocale: TargetLanguageCode,
  handleHtml: boolean,
) {
  const { Translator } = await import("deepl-node");
  const translator = new Translator(process.env.DEEPL_API_AUTH_KEY!);

  return await translator.translateText(text, sourceLocale, targetLocale, {
    ...deeplTranslateTextOptions,
    ...(handleHtml ? { tagHandling: "html" } : undefined),
  });
}

export const deeplSourceLanguageCodes: string[] = [
  "ar",
  "bg",
  "cs",
  "da",
  "de",
  "el",
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "nb",
  "nl",
  "pl",
  "ro",
  "ru",
  "sk",
  "sl",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh",
  "en",
  "pt",
];

export const deeplTargetLanguage: string[] = [
  "ar",
  "bg",
  "cs",
  "da",
  "de",
  "el",
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "nb",
  "nl",
  "pl",
  "ro",
  "ru",
  "sk",
  "sl",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "en-GB",
  "en-US",
  "pt-BR",
  "pt-PT",
  "zh-Hans",
  "zh-Hant",
  "es-419",
];
