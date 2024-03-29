import { i18n } from "i18next";

export default function getPath(i18n: i18n, ...args: string[]) {
  return `/${i18n.language}/${args.join("/")}`;
}
