import { Tokens } from "marked";
import HtmlContainer from "../Helpers/HtmlContainer";
import { TokenHandler } from "../types";
import Containerizer from "../Containerizer";

const TableCellHandler = (cellList: Tokens.TableCell[], isHeader: boolean = false) => {
  const tableRowContainer = new HtmlContainer(undefined, "tr");
  for (const cell of cellList) {
    tableRowContainer.context.push(
      Containerizer(cell.tokens, new HtmlContainer(tableRowContainer, isHeader ? "th" : "td"))
    );
  }
  return tableRowContainer.root();
}

const TableToken: TokenHandler<"table"> = function (token, container) {

  const currentContext = container.push("table");

  const theadContext = currentContext.push("thead");
  const theadColList: Tokens.TableCell[] = token.header;
  theadContext.context.push(TableCellHandler(theadColList, true))
  
  const tbodyContext = currentContext.push("tbody");
  const tbodyRowList: Tokens.TableCell[][] = token.rows;
  for (const tbodyRow of tbodyRowList) {
    tbodyContext.context.push(TableCellHandler(tbodyRow))
  }
    
  return container;
}

export default TableToken;
