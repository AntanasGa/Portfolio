import HtmlContainer from "../Helpers/HtmlContainer";
import HrefHandler from "../Helpers/HrefHandler";
import { TokenHandler } from "../types";
import ReverseEscape from "../../string/ReverseEscape";
import Containerizer from "../Containerizer";
import { NavLink } from "react-router-dom";
import { DynamicComponent } from "../Helpers/types";
import isNavHref from "../Helpers/IsNavHref";

const LinkToken: TokenHandler<"link"> = function (token, container, config) {
  let tag: DynamicComponent = "a";
  const attributeMap: Record<string, unknown> = {
    onClick: config?.link?.onClick,
    title: token.title,
  };

  if (isNavHref(token.href, config?.link?.navLink)) {
    tag = NavLink;
    attributeMap["to"] = [config?.link?.navLink?.baseLink, token.href.slice(1)]
      .filter(x => x !== undefined)
      .join("/")
      .replace(/\/{2,}/g, "/");
  } else {
    attributeMap["href"] = HrefHandler(token.href, config?.link?.baseUri);
  }

  const currentContext = container.push(tag, attributeMap);

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext, config);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
};

export default LinkToken;
