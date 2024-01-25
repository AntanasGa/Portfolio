import { Dispatch, useMemo } from "react";
import { StateTree, ActionTree, ReducerExposedFunctionMap } from "./types";

const useReducerMask = <S extends StateTree, R extends ActionTree<S>>(options: R, reducer: Dispatch<unknown>) => {
  return useMemo(
    (): ReducerExposedFunctionMap<S, R> => {
      type Action = {
          [K in keyof R]: R[K] extends (this: S, arg: infer Arg) => S
            ? Arg
            : never
        }[keyof R]
        & { type: keyof R };
      
      const assignTable = {} as ReducerExposedFunctionMap<S, R>;
      for (const key in options) {
        type Item = (typeof assignTable)[keyof R];
        type ActParams = Item extends ((args: infer Arg) => S) ? Arg : never;

        assignTable[key] = ((arg: ActParams) => reducer({ ...(arg ?? {}) as Action, type: key })) as Item;
      }

      return assignTable;
    },
    [options, reducer]
  );
}

export default useReducerMask;
