import { Token, TokensList } from "marked";
import HtmlContainer from "./Helpers/HtmlContainer";
import { mapper, pickHandler } from "./TokenModels";

/**
 * 
 * @param tokenList consumable list of entries 
 * @param currentContext 
 * @returns 
 */
function Containerizer(tokenList?: TokensList | Token[], currentContext?: HtmlContainer): HtmlContainer | undefined {
  if (!tokenList?.length) {
    return currentContext;
  }
  
  let parserContext = currentContext ?? new HtmlContainer(undefined, "section", undefined, true);
  
  const firstItem = tokenList.shift();

  if (firstItem && pickHandler(firstItem.type)) {
    const hanlder = mapper[firstItem.type]
    parserContext = hanlder?.(firstItem, parserContext) ?? parserContext;
  }

  return Containerizer(tokenList, parserContext);
}

export default Containerizer;
