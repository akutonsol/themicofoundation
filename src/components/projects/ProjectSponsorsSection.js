"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@sanity/client";

const inter = { fontFamily: "'Inter', sans-serif" };

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  perspective: "published",
});

const staticProjects = [
  { id: 1, title: "Student Scholarship Fund", description: "Supporting deserving students through scholarships, tuition assistance, educational supplies, and access to academic opportunity.", image: null },
  { id: 2, title: "Historic Restoration", description: "Preserving the historical legacy of The Mico through restoration, conservation, and infrastructure renewal projects.", image: null },
  { id: 3, title: "Campus Development", description: "Improving learning environments, classrooms, technology infrastructure, and campus spaces for future generations.", image: null },
  { id: 4, title: "Community Outreach", description: "Expanding educational access and community-centered initiatives across Jamaica and the wider Caribbean.", image: null },
];

function AccordionItem({ project, isOpen, onToggle, isHovered, onHover, onLeave }) {
  return (
    <div className="relative border-b border-white/10" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button type="button" onClick={onToggle} className="w-full py-8 text-left">
        <div className="grid grid-cols-[1fr_60px] items-start gap-8">
          <div>
            <h3 className="text-[42px] font-semibold leading-[1] tracking-[-0.05em] text-[#FFD900] sm:text-[54px]" style={inter}>
              {project.title}
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 max-w-[760px] overflow-hidden text-[22px] leading-[1.6] text-white/75"
                  style={inter}
                >
                  {project.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-14 w-14 items-center justify-center text-[38px] font-light text-[#FFD900]"
            style={inter}
          >
            +
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isHovered && project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            style={{ width: "360px", right: "40px" }}
          >
            <div className="relative aspect-[1.15/1] overflow-hidden rounded-[14px] border border-[#FFD900]/25 shadow-2xl">
              <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectSponsorsSection() {
  const [openId, setOpenId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [projects, setProjects] = useState(staticProjects);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "projectInitiative"] | order(order asc) { _id, title, description, "image": image.asset->url }')
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data.map(p => ({
            id: p._id,
            title: p.title,
            description: p.description || "",
            image: p.image || null,
          })));
        }
      })
      .catch(err => console.error("ProjectSponsorsSection fetch error:", err));
  }, []);

  const toggleItem = (id) => setOpenId(openId === id ? null : id);

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-24 sm:px-10 md:px-16 lg:px-20 lg:py-32"
      style={{ background: "linear-gradient(160deg, #020C1B 0%, #001A2E 50%, #020C1B 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="grid h-full w-full grid-cols-12 grid-rows-8">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-[#FFFDF7]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <div className="absolute left-[5%] top-[10%] text-[42px] text-[#FFD900]">✦</div>
      <div className="absolute right-[7%] top-[16%] text-[42px] text-[#FFD900]">✦</div>
      <div className="absolute left-[10%] bottom-[14%] text-[42px] text-[#FFD900]">✦</div>
      <div className="relative mx-auto max-w-[1750px]">
        <div className="mb-20 max-w-[980px]">
          <p style={{ ...inter, fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFD900", margin: "0 0 20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#FFD900" }} />
            All Projects
          </p>
          <h2 className="text-[76px] font-semibold leading-[0.9] tracking-[-0.08em] text-[#FFFDF7] sm:text-[110px]" style={inter}>
            Foundation Projects
          </h2>
          <p className="mt-6 max-w-[760px] text-[26px] leading-[1.5] text-white/70" style={inter}>
            Explore the educational, restoration, and community-centered initiatives helping shape the future of The Mico Foundation.
          </p>
        </div>
        <div className="border-t border-white/10">
          {projects.map((project) => (
            <AccordionItem
              key={project.id}
              project={project}
              isOpen={openId === project.id}
              onToggle={() => toggleItem(project.id)}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
