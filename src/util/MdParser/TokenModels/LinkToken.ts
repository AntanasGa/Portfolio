import HtmlContainer from "../Helpers/HtmlContainer";
import HrefHandler from "../Helpers/HrefHandler";
import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";

const LinkToken: TokenHandler<"link"> = function (token, container, config) {
  const attributeMap = {
    href: HrefHandler(token.href, config?.link?.baseUri),
    onClick: config?.link?.onClick,
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
