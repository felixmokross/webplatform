import type { CollectionConfig } from "payload";

import { canManageContent } from "../../common/access-control.js";
import { textareaField } from "../../fields/index.js";
import { contentGroup } from "../../groups.js";
import { translated } from "../../translations/index.js";
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
          description: translated("cmsPlugin:media:category:description"),
          position: "sidebar",
        },
        label: translated("cmsPlugin:media:category:label"),
        relationTo: "mediaCategory",
      },

      {
        name: "comment",
        type: "textarea",
        admin: {
          description: translated("cmsPlugin:media:comment:description"),
          position: "sidebar",
        },
        label: translated("cmsPlugin:media:comment:label"),
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
                  description: translated("cmsPlugin:media:alt:description"),
                },
                label: translated("cmsPlugin:media:alt:label"),
                required: false,
              }),
            ],
            label: translated("cmsPlugin:media:alt:label"),
          },
          {
            fields: [mediaUsagesField()],
            label: translated("cmsPlugin:common:usages:label"),
          },
        ],
      },
    ],
    labels: {
      plural: translated("cmsPlugin:media:labels:plural"),
      singular: translated("cmsPlugin:media:labels:singular"),
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
