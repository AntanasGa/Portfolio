export const getCookies = () => {
  const result: Record<string, string> = {};
  return document?.cookie.split("; ").map(x => x.split("=", 2)).reduce((acc, [k, v]) => (acc[k] = v, acc), result);
};

interface BaseSetCookieContext {
  name: string;
  value: string;
}

interface OptionalSetCookieContext {
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
}

interface SelectionMaxAgeSetCookieContext {
  /** In seconds */
  maxAge: number;
  expires: never;
}

interface SelectionExpiresSetCookieContext {
  expires: Date;
  maxAge: never;
}

type AgeSetCookieContext = Partial<SelectionExpiresSetCookieContext | SelectionMaxAgeSetCookieContext>;

export type SetCookieContext = BaseSetCookieContext & AgeSetCookieContext & Partial<OptionalSetCookieContext>;

export const setCookie = ({name, value, path, sameSite, secure, expires, maxAge}: SetCookieContext) => {
  const cookieContext = [
    `${name}=${value}`
  ];

  if (expires !== undefined) {
    cookieContext.push(`expires=${expires.toUTCString()}`)
  } else if (maxAge !== undefined && Number.isFinite(maxAge) && maxAge > 0) {
    cookieContext.push(`max-age=${maxAge}`)
  }

  if (path) {
    cookieContext.push(`path=${path}`);
  }

  if (sameSite) {
    cookieContext.push(`samesite=${sameSite}`);
  }

  if (secure) {
    cookieContext.push('secure');
  }

  if (document) {
    document.cookie = cookieContext.join("; ");
  }
};

export const resetCookie = (name: string) => {
  setCookie({name, value: "", expires: new Date(0)});
};
