import type { UploadField } from "payload";

export function imageField(config: Partial<UploadField> = {}): UploadField {
  return {
    name: "image",
    label: {
      en: "Image",
      es: "Imagen",
    },
    type: "upload",
    relationTo: "media",
    required: true,
    filterOptions: {
      mimeType: { contains: "image/" },
    },
    ...config,
  } as UploadField;
}
