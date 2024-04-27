import { createContext } from "react";
import { LANGUAGE_MAP } from "~/translations/config";
import createReducerInitializer from "~/util/reducer/createReducerInitialize";
import { ReducerContextFunctionMap } from "~/util/reducer/types";

export interface IContentItem {
  tags: number[],
  name: Record<keyof typeof LANGUAGE_MAP, string>,
  /** use full when indicating path, remove with `/(\.md)$/ig` as a request */
  resource: string,
  activeSince: number,
  thumbnail?: boolean,
  audible?: Record<keyof typeof LANGUAGE_MAP, string>,
}

export interface IContentTagItem {
  name: string,
  type: "content" | "tech",
  tagged?: boolean,
  logo?: string,
  href?: string,
  background?: `#${string}`,
}

export interface IManifestReducer {
  content: IContentItem[],
  tags: Record<number, IContentTagItem>,
  loaded: boolean,
}


export const manifestInitializer = createReducerInitializer({
  state(): IManifestReducer {
    return {
      content: [],
      tags: {},
      loaded: false,
    };
  },
  actions: {
    fullSet(items: Omit<IManifestReducer, "loaded">) {
      return { ...items, loaded: true };
    }
  }
});

export const ManifestStateContext = createContext(manifestInitializer.state());

export const ManifestReducerContext = createContext<ReducerContextFunctionMap<typeof manifestInitializer> | undefined>(undefined);
