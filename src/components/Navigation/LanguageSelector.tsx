import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { LANGUAGE_LIST, LANGUAGE_MAP } from "~/translations/config";
import { setLocaleCookie } from "~/util/dom/cookie";
import { TranslateIcon } from "~/components/Icons";

export default function LanguageSelector() {
  const { i18n, t } = useTranslation("shared");
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  type localeMapType = typeof LANGUAGE_MAP;
  type availableLanguageType = keyof localeMapType;

  const onLanguageSelect = (language: availableLanguageType) => {
    setLocaleCookie(language);
    i18n.changeLanguage(language);
    navigate("/" + [language, pathname.split("/").slice(2).join("/")].join("/") + search + hash);
  };

  return (
    <>
      
      <label>
        <TranslateIcon />
        { t("language") }
        <select value={i18n.language}
          onChange={(e) => onLanguageSelect(e.currentTarget.value as availableLanguageType)}
        >
          { LANGUAGE_LIST.map((lang) =>
            <option key={lang} value={lang}>{ lang }</option>
          )}
        </select>
      </label>
    </>
  );
}
