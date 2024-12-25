import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';
import { isStringNode, getUniqAttr, attrValue, TagNode } from "@bbob/plugin-helper";
import Spoiler from '../client/bbcode/Spoiler';
import { Quirk, quirkText } from '@/lib/shared/quirks';
import { BBobCoreOptions, BBobCoreTagNodeTree, TagNodeTree } from '@bbob/types';
import ToolTip from './bbcode/Tooltip';
import Divider from './bbcode/Divider';
import Modal from '../client/bbcode/Modal';
import Countdown from '../client/bbcode/Countdown';
import Bubble from './bbcode/Bubble';

const toNode = (
  tag: string,
  attrs: Record<string, unknown>,
  content?: TagNodeTree
) => TagNode.create(tag, attrs, content);

const bbOptions: BBobCoreOptions = {
  onlyAllowTags: ["quote", "spoiler", "tooltip", 
                  "div", "modal", "countdown", "url",
                  "bubble", "bubble_r", "email", "img",
                  "pad", "color", "colour", "br",
                  "c", "font", "bone", "gradient",
                  "b", "i", "u", "s", "sub", "sup",
                  "table", "td", "tr", "tbody", "thead"],
  contextFreeTags: ['raw'],
  enableEscapeTags: true
}

const preset = presetReact.extend((tags, options) => ({
  ...tags,
  quote: node => ({
    tag: "blockquote",
    content: node.content
  }),
  spoiler: node => ({
    ...node,
    tag: Spoiler
  }),
  tooltip: (node, { render }) => {
    const tooltip = getUniqAttr(node.attrs);
    return {
      ...node,
      tag: ToolTip,
      content: node.content,
      attrs: {
        tooltip
      }
    };
  },
  div: node => ({
    ...node,
    tag: Divider,
    content: node.content,
  }),
  modal: node => ({
    ...node,
    tag: Modal,
    content: node.content,
    attrs: { ...node.attrs }
  }),
  countdown: node => {
    const date = getUniqAttr(node.attrs);
    return {
      ...node,
      tag: Countdown,
      attrs: { date }
    };
  },
  bubble: node => ({
    tag: Bubble,
    content: node.content,
  }),
  bubble_r: node => ({
    tag: Bubble,
    content: node.content,
    attrs: { right: true }
  }),
  email: (node, { render }) => ({
    tag: "a",
    content: node.content,
    attrs: { href: `mailto:${render(node.content)}` }
  }),
  pad: node => ({
    tag: "pre",
    content: node.content,
  }),
  color: node => {
    const color = getUniqAttr(node.attrs)
    return {
      tag: "span",
      attrs: { style: { color: color } },
      content: node.content
    }
  },
  colour: node => {
    const color = getUniqAttr(node.attrs)
    return {
      tag: "span",
      attrs: { style: { color: color } },
      content: node.content
    }
  },
  c: node => {
    const color = getUniqAttr(node.attrs)
    return {
      tag: "span",
      attrs: { style: { color: color } },
      content: node.content
    }
  },
  font: node => {
    const font = getUniqAttr(node.attrs);
    return {
      tag: "span",
      attrs: { style: { fontFamily: font } },
      content: node.content
    };
  },
  url: node => {
    const href = getUniqAttr(node.attrs)
    return {
      tag: "a",
      attrs: {href: href, target: "_blank"},
      content: node.content
    }
  },
  bone: node => ({
    tag: "span",
    attrs: { style: { fontFamily: "Bone" } },
    content: node.content
  }),
  gradient: node => {
    const gradient = getUniqAttr(node.attrs);
    return {
      tag: "span",
      attrs: {
        style: {
          color: `linear-gradient(to right,${gradient})`,
          background: `linear-gradient(to right,${gradient})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }
      },
      content: node.content
    };
  },
  b: node => {
    return {
      tag: "strong",
      attrs: {
        className: "font-black"
      },
      content: node.content
    };
  },
  table: node => {
    return {
      tag: "table",
      content: node.content,
      attrs: {
        className: "table table-zebra table-xs"
      }
    }
  },
  img: (node, { render }) => {
    const width = node.attrs ? node.attrs['w'] : "75%";
    const height = node.attrs ? node.attrs['h'] : "auto";
    return toNode(
        "img",
        {
          src: render(node.content),
          style: {
            width: width ?? "75%",
            height: height ?? "auto"
          }
        },
        null
    )
  },
}));


export function DBBCode({ children, quirk }: { children: React.ReactNode, quirk?: Quirk }) {

  const quirkPlugin = (tree: BBobCoreTagNodeTree) => {
    return tree.walk((node) => {
      if (isStringNode(node) && quirk) {
        return quirkText(node as string, quirk);
      }
      return node;
    });
  };

  return (
    <BBCode plugins={[preset(), quirkPlugin]} options={bbOptions}>
      {children}
    </BBCode>
  )
}