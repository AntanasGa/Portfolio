import { ErrorPageNamespace } from "./error/types";
import { IndexPageNamespace } from "./index/types";
import { ProjectsPageNamespace } from "./projects/types";
import { TestPageNamespace } from "./testPage/types";

export interface PageNamespace {
  error: ErrorPageNamespace;
  index: IndexPageNamespace;
  projects: ProjectsPageNamespace;
  testPage: TestPageNamespace;
}

export interface Routable {
  routeName: string;
}
