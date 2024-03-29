import { ErrorPageNamespace } from "./error/types";
import { IndexPageNamespace } from "./index/types";
import { ProjectsPageNamespace } from "./projects/types";

export interface PageNamespace {
  error: ErrorPageNamespace;
  index: IndexPageNamespace;
  projects: ProjectsPageNamespace;
}

export interface Routable {
  routeName: string;
}
