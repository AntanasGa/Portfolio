import { Tokens } from "marked";
import HtmlContainer from "./Helpers/HtmlContainer";

// because Token.Generic denies Exclude we have to manually define the types
export type AcceptedTokens =
  Tokens.Space
  | Tokens.Code
  | Tokens.Heading
  | Tokens.Table
  | Tokens.Hr
  | Tokens.Blockquote
  | Tokens.List
  | Tokens.ListItem
  | Tokens.Paragraph
  | Tokens.HTML
  | Tokens.Text
  | Tokens.Def
  | Tokens.Escape
  | Tokens.Tag 
  | Tokens.Image
  | Tokens.Link
  | Tokens.Strong
  | Tokens.Em
  | Tokens.Codespan
  | Tokens.Br
  | Tokens.Del

// interface InnerConfigContext {
//   heading?: HeadingConfiguration;
//   link?: LinkConfiguration;
//   image?: ImageConfiguration;
//   html: HtmlConfiguration;
// }

// export type ConfigContext = keyof InnerConfigContext extends AcceptedTokens['type'] ? InnerConfigContext : never;

export type TokenHandlerV2<K extends AcceptedTokens['type']> = (token: Extract<AcceptedTokens, { type: K }> | Tokens.Generic, container: HtmlContainer) => HtmlContainer

export type TokenHandlerV2Table = { [K in AcceptedTokens['type']]: TokenHandlerV2<K> };
