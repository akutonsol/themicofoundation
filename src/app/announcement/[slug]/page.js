import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementDetailPage from "@/components/news/AnnouncementDetailPage";

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <>
      <Navbar />

  <AnnouncementDetailPage slug={slug} />   

      <Footer />
    </>
  );
}