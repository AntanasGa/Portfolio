import i18next, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import lt from "./lt";
import en from "./en";
import { DEFAULT_LANGUAGE, LANGUAGE_LIST } from "./config";

const resourceMap = {
  lt: lt,
  en: en,
// forcing stricter translation
} as unknown as Resource;

i18next
  .use(initReactI18next)
  .init({
    resources: resourceMap,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGE_LIST,
    interpolation: {
      escapeValue: false,
    },
  })
