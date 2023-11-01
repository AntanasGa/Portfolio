import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandlerV2 } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";



const StrongToken: TokenHandlerV2<"strong"> = function (token, container) {
  const currentContext = container.push("strong");

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default StrongToken;
