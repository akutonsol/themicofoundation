"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  BadgeCheck,
  Globe,
  CalendarCheck,
  Heart,
  Handshake,
} from "lucide-react";
import { useEffect, useState } from "react";

const inter = { fontFamily: "'Inter', sans-serif" };

const heroImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
];

const helpCards = [
  { title: "Equipment", description: "Help upgrade our learning environment by contributing devices, software, or digital tools.", icon: ClipboardList },
  { title: "Construction", description: "Support our campus development by providing building services, materials, or expertise.", icon: BadgeCheck },
  { title: "Media & Outreach", description: "Assist in promoting our mission through media production, marketing support, or awareness campaigns.", icon: Globe },
  { title: "Professional Training", description: "Offer workshops, mentorship, or staff development opportunities for our educators and team.", icon: CalendarCheck },
  { title: "Health & Wellness", description: "Partner in delivering nutrition, mental health, or wellness programs for students and staff.", icon: Heart },
  { title: "Tech Collaboration", description: "Help us integrate modern tools and platforms into classrooms and operations.", icon: Handshake },
];

export default function WorkWithUsHero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[900px] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeImage}
            src={heroImages[activeImage]}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[900px] max-w-[1700px] flex-col px-6 pb-12 pt-16 sm:px-10 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-[58px] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-[82px] lg:text-[96px]"
          style={inter}
        >
          Work With Us
        </motion.h1>

        <div className="mt-auto">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-5 text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[30px]"
            style={inter}
          >
            We Appreciate Your Help In This Fields
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {helpCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 * index }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="relative overflow-hidden rounded-[18px] border border-white/45 bg-white/10 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-[14px]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
                    <div className="grid h-full w-full grid-cols-6 grid-rows-4">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className="border border-white/25"
                          style={{ borderRadius: "16px" }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/35 bg-white/10 text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3
                      className="text-[30px] font-semibold leading-[1] tracking-[-0.04em] text-white"
                      style={inter}
                    >
                      {card.title}
                    </h3>

                    <p
                      className="mt-3 text-[17px] leading-[1.45] text-white/75"
                      style={inter}
                    >
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}