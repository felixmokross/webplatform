import type { GroupField, RadioField } from "payload";

import { translated } from "../translations/translations.js";
import { linkField } from "./link.js";
import { showField } from "./show.js";
import { textField } from "./text.js";

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
    type: "group",
    fields: [
      ...(optional ? [showField({ defaultValue: showByDefault })] : []),
      textField({
        name: "label",
        admin: { condition },
        label: translated("cmsPlugin:fields:callToAction:label_field:label"),
      }),
      linkField({
        fieldConfig: { admin: { condition } },
      }),
      ...(variant
        ? [
            {
              name: "variant",
              type: "radio",
              admin: { condition },
              defaultValue: variant.default,
              label: translated("cmsPlugin:fields:callToAction:variant:label"),
              options: [
                {
                  label: translated(
                    "cmsPlugin:fields:callToAction:variant:options:primary",
                  ),
                  value: "primary",
                },
                {
                  label: translated(
                    "cmsPlugin:fields:callToAction:variant:options:secondary",
                  ),
                  value: "secondary",
                },
              ],
            } as RadioField,
          ]
        : []),
    ],
    label: translated("cmsPlugin:fields:callToAction:label"),
  };
}
