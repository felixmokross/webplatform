import { type CollapsibleField, type Field } from "payload";

export function moreOptionsField(...fields: Field[]): CollapsibleField {
  return {
    type: "collapsible",
    label: {
      en: "More Options",
      es: "Más opciones",
    },
    fields,
    admin: {
      initCollapsed: true,
    },
  };
}
