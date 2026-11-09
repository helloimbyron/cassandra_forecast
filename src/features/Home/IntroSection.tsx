import "./IntroSection.css.ts";
import { PiggyBank } from "lucide-react";
import { useTranslation } from "react-i18next";

export function IntroSection() {
  const { t } = useTranslation();

  return (
    <section className="intro-section" aria-labelledby="onboarding-title">
      <div className="intro-grid">
        <div className="intro-content">
          <div className="intro-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-core">
              <PiggyBank className="icon-lg" />
            </div>
          </div>
          <h1 id="onboarding-title">
            {t("home.introSection.copy.exploraEl.p1")}{" "}
            <em>{t("home.introSection.copy.futuro.p1")}</em>{" "}
            {t("home.introSection.copy.deTuCartera.p1")}
          </h1>
          <p className="intro-copy">{t("home.introSection.copy.cargaTuCarteraEnJson.p1")}</p>
        </div>
      </div>
    </section>
  );
}
