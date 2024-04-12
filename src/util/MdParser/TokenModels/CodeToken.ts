import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";

const CodeToken: TokenHandler<"code"> = function (token, container) {
  const attributeMap: Record<string, unknown> = {};
  if (token.lang) {
    attributeMap["data-lang"] = token.lang;
  }
  
  const currentContext = container.push("code", Object.keys(attributeMap).length ? attributeMap : undefined);
  currentContext.context.push(ReverseEscape(token.text))
  return container;
}

export default CodeToken;
