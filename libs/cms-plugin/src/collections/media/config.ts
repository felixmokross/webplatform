import type { CollectionConfig } from "payload";

import { canManageContent } from "../../common/access-control.js";
import { textareaField } from "../../fields/index.js";
import { contentGroup } from "../../groups.js";
import { generateAltTextEndpoint } from "./generate-alt-text-endpoint.js";
import { mediaUsagesField } from "./usages.js";

export function Media({
  generateAltTextOptions,
}: {
  generateAltTextOptions?: { publicMediaBaseUrl: string };
} = {}): CollectionConfig {
  return {
    slug: "media",
    access: {
      create: canManageContent,
      delete: canManageContent,
      update: canManageContent,
    },
    admin: {
      defaultColumns: ["filename", "category", "comment", "updatedAt"],
      group: contentGroup,
      listSearchableFields: ["id", "filename", "comment", "alt"],
    },
    defaultPopulate: {
      alt: true,
      filename: true,
      height: true,
      mimeType: true,
      width: true,
    },
    defaultSort: "filename",
    endpoints: generateAltTextOptions
      ? [generateAltTextEndpoint(generateAltTextOptions)]
      : [],
    fields: [
      {
        name: "category",
        type: "relationship",
        admin: {
          description: {
            en: "Add a media category to easily find this media. When you select the media, you can filter by this category.",
            es: "Agrega una categoría de medios para encontrar fácilmente este medio. Al seleccionar el medio, puedes filtrar por esta categoría.",
          },
          position: "sidebar",
        },
        label: {
          en: "Category",
          es: "Categoría",
        },
        relationTo: "mediaCategory",
      },

      {
        name: "comment",
        type: "textarea",
        admin: {
          description: {
            en: "Add an internal comment to note any important information about this media, e.g. the source.",
            es: "Agrega un comentario interno para anotar cualquier información importante sobre este medio, por ejemplo, la fuente.",
          },
          position: "sidebar",
        },
        label: {
          en: "Comment (internal)",
          es: "Comentario (interno)",
        },
      },

      {
        type: "tabs",
        tabs: [
          {
            fields: [
              textareaField({
                name: "alt",
                admin: {
                  components: {
                    afterInput: [
                      "@fxmk/cms-plugin/client#GenerateAltTextButton",
                    ],
                  },
                  description: {
                    en: "A brief description of the media for screen readers and search engines. It is not displayed on the page but is important for accessibility. For images an alt text can be generated automatically using OpenAI.",
                    es: "Una breve descripción del medio para lectores de pantalla y motores de búsqueda. No se muestra en la página pero es importante para la accesibilidad. Para las imágenes se puede generar un texto alternativo automáticamente utilizando OpenAI.",
                  },
                },
                label: {
                  en: "Alternative Text",
                  es: "Texto alternativo",
                },
                required: false,
              }),
            ],
            label: {
              en: "Alternative Text",
              es: "Texto alternativo",
            },
          },
          {
            fields: [mediaUsagesField()],
            label: {
              en: "Usages",
              es: "Usos",
            },
          },
        ],
      },
    ],
    labels: {
      plural: {
        en: "Media",
        es: "Medios",
      },
      singular: {
        en: "Media",
        es: "Medio",
      },
    },
    upload: {
      crop: false,
      disableLocalStorage: true,
      displayPreview: true,
      focalPoint: false,
      imageSizes: [
        {
          name: "thumbnail",
          width: 400,
        },
      ],
      mimeTypes: ["image/*", "video/*"],
    },
  };
}
