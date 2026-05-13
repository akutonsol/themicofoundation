"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

const projects = [
  {
    id: 1,
    category: "Scholarships",
    title: "Student Scholarship Fund",
    description:
      "Opening access to education through tuition assistance, books, meals, transportation, and academic support initiatives.",
    fullDescription:
      "The Student Scholarship Fund provides comprehensive financial support to deserving students pursuing higher education. We cover tuition fees, textbooks, meals, transportation costs, and provide academic mentorship programs. Our initiative ensures that financial barriers never stand between talented students and their educational dreams. Through partnerships with educational institutions and community organizations, we've helped hundreds of students achieve their academic goals and build successful careers.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80",
    href: "/projects",
  },
  {
    id: 2,
    category: "Historic Restoration",
    title: "Buxton College Restoration",
    description:
      "Preserving heritage architecture connected to The Mico legacy while creating renewed educational spaces for future generations.",
    fullDescription:
      "The Buxton College Restoration project honors our rich educational heritage by preserving and modernizing historic campus buildings. This initiative combines architectural preservation with modern educational infrastructure, creating spaces that respect our past while serving future generations. We're restoring original facades, updating learning facilities, and ensuring these historic structures remain functional educational spaces for decades to come.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80",
    href: "/projectdetail?slug=buxton-college",
  },
  {
    id: 3,
    category: "Campus Development",
    title: "Campus Modernization",
    description:
      "Creating modern classrooms, upgraded facilities, smart learning spaces, and improved educational infrastructure.",
    fullDescription:
      "Our Campus Modernization initiative transforms traditional learning environments into state-of-the-art educational facilities. We're implementing smart classroom technology, creating collaborative learning spaces, upgrading laboratories, and building sustainable infrastructure. This project ensures our students have access to world-class facilities that prepare them for the demands of modern education and future careers in an increasingly digital world.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
    href: "/projects",
  },
  {
    id: 4,
    category: "Community Impact",
    title: "Community Learning Programs",
    description:
      "Supporting outreach, inclusive learning initiatives, rural education programs, and community-centered development.",
    fullDescription:
      "Community Learning Programs extend educational opportunities beyond traditional campus boundaries. We operate mobile learning centers, provide adult education classes, support rural schools, and create inclusive programs for underserved communities. Through partnerships with local organizations, we're building a network of learning opportunities that strengthens entire communities and creates pathways to education for all, regardless of location or background.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80",
    href: "/projects",
  },
];

export default function FoundationProjectsDeck() {
  const [active, setActive] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleViewProject = (e, projectId) => {
    e.stopPropagation();
    setExpandedCard(projectId);
  };

  const handleCloseCard = () => {
    setExpandedCard(null);
    // Move the expanded card to the back of the deck
    setActive((projects.length - 1 + active) % projects.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#004C43] px-6 py-24 sm:px-10 lg:px-16">
      {/* BACKGROUND GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="grid h-full w-full grid-cols-12">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-[#FFFDF7]" />
          ))}
        </div>
      </div>

      {/* FLOATING ACCENTS */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[6%] top-[10%] text-[44px] text-[#FFD900]"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[8%] top-[20%] text-[44px] text-[#FFD900]"
      >
        ✦
      </motion.div>

      <div className="relative mx-auto max-w-[1700px]">
        {/* HEADER */}
        <div className="mb-20 max-w-[980px]">
          <p
            className="mb-5 text-[16px] uppercase tracking-[0.24em] text-[#FFD900]"
            style={inter}
          >
            Foundation Initiatives
          </p>

          <h2
            className="text-[68px] font-semibold leading-[0.9] tracking-[-0.08em] text-[#FFFDF7] sm:text-[92px] lg:text-[120px]"
            style={inter}
          >
            Building The Future Through Projects.
          </h2>

          <p
            className="mt-8 max-w-[780px] text-[22px] leading-[1.6] text-white/70 sm:text-[26px]"
            style={inter}
          >
            Explore transformational initiatives supporting education,
            restoration, community development, and the future of The Mico
            Foundation.
          </p>
        </div>

        {/* STACKED CARD EXPERIENCE */}
        <div className="relative h-[820px]">
          {projects.map((project, index) => {
            const isActive = index === active;
            const offset = index - active;
            const isExpanded = expandedCard === project.id;

            return (
              <motion.div
                key={project.id}
                animate={{
                  scale: isExpanded ? 1 : 1 - Math.abs(offset) * 0.04,
                  y: isExpanded ? 0 : offset * 36,
                  x: isExpanded ? 0 : offset * 24,
                  rotateZ: isExpanded ? 0 : offset * -1.5,
                  opacity: isExpanded ? 1 : Math.abs(offset) > 3 ? 0 : 1,
                  zIndex: isExpanded ? 100 : 20 - Math.abs(offset),
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 top-0 h-full w-full"
              >
                <motion.div
                  whileHover={{
                    scale: isActive && !isExpanded ? 1.01 : 1,
                  }}
                  className={`relative flex h-full overflow-hidden rounded-[38px] border border-white/10 bg-[#0A2E29] shadow-2xl ${
                    isActive && !isExpanded ? "cursor-default" : isExpanded ? "cursor-default" : "cursor-pointer"
                  }`}
                  onClick={() => !isExpanded && setActive(index)}
                >
                  {/* IMAGE SIDE */}
                  <div className="relative w-[58%] overflow-hidden">
                    <motion.div
                      animate={{
                        scale: isActive || isExpanded ? 1.04 : 1,
                      }}
                      transition={{
                        duration: 1.2,
                        ease: "easeOut",
                      }}
                      className="h-full w-full"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="60vw"
                        priority={index === 0}
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A2E29]" />

                    <div className="absolute left-8 top-8">
                      <div className="rounded-full border border-[#FFD900]/40 bg-[#FFD900]/10 px-5 py-2 backdrop-blur-sm">
                        <p
                          className="text-[13px] uppercase tracking-[0.18em] text-[#FFD900]"
                          style={inter}
                        >
                          {project.category}
                        </p>
                      </div>
                    </div>

                    {/* Close button when expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          onClick={handleCloseCard}
                          className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20"
                        >
                          <X className="h-6 w-6 text-white" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CONTENT SIDE */}
                  <div className="relative flex w-[42%] flex-col justify-between p-10 lg:p-14">
                    <div>
                      <div className="mb-10 flex items-center justify-between">
                        <div
                          className="text-[18px] tracking-[0.12em] text-white/40"
                          style={inter}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="h-[1px] w-[120px] bg-white/10" />
                      </div>

                      <AnimatePresence mode="wait">
                        {(isActive || isExpanded) && (
                          <motion.div
                            key={`${project.id}-${isExpanded ? 'expanded' : 'normal'}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{
                              duration: 0.65,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <h3
                              className="text-[58px] font-semibold leading-[0.92] tracking-[-0.06em] text-[#FFFDF7] lg:text-[72px]"
                              style={inter}
                            >
                              {project.title}
                            </h3>

                            <p
                              className="mt-8 max-w-[520px] text-[22px] leading-[1.65] text-white/70"
                              style={inter}
                            >
                              {isExpanded ? project.fullDescription : project.description}
                            </p>

                            {/* Additional buttons when expanded */}
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="mt-8 flex gap-4"
                              >
                                <motion.a
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                  href="/endowments"
                                  className="inline-flex items-center gap-3 rounded-full border-2 border-[#FFD900] bg-transparent px-7 py-4 text-[14px] font-bold uppercase tracking-[0.08em] text-[#FFD900] no-underline transition-colors hover:bg-[#FFD900] hover:text-[#040617]"
                                  style={inter}
                                >
                                  Endowments
                                  <ArrowUpRight className="h-5 w-5" />
                                </motion.a>

                                <motion.a
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                  href="/donate"
                                  className="inline-flex items-center gap-3 rounded-full bg-[#FFD900] px-7 py-4 text-[14px] font-bold uppercase tracking-[0.08em] text-[#040617] no-underline"
                                  style={inter}
                                >
                                  Donate Now
                                  <ArrowUpRight className="h-5 w-5" />
                                </motion.a>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* FOOTER */}
                    {!isExpanded && (
                      <div className="flex items-end justify-between">
                        <div className="flex gap-2">
                          {projects.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={() => setActive(dotIndex)}
                              className={`h-3 rounded-full transition-all duration-300 ${
                                dotIndex === active
                                  ? "w-12 bg-[#FFD900]"
                                  : "w-3 bg-white/20"
                              }`}
                            />
                          ))}
                        </div>

                        <motion.button
                          whileHover={{
                            scale: 1.04,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          onClick={(e) => handleViewProject(e, project.id)}
                          className="inline-flex items-center gap-3 rounded-full bg-[#FFD900] px-7 py-4 text-[14px] font-bold uppercase tracking-[0.08em] text-[#040617] no-underline"
                          style={inter}
                        >
                          View Project
                          <ArrowUpRight className="h-5 w-5" />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* GLOW */}
                  <div className="pointer-events-none absolute inset-0 rounded-[38px] ring-1 ring-white/5" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}