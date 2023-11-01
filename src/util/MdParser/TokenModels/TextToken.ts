import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandlerV2 } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";

const TextToken: TokenHandlerV2<"text"> = function (token, container) {

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, container);
  } else {
    container.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === container ? container : respondedWith;
}

export default TextToken;
