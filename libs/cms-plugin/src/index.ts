import type { Config } from "payload";

import { ApiKeys } from "./collections/api-keys/config.js";
import { LocaleConfigs } from "./collections/locale-configs/config.js";
import { Media } from "./collections/media/config.js";
import { MediaCategories } from "./collections/media-categories/config.js";
import { Users } from "./collections/users/config.js";
import { editor } from "./common/editor.js";
import { localization } from "./common/localization.js";
import { autoTranslateEndpoint } from "./endpoints/auto-translate.js";
import { translationsEndpoint } from "./endpoints/translations.js";
import { Common } from "./globals/common/config.js";
import { Settings } from "./globals/settings/config.js";
import { translations } from "./translations.js";

export * from "./common/index.js";
export * from "./fields/index.js";

export const cmsPlugin =
  () =>
  (config: Config): Config => {
    if (!config.collections) {
      config.collections = [];
    }

    config.collections.push(Media);
    config.collections.push(MediaCategories);
    config.collections.push(Users);
    config.collections.push(ApiKeys);
    config.collections.push(LocaleConfigs);

    if (!config.globals) {
      config.globals = [];
    }

    config.globals.push(Settings);
    config.globals.push(Common);

    if (!config.admin) {
      config.admin = {};
    }

    config.admin.user = Users.slug;

    if (!config.admin.components) {
      config.admin.components = {};
    }

    config.admin.components.beforeNavLinks = [
      "@fxmk/cms-plugin/rsc#VersionInfo",
    ];

    if (!config.admin.livePreview) {
      config.admin.livePreview = {};
    }

    config.admin.livePreview.breakpoints = [
      {
        name: "mobile",
        height: 844,
        label: "Mobile",
        width: 390,
      },
      {
        name: "tablet-portrait",
        height: 1180,
        label: "Tablet (Portrait)",
        width: 820,
      },
      {
        name: "tablet-landscape",
        height: 820,
        label: "Tablet (Landscape)",
        width: 1180,
      },
      {
        name: "desktop",
        height: 900,
        label: "Desktop",
        width: 1440,
      },
    ];

    config.editor = editor();

    if (!config.endpoints) {
      config.endpoints = [];
    }

    config.endpoints.push(translationsEndpoint);
    config.endpoints.push(autoTranslateEndpoint);

    config.localization = localization;

    const incomingOnInit = config.onInit;

    config.onInit = async (payload) => {
      // Ensure we are executing any existing onInit functions before running our own.
      if (incomingOnInit) {
        await incomingOnInit(payload);
      }

      // TODO extend this to allow for configurable default locale
      const localeConfigs = await payload.find({
        collection: "locale-configs",
        limit: 1,
        where: {
          id: {
            equals: "en",
          },
        },
      });

      if (localeConfigs.totalDocs === 0) {
        await payload.create({
          collection: "locale-configs",
          data: {
            displayLabel: "English",
            locale: "en",
          },
        });
      }

      const settings = await payload.findGlobal({ slug: "settings" });
      if (
        !settings?.publishedLocales ||
        settings.publishedLocales.length === 0 ||
        !settings.fallbackLocale
      ) {
        await payload.updateGlobal({
          slug: "settings",
          data: {
            publishedLocales: {
              fallbackLocale: "en",
              publishedLocales: ["en"],
            },
          },
        });
      }
    };

    if (!config.i18n?.translations) {
      config.i18n = { ...config.i18n, translations: {} };
    }

    for (const language in translations) {
      const key = language as keyof typeof translations;
      config.i18n.translations![key] = {
        ...config.i18n.translations![key],
        ...translations[key],
      };
    }

    return config;
  };
