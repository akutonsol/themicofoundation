import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DonationForm from "@/components/shared/DonationForm";

export const metadata = {
  title: "Donate",
  description: "Support education projects through a guided donation flow.",
};

export default function Page() {
  return (
    <main>
      <Navbar />
        <DonationForm showTitle={false} compact={true} />
      <Footer />
    </main>
  );
}

