import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrusteeLegacySection from "@/components/trustees/TrusteeLegacySection";
import TeamProfileFeature from "@/components/trustees/TeamProfileFeature";
import FormerTrusteesSection from "@/components/trustees/FormerTrusteesSection";
import TrusteeHistoryCTA from "@/components/trustees/TrusteeHistoryCTA";

export default function TrusteesPage() {
  return (
    <>
      <Navbar />
      <main>
        <TrusteeLegacySection />
        <TeamProfileFeature />
        <FormerTrusteesSection />
        <TrusteeHistoryCTA />
      </main>
      <Footer />
    </>
  );
}