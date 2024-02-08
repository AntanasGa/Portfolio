import { PageNamespace } from "./pages/types";
import { SharedNamespace } from "./shared/types";

export interface TranslationContext {
  pages: PageNamespace;
  shared: SharedNamespace;
}
