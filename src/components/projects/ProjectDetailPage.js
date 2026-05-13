"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

const projects = [
  {
    slug: "buxton-college",
    status: "Active Project",
    title: "Buxton College",
    location: "Jamaica, Buxton",
    mediaType: "video",
    mediaUrl: "/videos/buxton-college.mp4",
    poster:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=2200&q=80",
    progress: 65,
    raised: "$14M",
    goal: "$20M",
    description: [
      "The Buxton College Project is a cornerstone initiative by the Mico Foundation, dedicated to preserving and restoring one of Jamaica’s most iconic historical landmarks.",
      "This project aims to fully restore the Buxton Building’s structure, renew its learning facilities, and repurpose the space into a vibrant, modern center for academic development, events, and heritage preservation.",
      "With the support of donors, alumni, and community partners, we are working to ensure that Buxton College continues to inspire and serve students and educators for decades to come.",
    ],
    donationItems: [
      "Deteriorating Roof & Ceiling",
      "Decaying Columns",
      "Rotten Doors & Windows",
      "Aged & Peeling Paint",
      "Modernize and Beautify the Building",
    ],
  },
  {
    slug: "library-renewal",
    status: "Active Project",
    title: "Library Renewal",
    location: "Jamaica, Kingston",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=80",
    progress: 40,
    raised: "$8M",
    goal: "$20M",
    description: [
      "The Library Renewal Project supports the modernization of student learning spaces and research access.",
      "The project includes furniture upgrades, digital learning resources, improved study areas, and technology-enabled academic support.",
    ],
    donationItems: [
      "Digital Resources",
      "Study Furniture",
      "Lighting Upgrades",
      "Research Support",
    ],
  },
];

export default function ProjectDetailPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || projects[0].slug;

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const project = projects[safeIndex];

  const nextProject = projects[(safeIndex + 1) % projects.length];

  return (
    <main className="bg-[#FAF9F6]">
      <section className="relative min-h-screen overflow-hidden bg-[#040617]">
        {project.mediaType === "video" ? (
          <video
            key={project.slug}
            autoPlay
            muted
            loop
            playsInline
            poster={project.poster}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          >
            <source src={project.mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={project.mediaUrl}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1650px] flex-col px-6 py-10 sm:px-10 lg:px-20">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-[16px] text-white/80 transition hover:text-[#FFD900]"
            style={inter}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>

          <div className="flex flex-1 items-end pb-12">
            <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                  className="text-[24px] font-semibold text-[#FFD900]"
                  style={inter}
                >
                  {project.status}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65 }}
                  className="mt-4 max-w-[900px] text-[74px] font-semibold leading-[0.88] tracking-[-0.08em] text-white sm:text-[110px] lg:text-[155px]"
                  style={inter}
                >
                  {project.title}
                </motion.h1>

                <div
                  className="mt-8 flex items-center gap-3 text-[20px] text-white/75"
                  style={inter}
                >
                  <MapPin className="h-5 w-5" />
                  {project.location}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="rounded-[28px] border border-white/15 bg-white/10 p-8 backdrop-blur-md"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[18px] text-white/60" style={inter}>
                      Raised
                    </p>
                    <p
                      className="text-[46px] font-semibold tracking-[-0.06em] text-white"
                      style={inter}
                    >
                      {project.raised}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[18px] text-white/60" style={inter}>
                      Goal
                    </p>
                    <p
                      className="text-[46px] font-semibold tracking-[-0.06em] text-white"
                      style={inter}
                    >
                      {project.goal}
                    </p>
                  </div>
                </div>

                <div className="mt-7 h-4 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-[#FFD900]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <p className="mt-4 text-[20px] text-white/75" style={inter}>
                  {project.progress}% funded
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p
              className="text-[18px] font-semibold uppercase tracking-[0.18em] text-[#7A7D8B]"
              style={inter}
            >
              Project Story
            </p>
            <div className="mt-5 h-[3px] w-24 bg-[#FFD900]" />
          </div>

          <div className="space-y-8">
            {project.description.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="text-[30px] leading-[1.45] tracking-[-0.04em] text-[#040617] sm:text-[38px]"
                style={inter}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#040617] px-6 py-14 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <h2
            className="text-center text-[28px] font-semibold text-white"
            style={inter}
          >
            Your Donation Will Go Towards
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {project.donationItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-[20px] text-white/90"
                style={inter}
              >
                <Check className="h-5 w-5 text-[#5EDA71]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF9F6] px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1500px] justify-end">
          <Link
            href={`/projectdetail?slug=${nextProject.slug}`}
            className="group inline-flex items-center gap-5 rounded-[22px] bg-[#FFD900] px-8 py-5 text-[20px] font-semibold text-[#040617]"
            style={inter}
          >
            Next Project
            <span className="text-[#040617]/70">{nextProject.title}</span>
            <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}