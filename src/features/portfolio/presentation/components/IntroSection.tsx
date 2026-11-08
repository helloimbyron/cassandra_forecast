import { copy } from "@/features/Portfolio/presentation/constants/IntroSection.constant";
import { PiggyBank } from "lucide-react";

export function IntroSection() {

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
            {copy.exploraEl} <em>{copy.futuro}</em> {copy.deTuCartera}
          </h1>
          <p className="intro-copy">{copy.cargaTuCarteraEnJson}</p>
        </div>
      </div>
    </section>
  );
}
