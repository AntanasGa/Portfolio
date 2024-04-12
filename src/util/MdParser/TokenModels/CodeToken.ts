import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";

const CodeToken: TokenHandler<"code"> = function (token, container) {
  const codeContainer = container.push("div", { className: "code" });
  if (token.lang) {
    codeContainer.push("div").context.push(token.lang);
  }
  codeContainer.push("pre").context.push(ReverseEscape(token.text));
  return container;
}

export default CodeToken;
