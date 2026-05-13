import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormerTrusteesSection from "@/components/trustees/FormerTrusteesSection";
import CurrentTrusteesSection from "@/components/trustees/CurrentTrusteesSection";
import TrusteeLegacy from "@/components/trustees/TrusteeLegacy";

export default function TrusteesPage() {
  return (
    <>
      <Navbar variant="dark" />
      
      <FormerTrusteesSection />
      <CurrentTrusteesSection />
      <TrusteeLegacy />
 
      <Footer />
    </>
  );
}