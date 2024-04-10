import { IContentTagItem } from "~/reducers/manifest";
import { HOST } from "~/util/cdn/constants";
import { useMemo } from "react";
import hexColorParser from "~/util/string/HexColorParser";

export default function ArticleTag({ item }: { item: IContentTagItem }) {
  const paragraphStyle = useMemo(
    () => {
      const val = hexColorParser(item.background ?? "FFFFFF");
      // thanks to react team for this
      return Object.fromEntries([[ "--background-color", (val ? val : "initial") ]])
    },
    [ item ]
  );
  return (
    <div className="tag" style={ paragraphStyle }>
        { item.logo &&
          <img src={ (new URL(item.logo, HOST)).toString() } />
        }
        <span>{ item.name }</span>
    </div>
  );
}
