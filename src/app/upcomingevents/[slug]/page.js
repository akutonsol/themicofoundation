import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UpcomingEventDetails from "@/components/news/UpcomingEventDetails";

export default async function Page({ params }) {
  const { slug } = await params;  {/* ✅ extract slug first */}
  return (
    <>
      <Navbar />
      <UpcomingEventDetails slug={slug} />
      <Footer />
    </>
  );
}