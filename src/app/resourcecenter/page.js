import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/ResourceCenter/HeroSection";
import DownloadableForms from "@/components/ResourceCenter/DownloadableForms";

export default function Page() {
  return (
    <>
      <Navbar />
      {/*}  <HeroSection /> >*/}
        <DownloadableForms />
      <Footer />
    </>
  );
}