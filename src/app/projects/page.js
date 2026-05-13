import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
  
import MarqueeLines    from '@/components/home/MarqueeLines'  // ← reused directly
import ActiveProjectsSection from "@/components/projects/ActiveProjectsSection";
import CompletedProjectsSection from "@/components/projects/CompletedProjectsSection";
import ProjectSponsors from "@/components/projects/ProjectSponsors";


export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Navbar />
         <ActiveProjectsSection />
            {/* ← same component, same design */}
              
              <CompletedProjectsSection />
 <ProjectSponsors />
   <MarqueeLines />  
            <Footer />
    </main>
  );
}