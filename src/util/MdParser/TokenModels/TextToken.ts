import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";

const TextToken: TokenHandler<"text"> = function (token, container, config) {

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, container, config);
  } else {
    container.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === container ? container : respondedWith;
}

export default TextToken;
