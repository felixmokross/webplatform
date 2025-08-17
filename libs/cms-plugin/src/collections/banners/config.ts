import type { CollectionConfig } from "payload";

import { canManageContent } from "../../common/access-control.js";
import { callToActionField } from "../../fields/call-to-action.js";
import { textField } from "../../fields/text.js";
import { contentGroup } from "../../groups.js";
import { translated } from "../../translations/translations.js";
import { bannerUsagesField } from "./usages.js";

export const Banners: CollectionConfig = {
  slug: "banners",
  access: {
    create: canManageContent,
    delete: canManageContent,
    update: canManageContent,
  },
  admin: {
    defaultColumns: ["message", "createdAt", "updatedAt"],
    description: translated("cmsPlugin:banners:admin:description"),
    group: contentGroup,
    listSearchableFields: ["id", "message"],
    useAsTitle: "message",
  },
  defaultPopulate: {
    cta: true,
    message: true,
  },
  defaultSort: "message.text",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            textField({
              name: "message",
              label: translated("cmsPlugin:banners:edit:message:label"),
            }),
            // callToActionField({ optional: true, variant: false }),
          ],
          label: translated("cmsPlugin:banners:edit:label"),
        },

        {
          fields: [bannerUsagesField()],
          label: translated("cmsPlugin:banners:usages:label"),
        },
      ],
    },
  ],
  labels: {
    plural: translated("cmsPlugin:banners:labels:plural"),
    singular: translated("cmsPlugin:banners:labels:singular"),
  },
};
