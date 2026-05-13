import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsDetailPage from "@/components/news/NewsDetailPage";

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <NewsDetailPage slug={slug} />
      <Footer />
    </>
  );
}