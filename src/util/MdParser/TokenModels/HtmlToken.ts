import { ReactHTML } from "react";
import HrefHandler from "../Helpers/HrefHandler";
import { ConfigContext, TokenHandler } from "../types";
import { firstOrUndefinedOf } from "../../array/Selector";
import { uuidv4 } from "../../string/Guid";
import TextToken from "./TextToken";
import Constants from "../Helpers/Constants";

function collectAttributes(attributes: string | undefined, key: string, config?: ConfigContext) {
  const result: Record<string, unknown> = {};
  attributes?.replace(/\s+/g, " ")
    .trim()
    .match(/([^=\s]+=["']([^"']*)?["'])|([^=\s]+)/gm)
    ?.map(x => x.split("=", 2))
    .reduce((acc, [k, v]) => {
      if (k.trim()) {
        acc[k] = v?.match(/^["']?([^"']*)["']?$/)?.[1] ?? ""
      }
      return acc;
    },
    result
  );
  
  result.key = key;
  if (result.href) {
    result.href = HrefHandler(result.href + "", config?.link?.baseUri);
  }
  if (result.src) {
    result.src = HrefHandler(result.src + "", config?.link?.baseUri);
  }
  if (result.style) {
    const style: Record<string, string> = {};
    result.style = (result.style + "")
      .split(";")
      .reduce(
        (acc, x) => {
          const [key, value] = x.split(":", 2);
          const actualKey = key.trim().split("-").map((x, i) => i == 0 ? x : x.charAt(0).toUpperCase() + x.slice(1)).join("");
          if(!actualKey) {
            return acc;
          }

          acc[actualKey] = value.trim();
          return acc;
        },
        style
    );
  }
  return result
}

const HtmlToken: TokenHandler<"html"> = function (token, container, config) {
  const tagMatched = token.raw.match(/<\/?[^>]+\/?>/mi);
  let before = token.raw;
  let after: string | undefined;
  
  if (tagMatched?.length) {
    [before, after] = token.raw.split(tagMatched[0], 2);
  }
  
  if (before) {
    TextToken({ type: "text", text: before, raw: before }, container, config);
  }
  
  
  const tagMatch = firstOrUndefinedOf(tagMatched)?.match(/<(?<endtagStart>\/)?(?<descriptor>[^>\s]+)\s?(?<params>[^>]+)?>$/mi);
  
  const tag = tagMatch?.groups?.descriptor.toLowerCase() as (keyof ReactHTML) | undefined;
  let paramMatch = tagMatch?.groups?.params ?? "";
  const handleableTagList = config?.html?.allowedTags ?? [];
  const isSelfEnding = paramMatch.endsWith("/") || (tag && Constants.Elements.selfClosing.includes(tag));
  paramMatch = isSelfEnding ? paramMatch.substring(0, paramMatch.length - 2) : paramMatch;
  const isEnd = !!tagMatch?.groups?.endtagStart;

  if (!tag || !handleableTagList?.map(x => x?.toLowerCase()).includes(tag)) {
    const unsplitAfter = ((tagMatched ?? "") + (after ?? "")).replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    return TextToken({ type: "text", text: unsplitAfter, raw: unsplitAfter }, container);
  }

  let returnedContext = container;

  if (!isEnd) {
    const attributeList = collectAttributes(paramMatch, uuidv4(), config);
    const currContext = container.push(tag, attributeList, true);
    if (!isSelfEnding) {
      returnedContext = currContext;
    }
  } else {
    const closestRaw = container.closestRaw() ?? container;
    if (tag === closestRaw.tag) {
      returnedContext = closestRaw.parent ?? container;
    }
  }
  
  if (after) {
    returnedContext = HtmlToken({ type: "html", raw: after}, returnedContext, config);
  }

  return returnedContext;
}

export default HtmlToken;
