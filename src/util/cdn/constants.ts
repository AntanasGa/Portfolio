export const HOST = import.meta.env.DEV ? new URL("/cdn/", window.location.origin) : new URL("https://cdn.antanasga.lt/");
