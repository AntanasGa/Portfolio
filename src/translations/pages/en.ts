import { PageNamespace } from "./types";
import indexEnPage from "./index/en";
import errorEnPage from "./error/en";
import projectsEnPage from "./projects/en";

const en: PageNamespace = {
  error: errorEnPage,
  index: indexEnPage,
  projects: projectsEnPage,
};

export default en;
