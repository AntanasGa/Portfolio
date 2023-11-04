import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";

const ParagraphToken: TokenHandler<"paragraph"> = function (token, container, config) {
  const currentContext = container.push("div");

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext, config);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default ParagraphToken;
