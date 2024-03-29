import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate, useRouteError } from "react-router-dom";
import { DEFAULT_LANGUAGE, LANGUAGE_LIST } from "~/translations/config";
import { firstOrUndefinedOf } from "~/util/array/Selector";
import { getCookies, setLocaleCookie } from "~/util/dom/cookie";

function RootLocaleSetterMiddleware() {
  const error = useRouteError();

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { locale = "" } = getCookies();
    const selectedLanguage = firstOrUndefinedOf(LANGUAGE_LIST.filter(x => x.toLowerCase() === locale.toLowerCase())) ?? DEFAULT_LANGUAGE;
    
    if (locale.toLocaleLowerCase() !== selectedLanguage) {
      setLocaleCookie(selectedLanguage);
    }

    i18n.changeLanguage(selectedLanguage);
    if (!location.pathname || location.pathname === "/") {
      navigate(`/${selectedLanguage}`);
    }

  }, [navigate, i18n, error, location]);
  return <Outlet />;
}

export default RootLocaleSetterMiddleware;
