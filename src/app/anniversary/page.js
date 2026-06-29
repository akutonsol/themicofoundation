import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnniversaryPage from "@/components/shared/AnniversaryPage";

export const metadata = {
  title: "190 Years — The Mico University College",
  description: "Celebrating 190 years of excellence in education, leadership, and nation-building.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <AnniversaryPage />
      <Footer />
    </>
  );
}
