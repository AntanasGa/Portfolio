import { lexer } from "marked";
import Containerizer from "./Containerizer";
import HtmlContainer from "./Helpers/HtmlContainer";
import { Fragment, createElement } from "react";
import { ConfigContext } from "./types";

export default function MdParser(markdown: string, context?: ConfigContext) {
  const markdownType = typeof markdown;
  if (markdownType !== "string") {
    throw new Error(`Expected markdown to be string, got ${markdownType}`)
  }

  const innerContext = context ?? {};
  innerContext.html ??= {};
  innerContext.html.allowedTags ??= ["a", "img"];

  const lexed = lexer(markdown);
  const made = Containerizer(lexed, undefined, innerContext);
  const root = made?.root();
  // eslint-disable-next-line react/no-children-prop
  return createElement(Fragment, { children: root?.context.map(x => x instanceof HtmlContainer ? x.generateComponent() : x ) ?? [] });
}