import { type CheckboxField } from "payload";

export function showField(config: Partial<CheckboxField> = {}): CheckboxField {
  return {
    name: "show",
    label: {
      en: "Show",
      es: "Mostrar",
    },
    type: "checkbox",
    ...config,
  };
}
