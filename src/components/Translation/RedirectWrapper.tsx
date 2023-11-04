import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate, useRouteError } from "react-router-dom";
import { DEFAULT_LANGUAGE } from "../../translations/config";
import { firstOrUndefinedOf } from "../../util/array/Selector";
import { getCookies, setCookie } from "../../util/dom/cookie";

function RedirectWrapper() {
  const error = useRouteError();

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { locale = "" } = getCookies();
    const selectedLanguage = (firstOrUndefinedOf(i18n.languages.filter(x => x.toLowerCase() === locale?.toLowerCase())) ?? DEFAULT_LANGUAGE).toLowerCase();
    
    if (locale.toLocaleLowerCase() !== selectedLanguage) {
      setCookie({ name: "locale", value: selectedLanguage, path: "/", sameSite: "lax" });
    }

    i18n.changeLanguage(selectedLanguage);
    if (!location.pathname || location.pathname === "/") {
      navigate(`/${selectedLanguage}`);
    }

  }, [navigate, i18n, error, location]);
  return <Outlet />;
}

export default RedirectWrapper;
