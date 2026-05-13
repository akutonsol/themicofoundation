import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutUs from "@/components/about/AboutUs";
import Chairmen from "@/components/about/Chairmen";
import SecretaryManager from "@/components/about/SecretaryManager";
import AboutVideo from "@/components/about/AboutVideo";
import Mission from '@/components/home/Mission'

export default function Page() {
  return (
    <>
      <Navbar />
      <AboutUs />
        <AboutVideo />
         <Mission />
      <Chairmen />
      <SecretaryManager />
      <Footer />
    </>
  );
}