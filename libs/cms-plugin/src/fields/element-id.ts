import type { TextField } from "payload";

export function elementIdField(): TextField {
  return {
    name: "elementId",
    label: {
      en: "Element ID",
      es: "ID de Elemento",
    },
    type: "text",
    admin: {
      description: {
        en: "An element ID allows you to link to this element from other parts of the site. If the ID is 'about-us', you can link to it with an URL ending in '#about-us'.",
        es: "Un ID de elemento te permite enlazar a este elemento desde otras partes del sitio. Si el ID es 'about-us', puedes enlazar a él con una URL que termine en '#about-us'.",
      },
    },
  };
}
