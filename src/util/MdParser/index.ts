import { lexer } from "marked";
import Containerizer from "./Containerizer";
import HtmlContainer from "./Helpers/HtmlContainer";
import { Fragment, createElement } from "react";

export default function (markdown: string) {
  const markdownType = typeof markdown;
  if (markdownType !== "string") {
    throw new Error(`Expected markdown to be string, got ${markdownType}`)
  }
  const lexed = lexer(markdown);
  console.log(JSON.parse(JSON.stringify(lexed)));
  const made = Containerizer(lexed);
  const root = made?.root();
  return createElement(Fragment, { children: root?.context.map(x => x instanceof HtmlContainer ? x.generateComponent() : x ) ?? [] });
}