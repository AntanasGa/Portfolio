
export interface LinkConfiguration {
  baseUri?: string;
  navLink?: NavLinkConfiguration;
  onClick?: React.EventHandler<HTMLAnchorElement>;
}

export interface NavLinkConfiguration {
  disableNavLink?: boolean;
  baseLink?: string;
}
