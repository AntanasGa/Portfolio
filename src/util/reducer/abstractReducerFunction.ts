import hasNoParameter from "../function/hasNoParameter";
import { ActionTree, StateTree } from "./types";

const devError = (message: string, ...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.error(message, args);
  }
}

export default function <S extends StateTree, A>(state: S, options: ActionTree<S>, action: A) {
  if (!(action instanceof Object) || !("type" in action) || typeof action.type !== "string") {
    devError("Could not execute unknown action", action);
    return state;
  }

  if (!(action.type in options)) {
    devError("Missing action in lookup table", action.type);
    return state;
  }

  const executor = options[action.type];

  if (typeof executor !== "function" || executor.length > 1) {
    devError("Incorrectly set up look up table", action, executor);
    return state;
  }

  if (hasNoParameter(executor)) {
    return executor.apply(state);
  }

  const { type: _, ...context } = action;

  return executor.apply(state, [ context ]);
}
