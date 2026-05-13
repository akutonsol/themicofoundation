import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessagesDetail from "@/components/messages/MessagesDetail";

export default function Page() {
  return (
    <>
      <Navbar />
      <MessagesDetail />
      <Footer />
    </>
  );
}