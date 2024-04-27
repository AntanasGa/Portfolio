import { PageNamespace } from "./types";
import indexEnPage from "./index/en";
import errorEnPage from "./error/en";
import projectsEnPage from "./projects/en";
import testEnPage from "./testPage/en";

const en: PageNamespace = {
  error: errorEnPage,
  index: indexEnPage,
  projects: projectsEnPage,
  testPage: testEnPage,
};

export default en;
