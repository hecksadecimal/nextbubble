import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';
import { isStringNode, getUniqAttr, TagNode } from "@bbob/plugin-helper";
import Spoiler from '../client/bbcode/Spoiler';
import { Quirk, quirkText } from '@/lib/shared/quirks';
import { BBobCoreTagNodeTree, TagNodeTree } from '@bbob/types';
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
  color: (node, { render }) => ({
    tag: "span",
    attrs: { style: { color: render(node.content) } },
    content: node.content
  }),
  font: node => {
    const font = getUniqAttr(node.attrs);
    return {
      tag: "span",
      attrs: { style: { fontFamily: font } },
      content: node.content
    };
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
  }
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
    <BBCode plugins={[preset(), quirkPlugin]}>
      {children}
    </BBCode>
  )
}