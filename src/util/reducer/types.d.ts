// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateTree = Record<string | number | symbol, any>

export type Actor<S, FnArg extends StateTree> = (() => S) | ((argument: FnArg) => S)

export interface ReducerWrapper<S extends StateTree, R extends ActionTree<S>> {
  state: () => S,
  actions: R & ThisType<S>
}

export type ReducerContextFunctionMap<T> = T extends ReducerWrapper<infer S, infer R>
  ? ReducerExposedFunctionMap<S, R>
  : never;

export type ReducerExposedFunctionMap<S, R> = {
  [K in keyof R]: R[K] extends () => S
    ? () => void
    : R[K] extends (arg: infer Arg) => S
    ? Arg extends object
      ? (arg: Arg) => void
    : never
    : never
}

export type ActionTree<S> = Record<string, Actor<S>>;
