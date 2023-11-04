import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";



const HeadingToken: TokenHandler<"heading"> = function (token, container) {
  const depth: 1 | 2 | 3 | 4 | 5 | 6 = token.depth > 6 ? 6 : token.depth < 1 ? 1 : token.depth;
  const currentContext = container.push(`h${depth}`);

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default HeadingToken;
