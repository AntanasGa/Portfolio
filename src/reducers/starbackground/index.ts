import { CSSProperties, createContext } from "react";
import createReducerInitializer from "~/util/reducer/createReducerInitialize";
import { ReducerContextFunctionMap } from "~/util/reducer/types";

export interface IStarBackgroundSetter {
  x: number,
  y: number,
}

export interface IStarBackgroundReducer {
  transform: CSSProperties["transform"],
}


export const starBackgroundInitializer = createReducerInitializer({
  state(): IStarBackgroundReducer {
    return {
      transform: "scale(1.2) translate(0%, 0%)"
    };
  },
  actions: {
    set(items: IStarBackgroundSetter) {
      return {
        transform: `scale(1.5) translate(${items.x}%, ${items.y}%)`
      };
    }
  }
});

export const StarBackgroundStateContext = createContext(starBackgroundInitializer.state());

export const StarBackgroundReducerContext = createContext<ReducerContextFunctionMap<typeof starBackgroundInitializer> | undefined>(undefined);
