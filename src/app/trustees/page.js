import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrusteeLegacySection from "@/components/trustees/TrusteeLegacySection";
import TrusteeLeader from "@/components/trustees/TrusteeLeader";
import TeamProfileFeature from "@/components/trustees/TeamProfileFeature";
import FormerTrusteesSection from "@/components/trustees/FormerTrusteesSection";

export default function TrusteesPage() {
  return (
    <>
      <Navbar />
      <main>
        <TrusteeLegacySection />
         <TeamProfileFeature />
        <TrusteeLeader />
        <FormerTrusteesSection />
      </main>
      <Footer />
    </>
  );
}