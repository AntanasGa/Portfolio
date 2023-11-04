import { TokenHandler } from "../types";

const SpaceToken: TokenHandler<"space"> = function (_, container) {
  container.push("br");
  return container;
}

export default SpaceToken;
