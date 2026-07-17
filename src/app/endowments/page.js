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
      <EndowmentLegacy />   {/* ← new top section */}
      <EndowmentTypes />
      <MarqueeLines />   {/* ← same component, same design */}
      <EndowmentHero />   {/* ← moved to the bottom */}
      <Footer />
    </main>
  );
}
