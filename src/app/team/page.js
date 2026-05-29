import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BoardOfDirectorsSection from "@/components/team/BoardOfDirectorsSection";
import StaffSection from "@/components/team/StaffSection";

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF9F6] px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <BoardOfDirectorsSection />
          <StaffSection />
        </div>
      </main>
      <Footer />
    </>
  );
}