import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";
import DonationForm from "@/components/shared/DonationForm";

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <ProjectDetailPage slug={slug} />
      <DonationForm defaultProject={slug} showTitle={false} compact={true} />
      <Footer />
    </>
  );
}