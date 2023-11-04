import { ReactHTML } from "react";
import HrefHandler from "../Helpers/HrefHandler";
import { TokenHandler } from "../types";
import { firstOrUndefinedOf } from "../../array/Selector";
import { uuidv4 } from "../../string/Guid";
import TextToken from "./TextToken";
import Constants from "../Helpers/Constants";

function collectAttributes(attributes: string | undefined, key: string) {
  const result: Record<string, unknown> = {};
  attributes?.replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(x => x.split("=", 2))
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
  // FIXME: add configuration
    result.href = HrefHandler(result.href + "");
  }
  if (result.src) {
  // FIXME: add configuration
    result.src = HrefHandler(result.src + "");
  }
  return result
}

const HtmlToken: TokenHandler<"html"> = function (token, container) {
  const tagMatched = token.raw.match(/<\/?[^>]+\/?>/mi);
  let before = token.raw;
  let after: string | undefined;
  
  if (tagMatched?.length) {
    [before, after] = token.raw.split(tagMatched[0], 2);
  }
  
  if (before) {
    TextToken({ type: "text", text: before, raw: before }, container);
  }
  
  
  const tagMatch = firstOrUndefinedOf(tagMatched)?.match(/<(?<endtagStart>\/)?(?<descriptor>[^>\s]+)\s?(?<params>[^>]+)?>$/mi);
  
  const tag = tagMatch?.groups?.descriptor.toLowerCase() as (keyof ReactHTML) | undefined;
  let paramMatch = tagMatch?.groups?.params ?? "";
  // FIXME: add configuration
  const handleableTagList = ["a", "img"];
  const isSelfEnding = paramMatch.endsWith("/") || (tag && Constants.Elements.selfClosing.includes(tag));
  paramMatch = isSelfEnding ? paramMatch.substring(0, paramMatch.length - 2) : paramMatch;
  const isEnd = !!tagMatch?.groups?.endtagStart;

  if (!tag || !handleableTagList?.map(x => x?.toLowerCase()).includes(tag)) {
    const unsplitAfter = ((tagMatched ?? "") + (after ?? "")).replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    return TextToken({ type: "text", text: unsplitAfter, raw: unsplitAfter }, container);
  }

  let returnedContext = container;

  if (!isEnd) {
    const attributeList = collectAttributes(paramMatch, uuidv4());
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
    returnedContext = HtmlToken({ type: "html", raw: after}, returnedContext);
  }

  return returnedContext;
}

export default HtmlToken;
