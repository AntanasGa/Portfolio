import { ReactNode, useReducer } from "react";
import { IManifestReducer, ManifestReducerContext, ManifestStateContext, manifestInitializer } from "../../reducers/manifest";
import abstractReducerFunction from "../../util/reducer/abstractReducerFunction";
import useReducerMask from "../../util/reducer/useReducerMask";

export default function ManifestReducer({ children }: { children: ReactNode }) {

  const [ state, reducer ] = useReducer((state: IManifestReducer, action: unknown) => abstractReducerFunction(state, manifestInitializer.actions, action), manifestInitializer.state());
  const actions = useReducerMask(manifestInitializer.actions, reducer);
  return (
    <ManifestStateContext.Provider value={ state }>
      <ManifestReducerContext.Provider value={ actions }>
        { children }
      </ManifestReducerContext.Provider>
    </ManifestStateContext.Provider>
  );
}
