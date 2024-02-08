import { createContext } from "react";
import { LANGUAGE_MAP } from "../../translations/config";
import createReducerInitializer from "../../util/reducer/createReducerInitialize";
import { ReducerContextFunctionMap } from "../../util/reducer/types";

export interface IContentItem {
  tags: number[],
  name: Record<keyof typeof LANGUAGE_MAP, string>,
  resource: string,
  activeSince: number,
}

export interface IContentTagItem {
  type: string,
  tagged?: boolean,
  logo?: string,
  href?: string,
}

export interface IManifestReducer {
  content: IContentItem[],
  tags: Record<number, IContentTagItem>
}


export const manifestInitializer = createReducerInitializer({
  state(): IManifestReducer {
    return {
      content: [],
      tags: {},
    };
  },
  actions: {
    fullSet(items: IManifestReducer) {
      return items;
    }
  }
});

export const ManifestStateContext = createContext(manifestInitializer.state());

export const ManifestReducerContext = createContext<ReducerContextFunctionMap<typeof manifestInitializer> | undefined>(undefined);