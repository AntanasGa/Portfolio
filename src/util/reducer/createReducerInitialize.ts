
import { ActionTree, ReducerWrapper, StateTree } from "./types";

/** type wrapper */
const createReducerInitializer = <S extends StateTree, R extends ActionTree<S>>(initializer: ReducerWrapper<S, R>) => {
    return initializer;
}

export default createReducerInitializer;
