import { TokenHandlerV2Table } from "../types";
import BlockQuoteToken from "./BlockQuoteToken";
import CodeSpanToken from "./CodeSpanToken";
import CodeToken from "./CodeToken";
import HeadingToken from "./HeadingToken";
import HtmlToken from "./HtmlToken";
import ImageToken from "./ImageToken";
import LinkToken from "./LinkToken";
import ListItemToken from "./List/ListItemToken";
import ListToken from "./List/ListToken";
import ParagraphToken from "./ParagraphToken";
import SpaceToken from "./SpaceToken";
import StrongToken from "./StrongToken";
import TableToken from "./TableToken";
import TextToken from "./TextToken";

const innerMapper: Partial<TokenHandlerV2Table> = {
  list: ListToken,
  list_item: ListItemToken,
  blockquote: BlockQuoteToken,
  codespan: CodeSpanToken,
  code: CodeToken,
  heading: HeadingToken,
  html: HtmlToken,
  image: ImageToken,
  link: LinkToken,
  paragraph: ParagraphToken,
  space: SpaceToken,
  strong: StrongToken,
  table: TableToken,
  text: TextToken,
}

export const mapper = Object.seal(innerMapper);

export const pickHandler = (index: string): index is keyof typeof mapper => index in mapper;
