import * as veIntroSectionStyles from "./IntroSection.css.ts";
import { PiggyBank } from "lucide-react";
import { useTranslation } from "react-i18next";

export function IntroSection() {
  const { t } = useTranslation();

  return (
    <section className={veIntroSectionStyles.introSection} aria-labelledby="onboarding-title">
      <div className={veIntroSectionStyles.introGrid}>
        <div className={veIntroSectionStyles.introContent}>
          <div className={veIntroSectionStyles.introOrbit} aria-hidden="true">
            <div
              className={[veIntroSectionStyles.orbit, veIntroSectionStyles.orbitOne, "orbit"]
                .filter(Boolean)
                .join(" ")}
            />
            <div
              className={[veIntroSectionStyles.orbit, veIntroSectionStyles.orbitTwo, "orbit"]
                .filter(Boolean)
                .join(" ")}
            />
            <div className={veIntroSectionStyles.orbitCore}>
              <PiggyBank className="icon-lg" />
            </div>
          </div>
          <h1 id="onboarding-title">
            {t("home.introSection.copy.exploraEl.p1")}{" "}
            <em>{t("home.introSection.copy.futuro.p1")}</em>{" "}
            {t("home.introSection.copy.deTuCartera.p1")}
          </h1>
          <p className={veIntroSectionStyles.introCopy}>
            {t("home.introSection.copy.cargaTuCarteraEnJson.p1")}
          </p>
        </div>
      </div>
    </section>
  );
}
