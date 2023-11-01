import { TokenHandlerV2 } from "../types";
import ReverseEscape from "../../string/ReverseEscape";

const CodeSpanToken: TokenHandlerV2<"codespan"> = function (token, container) {
  const currentContext = container.push("span");
  currentContext.context.push(ReverseEscape(token.text));
  return container;
}

export default CodeSpanToken;
