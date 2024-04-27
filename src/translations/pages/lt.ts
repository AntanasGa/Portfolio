import { PageNamespace } from "./types";
import indexLtPage from "./index/lt";
import errorLtPage from "./error/lt";
import projectsLtPage from "./projects/lt";
import testLtPage from "./testPage/lt";

const lt: PageNamespace = {
  error: errorLtPage,
  index: indexLtPage,
  projects: projectsLtPage,
  testPage: testLtPage,
};

export default lt;
