import { createElement } from "react";
import HtmlContainer from "../../Helpers/HtmlContainer";
import { TokenHandlerV2 } from "../../types";
import Containerizer from "../../Containerizer";
import { uuidv4 } from "../../../string/Guid";
import ReverseEscape from "../../../string/ReverseEscape";

const ListItemToken: TokenHandlerV2<"list_item"> = function (token, container) {
  const currentContext = container.push("li");

  if (token.task) {
    const checboxProps = {
      type: "checkbox",
      checked: token.checked,
      disabled: true,
      key: uuidv4(),
    }
    currentContext.context.push(createElement("input", checboxProps));
  }

  let respondedWith: HtmlContainer | undefined = undefined;

  if (token.tokens) {
    respondedWith = Containerizer(token.tokens, currentContext);
  } else {
    currentContext.context.push(ReverseEscape(token.text));
  }
  
  return !respondedWith || respondedWith === currentContext ? container : respondedWith;
}

export default ListItemToken;
