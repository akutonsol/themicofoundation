"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, BadgeCheck, Globe, CalendarCheck, Heart, Handshake, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticHeroImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
];

const staticCards = [
  { title: "Equipment", description: "Help upgrade our learning environment by contributing devices, software, or digital tools.", icon: "clipboard" },
  { title: "Construction", description: "Support our campus development by providing building services, materials, or expertise.", icon: "badge" },
  { title: "Media & Outreach", description: "Assist in promoting our mission through media production, marketing support, or awareness campaigns.", icon: "globe" },
  { title: "Professional Training", description: "Offer workshops, mentorship, or staff development opportunities for our educators and team.", icon: "calendar" },
  { title: "Health & Wellness", description: "Partner in delivering nutrition, mental health, or wellness programs for students and staff.", icon: "heart" },
  { title: "Tech Collaboration", description: "Help us integrate modern tools and platforms into classrooms and operations.", icon: "handshake" },
];

const ICON_MAP = {
  clipboard: ClipboardList,
  badge: BadgeCheck,
  globe: Globe,
  calendar: CalendarCheck,
  heart: Heart,
  handshake: Handshake,
  book: BookOpen,
  users: Users,
};

export default function WorkWithUsHero() {
  const [activeImage, setActiveImage] = useState(0);
  const [heroImages, setHeroImages] = useState(staticHeroImages);
  const [cards, setCards] = useState(staticCards);
  const [heading, setHeading] = useState("Work With Us");
  const [cardsHeading, setCardsHeading] = useState("We Appreciate Your Help In This Fields");

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.workWithUs);
        if (data) {
          if (data.heading) setHeading(data.heading);
          if (data.cardsHeading) setCardsHeading(data.cardsHeading);
          if (data.heroImages?.length > 0) {
            setHeroImages(data.heroImages.map(img => urlFor(img).width(2200).url()));
          }
          if (data.helpCards?.length > 0) {
            setCards(data.helpCards.map(c => ({
              title: c.title,
              description: c.description,
              icon: c.icon || 'globe',
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching work with us content:', error);
      }
    }
    fetchContent();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-[58px] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-[82px] lg:text-[96px]"
          style={inter}
        >
          {heading}
        </motion.h1>

        <div className="mt-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#f3af19]"
            style={inter}
          >
            <span className="inline-block h-[2px] w-7 bg-[#f3af19]" />
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-5 text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[30px]"
            style={inter}
          >
            {cardsHeading}
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = ICON_MAP[card.icon] || Globe;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 * index }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="relative overflow-hidden rounded-[18px] border border-white/45 bg-white/10 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-[14px]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
                    <div className="grid h-full w-full grid-cols-6 grid-rows-4">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="border border-white/25" style={{ borderRadius: "16px" }} />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/35 bg-white/10 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-[30px] font-semibold leading-[1] tracking-[-0.04em] text-white" style={inter}>{card.title}</h3>
                    <p className="mt-3 text-[17px] leading-[1.45] text-white/75" style={inter}>{card.description}</p>
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