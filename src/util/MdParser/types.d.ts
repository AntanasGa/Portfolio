import { Tokens } from "marked";
import HtmlContainer from "./Helpers/HtmlContainer";
import { LinkConfiguration } from "./TokenModels/types/Link";
import { HtmlConfiguration } from "./TokenModels/types/Html";

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

export interface ConfigContext {
  link?: LinkConfiguration;
  html?: HtmlConfiguration,
}

// export type ConfigContext = keyof InnerConfigContext extends AcceptedTokens['type'] ? InnerConfigContext : never;

export type TokenHandler<K extends AcceptedTokens['type']> = (token: Extract<AcceptedTokens, { type: K }> | Tokens.Generic, container: HtmlContainer, context?: ConfigContext) => HtmlContainer

export type TokenHandlerTable = { [K in AcceptedTokens['type']]: TokenHandlerV2<K> };
