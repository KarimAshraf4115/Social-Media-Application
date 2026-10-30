import { Helmet } from "react-helmet";
import LandingCta from "../../components/Landing/LandingCta";
import LandingFeatures from "../../components/Landing/LandingFeatures";
import LandingHero from "../../components/Landing/LandingHero";
import LandingMarquee from "../../components/Landing/LandingMarquee";
import LandingSteps from "../../components/Landing/LandingSteps";

/* Navbar and Footer come from <Layout />, so this page only renders content. */
export default function Landing() {
  return (
    <main className="relative isolate overflow-hidden">
      <Helmet>
        <title>Social App — Where your people gather</title>
      </Helmet>

      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-36 -z-10 size-[560px] animate-drift rounded-full bg-clay/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-[420px] -z-10 size-[480px] animate-drift rounded-full bg-sage/15 blur-3xl [animation-delay:-6s] [animation-direction:reverse]"
      />

      <LandingHero />
      <LandingMarquee />
      <LandingFeatures />
      <LandingSteps />
      <LandingCta />
    </main>
  );
}
