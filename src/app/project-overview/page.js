import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectOverview from "@/components/projects/ProjectOverview";
import { client, queries } from "@/sanity/lib/sanity";

export const dynamic = "force-dynamic";

export default async function ProjectOverviewPage() {
  const [overview, projects] = await Promise.all([
    client.fetch(queries.projectOverview),
    client.fetch(queries.projects),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <ProjectOverview overview={overview} projects={projects} />
      </main>
      <Footer />
    </>
  );
}
