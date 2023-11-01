import { TokenHandlerV2 } from "../types";

const SpaceToken: TokenHandlerV2<"space"> = function (_, container) {
  container.push("br");
  return container;
}

export default SpaceToken;
