import type { GroupField, RowField, TextField } from "payload";

import { validateUrl } from "@payloadcms/richtext-lexical";
import { text } from "payload/shared";

type LinkFieldOptions = {
  allowedLinkTypes?: ("custom" | "internal")[];
  fieldConfig?: Partial<GroupField>;
  required?: boolean;
};

export function linkField({
  allowedLinkTypes,
  fieldConfig,
  required,
}: LinkFieldOptions = {}): GroupField {
  if (required === undefined) {
    required = true;
  }
  return {
    name: "link",
    type: "group",
    fields: [
      {
        name: "linkType",
        type: "radio",
        admin: {
          description: {
            en: "Choose between entering a custom text URL or linking to another document.",
            es: "Elige entre ingresar una URL personalizada o enlazar a otro documento.",
          },
          position: "sidebar",
        },
        defaultValue: "internal",
        label: {
          en: "Link Type",
          es: "Tipo de enlace",
        },
        options: [
          {
            label: {
              en: "Custom URL",
              es: "URL Personalizado",
            },
            value: "custom" as const,
          },
          {
            label: {
              en: "Internal Link",
              es: "Enlace interno",
            },
            value: "internal" as const,
          },
        ].filter(
          (o) => !allowedLinkTypes || allowedLinkTypes.includes(o.value),
        ),
        required,
      },
      {
        name: "doc",
        type: "relationship",
        admin: {
          appearance: "drawer",
          condition: (_, siblingData) => siblingData.linkType === "internal",
        },
        label: {
          en: "Choose a document to link",
          es: "Elige un documento a enlazar",
        },
        // @ts-ignore TODO add pages to cms-plugin config
        relationTo: "pages",
        required,
      },
      queryStringAndFragmentField(),
      {
        name: "url",
        type: "text",
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "custom",
        },
        label: {
          en: "URL",
          es: "URL",
        },
        required,
        validate: (value, options) => {
          const textValidationResult = text(value, options);
          if (textValidationResult !== true) {
            return textValidationResult;
          }

          if (value) {
            if (!validateUrl(value)) {
              // @ts-expect-error t function is not typed with custom translations here
              return options.req.t("custom:validation:mustBeValidUrl");
            }
          }

          return true;
        },
      } as TextField,
    ],
    interfaceName: "NewLink", // TODO rename interface once Link collection is removed
    label: {
      en: "Link",
      es: "Enlace",
    },
    ...fieldConfig,
  };
}

export function queryStringAndFragmentField(): RowField {
  return {
    type: "row",
    fields: [
      {
        name: "queryString",
        type: "text",
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "internal",
          description: {
            en: "If a query string is provided, it will be appended to the URL with a '?' character.",
            es: "Si se proporciona una cadena de consulta, se añadirá a la URL con un carácter '?'.",
          },
          width: "50%",
        },
        label: {
          en: "Query String",
          es: "Cadena de consulta",
        },
      },
      {
        name: "fragment",
        type: "text",
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "internal",
          description: {
            en: "If a fragment is provided, it will be appended to the URL with a '#' character. Use this to link to a section of a page, defined by an 'Element ID'.",
            es: "Si se proporciona un fragmento, se añadirá a la URL con un carácter '#'. Úsalo para enlazar a una sección de una página, definida por un 'ID de elemento'.",
          },
          width: "50%",
        },
        label: {
          en: "Fragment",
          es: "Fragmento",
        },
      },
    ],
  };
}
