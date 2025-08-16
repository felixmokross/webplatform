import type { UIField } from "payload";

export function descriptionField(description: Record<string, string>): UIField {
  return {
    name: "adminDescription",
    type: "ui",
    admin: {
      components: {
        Field: {
          exportName: "DescriptionField",
          path: "@fxmk/cms-plugin/rsc",
          serverProps: {
            description,
          },
        },
      },
    },
    label: { en: "Description", es: "Descripción" },
  };
}
