import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FoundationProjectsDeck from "@/components/projects/FoundationProjectsDeck"
import CompletedProjectsSection from "@/components/projects/CompletedProjectsSection"
import ProjectSponsorsSection from "@/components/projects/ProjectSponsorsSection"


export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Navbar />
         <FoundationProjectsDeck />
           <CompletedProjectsSection />
        <ProjectSponsorsSection />
      
            <Footer />
    </main>
  );
}