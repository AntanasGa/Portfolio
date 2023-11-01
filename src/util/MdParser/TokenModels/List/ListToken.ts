import HtmlContainer from "../../Helpers/HtmlContainer";
import { TokenHandlerV2 } from "../../types";
import Containerizer from "../../Containerizer";

const ListToken: TokenHandlerV2<"list"> = function (token, container) {
  const listProps = {
    start: token.start && token.start != "1" ? token.start : undefined,
  };

  const currentContext = container.push(token.ordered ? "ol" : "ul", listProps);

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.items?.length) {
    respondedWith = Containerizer(token.items, currentContext);
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default ListToken;
