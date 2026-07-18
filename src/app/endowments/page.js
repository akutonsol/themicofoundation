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
      <EndowmentLegacy variant="hero" />   {/* hero band */}
      <EndowmentHero />   {/* "Join our community" stats — moved up under the hero */}
      <EndowmentTypes />
      <MarqueeLines />
      <EndowmentLegacy variant="cards" />   {/* "A legacy shaped by you" — moved to the bottom */}
      <Footer />
    </main>
  );
}
