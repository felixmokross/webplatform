export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

export type RichTextObject = {
  root: {
    type: "root";
    children: ElementNode[];
    direction: ("ltr" | "rtl") | null;
    format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
    indent: number;
    version: number;
  };
};

export type TextNode = { type: "text"; text?: string; format: number };

export type ElementNode =
  | ListItemElementNode
  | ParagraphElementNode
  | LinkElementNode
  | ListElementNode
  | HeadingElementNode;

export type Node = ElementNode | TextNode | LineBreakNode;

export type LineBreakNode = { type: "linebreak" };

type BaseElementNode = { version: number; children: Node[] };

export type ListItemElementNode = BaseElementNode & {
  type: "listitem";
};

export type ParagraphElementNode = BaseElementNode & {
  type: "paragraph";
  indent?: number;
};

export type HeadingElementNode = BaseElementNode & {
  type: "heading";
  tag: "h4" | "h5";
};

export type LinkElementNode = BaseElementNode & {
  type: "link";
  fields:
    | {
        linkType: "custom";
        url: string;
      }
    | {
        linkType: "internal";
        doc: {
          relationTo: "pages";
          value: { pathname: string };
        };
        queryString?: string;
        fragment?: string;
      };
};

export type ListElementNode = BaseElementNode & {
  type: "list";
  tag: "ul" | "ol";
};
