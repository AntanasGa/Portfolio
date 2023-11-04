import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";

const CodeSpanToken: TokenHandler<"codespan"> = function (token, container) {
  const currentContext = container.push("span");
  currentContext.context.push(ReverseEscape(token.text));
  return container;
}

export default CodeSpanToken;
