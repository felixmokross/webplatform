import type { GroupField, RadioField } from "payload";
import { showField } from "./show";
import { textField } from "./text";
import { linkField } from "./link";

export type CallToActionFieldOptions = {
  optional?: boolean;
  showByDefault?: boolean;
  variant?: { default: "primary" | "secondary" } | false;
};

export function callToActionField({
  optional = false,
  showByDefault = true,
  variant = { default: "secondary" },
}: CallToActionFieldOptions = {}): GroupField {
  const condition = optional
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_: any, siblingData: any) => siblingData.show
    : undefined;
  return {
    name: "cta",
    label: {
      en: "Call to Action (CTA)",
      es: "Call to Action (CTA)",
    },
    type: "group",
    fields: [
      ...(optional ? [showField({ defaultValue: showByDefault })] : []),
      textField({
        name: "label",
        label: { en: "Label", es: "Etiqueta" },
        admin: { condition },
      }),
      linkField({
        fieldConfig: { admin: { condition } },
      }),
      ...(variant
        ? [
            {
              name: "variant",
              type: "radio",
              label: {
                en: "Variant",
                es: "Variante",
              },
              options: [
                {
                  label: {
                    en: "Primary",
                    es: "Primario",
                  },
                  value: "primary",
                },
                {
                  label: {
                    en: "Secondary",
                    es: "Secundario",
                  },
                  value: "secondary",
                },
              ],
              defaultValue: variant.default,
              admin: { condition },
            } as RadioField,
          ]
        : []),
    ],
  };
}
