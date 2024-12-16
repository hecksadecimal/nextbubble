import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';
import TagNode from "@bbob/plugin-helper";
import { isStringNode } from "@bbob/plugin-helper";
import Spoiler from '../client/Spoiler';
import { Quirk, quirkText } from '@/lib/shared/quirks';
import { BBobCoreTagNodeTree } from '@bbob/types';

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
  email: node => ({
    tag: "a",
    content: node.content,
    href: `mailto:${node.content}`
  }),
  pad: node => ({
    tag: "pre",
    content: node.content,
  }),
  color: (node, {render}) => ({
    tag: "span",
    attrs: {style: {color: render(node.content)}},
    content: node.content
  }),
  font: (node, {render}) => ({
    tag: "span",
    attrs: {style: {fontFamily: render(node.content)}},
    content: node.content
  }),
}));


export function DBBCode ({children, quirk}: {children: React.ReactNode, quirk?: Quirk}) {
  
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