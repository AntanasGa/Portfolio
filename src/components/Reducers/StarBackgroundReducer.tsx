import { ReactNode, useReducer } from "react";
import { IStarBackgroundReducer, StarBackgroundReducerContext, StarBackgroundStateContext, starBackgroundInitializer } from "~/reducers/starbackground";
import abstractReducerFunction from "~/util/reducer/abstractReducerFunction";
import useReducerMask from "~/util/reducer/useReducerMask";

export default function StarBackgroundReducer({ children }: { children: ReactNode }) {

  const [ state, reducer ] = useReducer((state: IStarBackgroundReducer, action: unknown) => abstractReducerFunction(state, starBackgroundInitializer.actions, action), starBackgroundInitializer.state());
  const actions = useReducerMask(starBackgroundInitializer.actions, reducer);
  return (
    <StarBackgroundStateContext.Provider value={ state }>
      <StarBackgroundReducerContext.Provider value={ actions }>
        { children }
      </StarBackgroundReducerContext.Provider>
    </StarBackgroundStateContext.Provider>
  );
}
