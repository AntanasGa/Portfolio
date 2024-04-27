import { NavLinkConfiguration } from "../TokenModels/types/Link";

export default function isNavHref(link: string, navConfig?: NavLinkConfiguration) {
  return link.startsWith('@') && !navConfig?.disableNavLink;
}
