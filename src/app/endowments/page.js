import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EndowmentLegacy from '@/components/endowments/EndowmentLegacy';
import EndowmentHero from '@/components/endowments/EndowmentHero';
import MarqueeLines    from '@/components/home/MarqueeLines'  // ← reused directly
import EndowmentTypes from '@/components/endowments/EndowmentTypes';

export default function EndowmentPage() {
  return (
    <main>
      <Navbar />
      <EndowmentLegacy />   {/* hero + cards section (under the banner) */}
      <EndowmentTypes />
      <MarqueeLines />
      <EndowmentHero />   {/* stats section at the bottom */}
      <Footer />
    </main>
  );
}
