import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FundManagementPage from '@/components/endowments/FundManagementPage';

export const metadata = {
  title: "How Your Fund Is Managed",
  description: "How the Mico Foundation Board of Directors manages the Mico Endowment Funds.",
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <FundManagementPage />
      <Footer />
    </main>
  );
}
