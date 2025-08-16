import type { GlobalConfig } from "payload";

import { canManageContent } from "../../common/access-control.js";
import {
  descriptionField,
  optionalRichTextField,
  optionalTextareaField,
  optionalTextField,
} from "../../fields/index.js";
import { contentGroup } from "../../groups.js";

export const Common: GlobalConfig = {
  slug: "common",
  access: {
    update: canManageContent,
  },
  admin: {
    group: contentGroup,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "pageNotFoundScreen",
          fields: [
            descriptionField({
              en: "This screen is shown when a user tries to access a page that does not exist.",
              es: "Esta pantalla se muestra cuando un usuario intenta acceder a una página que no existe.",
            }),
            optionalTextField({
              name: "heading",
              label: { en: "Heading", es: "Título" },
            }),
            optionalRichTextField(),
          ],
          label: {
            en: "Page Not Found Screen",
            es: "Pantalla de Página No Encontrada",
          },
        },
        {
          name: "errorScreen",
          fields: [
            descriptionField({
              en: "This screen is shown when the server encounters an error.",
              es: "Esta pantalla se muestra cuando el servidor encuentra un error.",
            }),
            optionalTextField({
              name: "heading",
              label: { en: "Heading", es: "Título" },
            }),
            optionalRichTextField(),
          ],
          label: {
            en: "Internal Server Error Screen",
            es: "Pantalla de Error Interno del Servidor",
          },
        },
        {
          name: "uiLabels",
          fields: [
            {
              name: "errorBoundary",
              type: "group",
              fields: [
                optionalTextField({
                  name: "title",
                  label: { en: "Title", es: "Título" },
                }),
                optionalTextareaField({
                  name: "text",
                  label: { en: "Text (HTML)", es: "Texto (HTML)" },
                }),
              ],
              label: {
                en: "Error Boundary",
                es: "Límite de Error",
              },
            },
            {
              name: "maintenanceScreen",
              type: "group",
              fields: [
                optionalTextField({
                  name: "login",
                  label: { en: "Login", es: "Iniciar sesión" },
                }),
              ],
              label: {
                en: "Maintenance Screen",
                es: "Pantalla de Mantenimiento",
              },
            },
            {
              name: "login",
              type: "group",
              fields: [
                optionalTextField({
                  name: "email",
                  label: { en: "Email", es: "Correo electrónico" },
                }),
                optionalTextField({
                  name: "password",
                  label: { en: "Password", es: "Contraseña" },
                }),
                optionalTextField({
                  name: "submit",
                  label: { en: "Submit", es: "Enviar" },
                }),
              ],
              label: { en: "Login", es: "Iniciar sesión" },
            },
          ],
          label: {
            en: "UI Labels",
            es: "Etiquetas de la Interfaz de Usuario",
          },
        },
      ],
    },
  ],
  label: {
    en: "Common",
    es: "Común",
  },
};
