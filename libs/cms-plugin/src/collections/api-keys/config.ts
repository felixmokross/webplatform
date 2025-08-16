import { isAdmin } from "../../common/access-control.js";
import { adminGroup } from "../../groups.js";
import { CollectionConfig } from "payload";

export const ApiKeys: CollectionConfig = {
  slug: "api-keys",
  labels: {
    singular: { en: "API Key", es: "Clave API" },
    plural: { en: "API Keys", es: "Claves API" },
  },
  access: {
    read: ({ req }) => isAdmin(req),
    create: ({ req }) => isAdmin(req),
    update: ({ req }) => isAdmin(req),
    delete: ({ req }) => isAdmin(req),
  },
  auth: {
    disableLocalStrategy: true,
    useAPIKey: true,
  },
  admin: {
    group: adminGroup,
    defaultColumns: ["name", "role", "remark", "createdAt", "updatedAt"],
    useAsTitle: "id",
  },
  fields: [
    {
      name: "role",
      label: {
        en: "Role",
        es: "Rol",
      },
      type: "radio",
      options: [
        { value: "cicd", label: { en: "CI/CD", es: "CI/CD" } },
        { value: "frontend", label: { en: "Frontend", es: "Frontend" } },
        { value: "e2e-tests", label: { en: "E2E Tests", es: "E2E Tests" } },
      ],
      defaultValue: "editor",
      required: true,
      access: {
        read: () => true,
        create: ({ req }) => isAdmin(req),
        update: ({ req }) => isAdmin(req),
      },
    },
    {
      name: "remark",
      label: {
        en: "Remark",
        es: "Comentario",
      },
      type: "text",
    },
  ],
};
