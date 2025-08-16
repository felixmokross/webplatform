import type { Config } from "payload";

import { autoTranslateEndpoint } from "./endpoints/auto-translate.js";
import { translationsEndpoint } from "./endpoints/translations.js";
import { translations } from "./translations.js";
import { Users } from "./collections/users/config.js";
import { ApiKeys } from "./collections/api-keys/config.js";

export * from "./common/index.js";
export * from "./fields/index.js";

export const cmsPlugin =
  () =>
  (config: Config): Config => {
    if (!config.collections) {
      config.collections = [];
    }

    config.collections.push(Users);
    config.collections.push(ApiKeys);

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

    if (!config.endpoints) {
      config.endpoints = [];
    }

    config.endpoints.push(translationsEndpoint);
    config.endpoints.push(autoTranslateEndpoint);

    const incomingOnInit = config.onInit;

    config.onInit = async (payload) => {
      // Ensure we are executing any existing onInit functions before running our own.
      if (incomingOnInit) {
        await incomingOnInit(payload);
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
