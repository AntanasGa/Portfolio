import { PageNamespace } from "./types";
import indexLtPage from "./index/lt";
import errorLtPage from "./error/lt";
import projectsLtPage from "./projects/lt";

const lt: PageNamespace = {
  error: errorLtPage,
  index: indexLtPage,
  projects: projectsLtPage,
};

export default lt;
