export const en = {
  cmsPlugin: {
    admin: {
      groups: { admin: "Administration", content: "Content" },
    },
    apiKeys: {
      labels: {
        plural: "API Keys",
        singular: "API Key",
      },
      remark: { label: "Remark" },
      role: {
        label: "Role",
        options: {
          cicd: "CI/CD",
          e2eTests: "E2E Tests",
          frontend: "Frontend",
        },
      },
    },
    common: {
      id: "ID",
      loading: "Loading…",
      usages: {
        label: "Usages",
      },
    },
    fields: {
      description: {
        label: "Description",
      },
      elementId: {
        description:
          "An element ID allows you to link to this element from other parts of the site. If the ID is 'about-us', you can link to it with an URL ending in '#about-us'.",
        label: "Element ID",
      },
      image: { label: "Image" },
      link: {
        doc: { label: "Choose a document to link" },
        fragment: {
          description:
            "If a fragment is provided, it will be appended to the URL with a '#' character. Use this to link to a section of a page, defined by an 'Element ID'.",
          label: "Fragment",
        },
        label: "Link",
        linkType: {
          description:
            "Choose between entering a custom text URL or linking to another document.",
          label: "Link Type",
          options: {
            custom: "Custom URL",
            internal: "Internal Link",
          },
        },
        queryString: {
          description:
            "If a query string is provided, it will be appended to the URL with a '?' character.",
          label: "Query String",
        },
        url: { label: "URL" },
      },
      moreOptions: { label: "More Options" },
      richText: { label: "Text" },
      show: { label: "Show" },
      text: { label: "Text" },
      textarea: { label: "Text" },
      usages: { label: "Usages" },
    },
    globals: {
      common: {
        label: "Common",
        pageNotFoundScreen: {
          description:
            "This screen is shown when a user tries to access a page that does not exist.",
          heading: {
            label: "Heading",
          },
          label: "Page Not Found Screen",
        },
      },
    },
    localeConfigs: {
      deeplSourceLanguage: { label: "DeepL Source Language" },
      deeplTargetLanguage: { label: "DeepL Target Language" },
      displayLabel: {
        description:
          "The label to be displayed in the application. This should be the name in the respective language so that it can be easily recognized by speakers of that language. E.g. 'English' for English, 'Español' for Spanish.",
        label: "Display Label",
      },
      googleMapsLanguage: { label: "Google Maps Language" },
      labels: {
        plural: "Locale Configurations",
        singular: "Locale Configuration",
      },
      locale: { label: "Locale" },
    },
    media: {
      alt: {
        description:
          "A brief description of the media for screen readers and search engines. It is not displayed on the page but is important for accessibility. For images an alt text can be generated automatically using OpenAI.",
        label: "Alternative Text",
      },
      category: {
        description:
          "Add a media category to easily find this media. When you select the media, you can filter by this category.",
        label: "Category",
      },
      comment: {
        description:
          "Add an internal comment to note any important information about this media, e.g. the source.",
        label: "Comment (internal)",
      },
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
      labels: {
        plural: "Media",
        singular: "Media",
      },
    },
    mediaCategories: {
      name: {
        label: "Name",
      },
      admin: {
        description:
          "Use media categories to organize your media as you find it useful. When you select media, you can filter by category.",
      },
      labels: {
        plural: "Media Categories",
        singular: "Media Category",
      },
      media: {
        label: "Media",
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
    users: {
      labels: {
        plural: "Users",
        singular: "User",
      },
      role: {
        label: "Role",
        options: {
          admin: "Admin",
          editor: "Editor",
        },
      },
    },
    validation: {
      mustBeValidUrl: "Must be a valid URL",
    },
  },
};
