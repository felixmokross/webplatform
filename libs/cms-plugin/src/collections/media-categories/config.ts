import type { CollectionConfig } from "payload";

import { canManageContent } from "../../common/access-control.js";
import { adminGroup } from "../../groups.js";

export const MediaCategories: CollectionConfig = {
  slug: "mediaCategory",
  access: {
    create: canManageContent,
    delete: canManageContent,
    update: canManageContent,
  },
  admin: {
    defaultColumns: ["name", "updatedAt"],
    description: {
      en: "Use media categories to organize your media as you find it useful. When you select media, you can filter by category.",
      es: "Usa las categorías de medios para organizar tus medios como te sea útil. Al seleccionar medios, puedes filtrar por categoría.",
    },
    group: adminGroup,
    listSearchableFields: ["id", "name"],
    useAsTitle: "name",
  },
  defaultPopulate: {
    name: true,
  },
  defaultSort: "name",
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        en: "Name",
        es: "Nombre",
      },
      required: true,
    },
    {
      name: "media",
      type: "join",
      collection: "media",
      label: {
        en: "Media",
        es: "Medios",
      },
      on: "category",
    },
  ],
  labels: {
    plural: {
      en: "Media Categories",
      es: "Categorías de medios",
    },
    singular: {
      en: "Media Category",
      es: "Categoría de medios",
    },
  },
};
