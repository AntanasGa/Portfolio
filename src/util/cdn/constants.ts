export const HOST = import.meta.env.DEV ? new URL("/cdn/", window.location.origin) : new URL("https://cdn.antanasga.lt/");
/** `${cdn}/content/` */
export const CONTENT = new URL("content/", HOST);
