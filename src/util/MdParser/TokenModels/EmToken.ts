import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandlerV2 } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";



const EmToken: TokenHandlerV2<"em"> = function (token, container) {
  const currentContext = container.push("em");

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default EmToken;
