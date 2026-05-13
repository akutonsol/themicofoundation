import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/Contact/Contact";
import FAQ from '@/components/home/FAQ'

export default function Page() {
  return (
    <>
      <Navbar />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
