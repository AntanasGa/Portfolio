import { PageNamespace } from "./types";
import indexLtPage from "./index/lt";
import errorLtPage from "./error/lt";

const lt: PageNamespace = {
  error: errorLtPage,
  index: indexLtPage,
};

export default lt;