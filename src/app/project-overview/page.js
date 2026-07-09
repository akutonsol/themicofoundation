import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectOverview from "@/components/projects/ProjectOverview";

export default function ProjectOverviewPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectOverview />
      </main>
      <Footer />
    </>
  );
}
