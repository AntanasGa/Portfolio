import { IContentItem, IContentTagItem } from "~/reducers/manifest";

export interface ITestableComponent {
    testId?: string;
    // Add other props here
}

export type TaggedContentItem = Omit<IContentItem, "tags"> & { tags: IContentTagItem[] };

