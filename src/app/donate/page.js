import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DonatePageClient from "@/components/shared/DonatePageClient";

export const metadata = {
  title: "Donate",
  description: "Support education projects through a guided donation flow.",
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <DonatePageClient />
      <Footer />
    </main>
  );
}
