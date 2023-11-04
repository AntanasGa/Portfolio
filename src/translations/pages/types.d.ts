import { ErrorPageNamespace } from "./error/types";
import { IndexPageNamespace } from "./index/types";

export interface PageNamespace {
  error: ErrorPageNamespace;
  index: IndexPageNamespace;
}
