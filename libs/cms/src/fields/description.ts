import type { UIField } from "payload";

export function descriptionField(description: Record<string, string>): UIField {
  return {
    type: "ui",
    name: "adminDescription",
    label: { en: "Description", es: "Descripción" },
    admin: {
      components: {
        Field: {
          path: "/src/components/description-field",
          exportName: "DescriptionField",
          serverProps: {
            description,
          },
        },
      },
    },
  };
}
