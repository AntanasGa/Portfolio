import { PageNamespace } from "./types";
import indexEnPage from "./index/en";
import errorEnPage from "./error/en";

const en: PageNamespace = {
  error: errorEnPage,
  index: indexEnPage,
};

export default en;
