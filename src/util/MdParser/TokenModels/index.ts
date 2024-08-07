import { TokenHandlerTable } from "../types";
import BlockQuoteToken from "./BlockQuoteToken";
import CodeSpanToken from "./CodeSpanToken";
import CodeToken from "./CodeToken";
import DelToken from "./DelToken";
import EmToken from "./EmToken";
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

const innerMapper: Partial<TokenHandlerTable> = {
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
  em: EmToken,
  del: DelToken,
}

export const mapper = Object.freeze(innerMapper);

export const pickHandler = (index: string): index is keyof typeof mapper => index in mapper;
