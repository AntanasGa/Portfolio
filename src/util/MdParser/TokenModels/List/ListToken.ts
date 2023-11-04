import HtmlContainer from "../../Helpers/HtmlContainer";
import { TokenHandler } from "../../types";
import Containerizer from "../../Containerizer";

const ListToken: TokenHandler<"list"> = function (token, container, config) {
  const listProps = {
    start: token.start && token.start != "1" ? token.start : undefined,
  };

  const currentContext = container.push(token.ordered ? "ol" : "ul", listProps);

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.items?.length) {
    respondedWith = Containerizer(token.items, currentContext, config);
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default ListToken;
