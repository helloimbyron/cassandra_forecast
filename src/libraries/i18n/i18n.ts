import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import { CURRENT_LANGUAGE } from "./locale";

i18next.use(initReactI18next).init({
  resources: { [CURRENT_LANGUAGE]: { translation: es } },
  lng: CURRENT_LANGUAGE,
  fallbackLng: CURRENT_LANGUAGE,
  supportedLngs: [CURRENT_LANGUAGE],
  initAsync: false,
  returnNull: false,
  returnEmptyString: true,
  interpolation: { escapeValue: false },
});

export const i18n = i18next;
export const t = i18next.t.bind(i18next);
