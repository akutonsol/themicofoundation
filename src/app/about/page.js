import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutUs from "@/components/about/AboutUs";
import FoundationVideo from "@/components/about/FoundationVideo";
import OurMission from "@/components/about/OurMission";
import Chairmen from "@/components/about/Chairmen";
import SecretaryManager from "@/components/about/SecretaryManager";
import MagazineSection from "@/components/about/MagazineSection"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutUs />
        <FoundationVideo />
          <OurMission />
        <Chairmen />
        <SecretaryManager />
        <MagazineSection />
      </main>
      <Footer />
    </>
  );
}
 