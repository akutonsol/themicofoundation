import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";
import DonationForm from '@/components/home/DonationForm'

export default function Page() {
  return (
    <>
      <Navbar />
      <ProjectDetailPage />
       <DonationForm />
      <Footer />
    </>
  );
}