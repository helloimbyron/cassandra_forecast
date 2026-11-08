import "i18next";
import es from "./es.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: typeof es };
    returnNull: false;
  }
}
