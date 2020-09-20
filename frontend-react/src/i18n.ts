import { initReactI18next } from "components/root/node_modules/react-i18next";
import i18n from "components/user/node_modules/i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    keySeparator: ";",
    returnEmptyString: false,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
