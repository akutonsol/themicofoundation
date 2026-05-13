import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UpcomingEventDetails from "@/components/news/UpcomingEventDetails";

export default function Page() {
  return (
    <>
      <Navbar />
      <UpcomingEventDetails />
      <Footer />
    </>
  );
}