import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";

const CodeToken: TokenHandler<"code"> = function (token, container) {
  const currentContext = container.push("code");
  currentContext.context.push(ReverseEscape(token.text))
  return container;
}

export default CodeToken;
