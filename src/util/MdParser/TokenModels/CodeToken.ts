import { TokenHandlerV2 } from "../types";
import ReverseEscape from "../../string/ReverseEscape";

const CodeToken: TokenHandlerV2<"code"> = function (token, container) {
  const currentContext = container.push("pre");
  currentContext.context.push(ReverseEscape(token.text))
  return container;
}

export default CodeToken;
