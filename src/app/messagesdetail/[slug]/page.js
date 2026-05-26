import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessageDetail from "@/components/messages/MessageDetail";

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <MessageDetail slug={slug} />
      <Footer />
    </>
  );
}