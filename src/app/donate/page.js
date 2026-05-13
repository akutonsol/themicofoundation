import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DonatePage from "@/components/donate/DonatePage";

export const metadata = {
  title: "Donate",
  description: "Support education projects through a guided donation flow.",
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <DonatePage /> 
      <Footer />
    </main>
  );
}

