import { validateUrl } from "@payloadcms/richtext-lexical";
import type { GroupField, RowField, TextField } from "payload";
import { text } from "payload/shared";

type LinkFieldOptions = {
  allowedLinkTypes?: ("internal" | "custom")[];
  required?: boolean;
  fieldConfig?: Partial<GroupField>;
};

export function linkField({
  allowedLinkTypes,
  required,
  fieldConfig,
}: LinkFieldOptions = {}): GroupField {
  if (required === undefined) required = true;
  return {
    name: "link",
    label: {
      en: "Link",
      es: "Enlace",
    },
    type: "group",
    interfaceName: "NewLink", // TODO rename interface once Link collection is removed
    fields: [
      {
        name: "linkType",
        label: {
          en: "Link Type",
          es: "Tipo de enlace",
        },
        type: "radio",
        required,
        defaultValue: "internal",
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
        admin: {
          position: "sidebar",
          description: {
            en: "Choose between entering a custom text URL or linking to another document.",
            es: "Elige entre ingresar una URL personalizada o enlazar a otro documento.",
          },
        },
      },
      {
        name: "doc",
        label: {
          en: "Choose a document to link",
          es: "Elige un documento a enlazar",
        },
        type: "relationship",
        relationTo: "pages",
        required,
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "internal",
          appearance: "drawer",
        },
      },
      queryStringAndFragmentField(),
      {
        name: "url",
        label: {
          en: "URL",
          es: "URL",
        },
        type: "text",
        required,
        validate: (value, options) => {
          const textValidationResult = text(value, options);
          if (textValidationResult !== true) return textValidationResult;

          if (value) {
            if (!validateUrl(value)) {
              // @ts-expect-error t function is not typed with custom translations here
              return options.req.t("custom:validation:mustBeValidUrl");
            }
          }

          return true;
        },
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "custom",
        },
      } as TextField,
    ],
    ...fieldConfig,
  };
}

export function queryStringAndFragmentField(): RowField {
  return {
    type: "row",
    fields: [
      {
        name: "queryString",
        label: {
          en: "Query String",
          es: "Cadena de consulta",
        },
        type: "text",
        admin: {
          width: "50%",
          description: {
            en: "If a query string is provided, it will be appended to the URL with a '?' character.",
            es: "Si se proporciona una cadena de consulta, se añadirá a la URL con un carácter '?'.",
          },
          condition: (_, siblingData) => siblingData.linkType === "internal",
        },
      },
      {
        name: "fragment",
        label: {
          en: "Fragment",
          es: "Fragmento",
        },
        type: "text",
        admin: {
          width: "50%",
          description: {
            en: "If a fragment is provided, it will be appended to the URL with a '#' character. Use this to link to a section of a page, defined by an 'Element ID'.",
            es: "Si se proporciona un fragmento, se añadirá a la URL con un carácter '#'. Úsalo para enlazar a una sección de una página, definida por un 'ID de elemento'.",
          },
          condition: (_, siblingData) => siblingData.linkType === "internal",
        },
      },
    ],
  };
}
