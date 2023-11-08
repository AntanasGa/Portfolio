import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import { DEFAULT_LANGUAGE, LANGUAGE_LIST } from "../../translations/config";
import { getCookies, setCookie } from "../../util/dom/cookie";
import RouterError from "../../util/router/RouterError";
import RouterErrorContext from "../../util/router/RouterErrorContext";

function LocalePathPickerMiddleware() {
  const [ _, setError ] = useContext(RouterErrorContext) ?? [undefined, undefined];
  const { i18n } = useTranslation();
  const { locale } = useParams();

  useEffect(() => {
    const { locale: cookieLanguage = "" } = getCookies();
    const paramLanguage = LANGUAGE_LIST.find(x => locale?.toLowerCase() === x.toLowerCase());
    const cookieExistingLanguage = LANGUAGE_LIST.find(x => cookieLanguage.toLowerCase() === x.toLowerCase());
    const selectedLanguage = (paramLanguage ?? cookieExistingLanguage ?? DEFAULT_LANGUAGE).toLowerCase();
    
    if (cookieLanguage.toLowerCase() != selectedLanguage) {
      setCookie({ name: "locale", value: selectedLanguage, path: "/", sameSite: "lax" });
    }

    i18n.changeLanguage(selectedLanguage);

    if (!paramLanguage) {
      setError?.(new RouterError("Locale not found", 404));
    }
  }, [locale, i18n, setError]);
  return <Outlet />;
}

export default LocalePathPickerMiddleware;
