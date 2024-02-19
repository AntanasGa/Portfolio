import { useTranslation } from "react-i18next";
import { IContentTagItem } from "~/reducers/manifest";
import { HOST } from "~/util/cdn/constants";
import { useMemo } from "react";
import hexColorParser from "~/util/string/HexColorParser";

export default function ArticleTag({ item }: { item: IContentTagItem }) {
  const { t } = useTranslation("pages", { keyPrefix: "index" });
  const paragraphStyle = useMemo(
    () => {
      const val = hexColorParser(item.background ?? "FFFFFF");
      // thanks to react team for this
      return Object.fromEntries([[ "--background-color", (val ? val : "initial") ]])
    },
    [ item ]
  );
  return (
    <div className="tag">
      <button style={ paragraphStyle }>
        { item.logo &&
          <img src={ (new URL(item.logo, HOST)).toString() } />
        }
        <span>{ item.type }</span>
      </button>
      { item.href &&
        <a title={ t("linkToOrigins") } href={ item.href } target="_blank" rel="noreferrer noopener" >
          <img src="/assets/link.svg" className="icon mono" />
        </a>
      }
    </div>
  );
}
