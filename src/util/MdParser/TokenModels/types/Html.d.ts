import { ReactHTML } from "react";

export interface HtmlConfiguration {
  allowedTags?: ((keyof ReactHTML) | undefined)[];
}
