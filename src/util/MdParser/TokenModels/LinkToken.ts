import HtmlContainer from "../Helpers/HtmlContainer";
import HrefHandler from "../Helpers/HrefHandler";
import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";

const LinkToken: TokenHandler<"link"> = function (token, container) {
  const attributeMap = {
  // FIXME: add configuration
    href: HrefHandler(token.href, "http://localhost:5173/"),
    title: token.title,
  };

  const currentContext = container.push('a', attributeMap);

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
};

export default LinkToken;
