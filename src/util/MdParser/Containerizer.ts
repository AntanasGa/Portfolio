import { Token, TokensList } from "marked";
import HtmlContainer from "./Helpers/HtmlContainer";
import { mapper, pickHandler } from "./TokenModels";
import { ConfigContext } from "./types";

/**
 * 
 * @param tokenList consumable list of entries 
 * @param currentContext 
 * @param config 
 * @returns 
 */
function Containerizer(tokenList?: TokensList | Token[], currentContext?: HtmlContainer, config?: ConfigContext): HtmlContainer | undefined {
  if (!tokenList?.length) {
    return currentContext;
  }
  
  let parserContext = currentContext ?? new HtmlContainer(undefined, "section", undefined, true);
  
  const firstItem = tokenList.shift();

  if (firstItem && pickHandler(firstItem.type)) {
    const hanlder = mapper[firstItem.type]
    parserContext = hanlder?.(firstItem, parserContext, config) ?? parserContext;
  }

  return Containerizer(tokenList, parserContext);
}

export default Containerizer;
