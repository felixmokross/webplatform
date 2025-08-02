import type { CollectionSlug, GlobalSlug, LabelFunction } from "payload";

export type RelationshipFieldType = "relationship" | "upload";

export type UsagesConfig = {
  fieldType: RelationshipFieldType;
  collectionToFind: CollectionSlug;
  collections?: CollectionSlug[];
  globals?: GlobalSlug[];
};
export type Usage = (
  | {
      type: "collection";
      collection: CollectionSlug;
      id: string | number;
      title: string;
    }
  | {
      type: "global";
      global: GlobalSlug;
    }
) & {
  label: string | Record<string, string> | LabelFunction;
  fieldPath: string;
};
export type LinkElementNode = {
  fields:
    | {
        linkType: "other";
      }
    | {
        linkType: "internal";
        doc: {
          relationTo: CollectionSlug;
          value: string;
        };
      };
};
