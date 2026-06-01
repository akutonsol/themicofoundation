import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsEventsPage from "@/components/news/NewsEventsPage";

export default function Page() {
  return (
    <>
      <Navbar />
      <NewsEventsPage  />
      <Footer />
    </>
  );
}