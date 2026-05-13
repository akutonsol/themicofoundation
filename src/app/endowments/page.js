import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EndowmentHero from '@/components/endowments/EndowmentHero';
import MarqueeLines    from '@/components/home/MarqueeLines'  // ← reused directly
import PartnerSupport from '@/components/endowments/PartnerSupport';
import EndowmentTypes from '@/components/endowments/EndowmentTypes';

export default function EndowmentPage() {
  return (
    <main>
      <Navbar />
      <EndowmentHero />
        <MarqueeLines />   {/* ← same component, same design */}
   
       <EndowmentTypes />   
 
      <Footer />
    </main>
  );
}

