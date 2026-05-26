"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

const tabs = ["News", "Events"];

const newsItems = [
  {
    id: 1,
    slug: "lady-mico-charity-breaks-historical-barrier",
    title: "The Lady Mico Charity – Breaks Its Historical Barrier",
    excerpt:
      "The Lady Mico Charity made a significant historical change in 1984 when it invited a Jamaican citizen into the membership of its 300 year old Charity.",
    date: "04 July 2025",
    author: "The Mico Foundation",
    location: "Jamaica, Kingston",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    category: "Newsroom",
  },
  {
    id: 2,
    slug: "mico-foundation-launches-new-scholarship-program",
    title: "Mico Foundation Launches New Scholarship Program",
    excerpt:
      "The Foundation announces a new scholarship initiative supporting future educators across Jamaica.",
    date: "18 July 2025",
    author: "The Mico Foundation",
    location: "Kingston, Jamaica",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    category: "Education",
  },
  {
    id: 3,
    slug: "trustees-host-annual-community-forum",
    title: "Trustees Host Annual Community Forum",
    excerpt:
      "Trustees gathered educators, alumni, and community leaders for the annual Foundation forum.",
    date: "30 July 2025",
    author: "The Mico Foundation",
    location: "Spanish Town, Jamaica",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    category: "Community",
  },
];

const upcomingEvents = [
  {
    id: 1,
    slug: "mico-future-forward-forum-upcoming",
    title: "Mico Future Forward Forum",
    description:
      "Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow’s classrooms.",
    date: "04 July 2025",
    time: "11 AM UTC",
    location: "Jamaica, Kingston",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    badge: "Upcoming",
    badgeColor: "#FFD900",
    badgeText: "#040617",
    buttonText: "Learn More",
    href: "/upcomingevents?slug=mico-future-forward-forum-upcoming",
  },
  {
    id: 2,
    slug: "education-partners-summit-upcoming",
    title: "Education Partners Summit",
    description:
      "A gathering of education leaders, partners, and community stakeholders focused on expanding access and strengthening institutional impact.",
    date: "21 August 2025",
    time: "10 AM UTC",
    location: "Jamaica, Kingston",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    badge: "Upcoming",
    badgeColor: "#FFD900",
    badgeText: "#040617",
    buttonText: "Learn More",
    href: "/upcomingevents?slug=education-partners-summit-upcoming",
  },
];

const endedEvents = [
  {
    id: 3,
    slug: "mico-future-forward-forum",
    title: "Mico Future Forward Forum",
    description:
      "The Future Forward Forum brought together alumni, educators, students, and partners for an inspiring day of dialogue, innovation, and vision.",
    date: "04 July 2025",
    location: "Jamaica, Kingston",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    badge: "Ended",
    badgeColor: "#8D93A6",
    badgeText: "#FFFFFF",
  },
  {
    id: 4,
    slug: "mico-heritage-networking-night",
    title: "Mico Heritage Networking Night",
    description:
      "An evening of connection, legacy, and partnership celebrating the Foundation’s continued work and community impact.",
    date: "18 July 2025",
    location: "Kingston, Jamaica",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    badge: "Ended",
    badgeColor: "#8D93A6",
    badgeText: "#FFFFFF",
  },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-[240px] h-[900px] w-[620px] opacity-[0.18]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.05]"
              style={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[2%] bottom-[80px] h-[180px] w-[180px] opacity-[0.18]">
        <div className="grid h-full w-full grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.05]"
              style={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-12 flex justify-center">
      <div className="inline-flex rounded-[22px] border border-[#E5E6EB] bg-[#FFFDF9] p-1">
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-w-[180px] rounded-[18px] px-8 py-4 text-[20px] font-semibold tracking-[-0.03em] transition ${
                active ? "bg-[#FFD900] text-[#040617]" : "text-[#7A7D8B]"
              }`}
              style={inter}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NewsCard({ item }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="mb-10 rounded-[28px] border border-[#E5E6EB] bg-[#FFFDF9] p-4"
    >
      <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
        <div className="overflow-hidden rounded-[18px]">
          <div className="relative h-[260px] sm:h-[320px] lg:h-full">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />

            <div
              className="absolute left-0 top-0 flex items-center gap-2 px-5 py-3"
              style={{ backgroundColor: "#2EE66B" }}
            >
              <span
                className="text-[16px] font-semibold text-[#040617]"
                style={inter}
              >
                ✦ {item.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between px-2 py-1">
          <div>
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <p className="text-[22px] text-[#8A8E9D]" style={inter}>
                {item.date}
              </p>

              <p className="text-[18px] text-[#565B6B]" style={inter}>
                Posted by: {item.author}
              </p>
            </div>

            <h3
              className="mt-3 max-w-[900px] text-[28px] font-semibold leading-[1.05] tracking-[-0.05em] text-[#040617] sm:text-[34px] lg:text-[44px]"
              style={inter}
            >
              {item.title}
            </h3>

            <p
              className="mt-4 max-w-[980px] text-[20px] leading-[1.55] text-[#7A7D8B] sm:text-[22px]"
              style={inter}
            >
              {item.excerpt}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-end">
            <Link
              href={`/newsdetail?slug=${item.slug}`}
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#FFD900] px-7 py-3 text-[16px] font-semibold text-[#040617]"
              style={inter}
            >
              Read Full →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function UpcomingEventCard({ item }) {
  return (
    <EventLayout item={item}>
      <Link
        href={item.href}
        className="inline-flex w-fit items-center gap-2 rounded-[14px] bg-[#FFD900] px-7 py-3 text-[16px] font-semibold text-[#040617]"
        style={inter}
      >
        {item.buttonText || "Learn More"} →
      </Link>
    </EventLayout>
  );
}

function EndedEventCard({ item }) {
  return (
    <EventLayout item={item}>
      <Link
        href={`/pasteventdetails?slug=${item.slug}`}
        className="inline-flex w-fit items-center gap-2 rounded-[14px] border border-[#040617] bg-transparent px-7 py-3 text-[16px] font-semibold text-[#040617] transition hover:bg-[#040617] hover:text-white"
        style={inter}
      >
        View Event →
      </Link>
    </EventLayout>
  );
}

function EventLayout({ item, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="mb-10 rounded-[28px] border border-[#E5E6EB] bg-[#FFFDF9] p-4"
    >
      <div className="grid gap-4 lg:grid-cols-[58%_42%]">
        <div className="overflow-hidden rounded-[18px]">
          <div className="relative h-[260px] sm:h-[320px] lg:h-[420px]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />

            <div
              className="absolute left-0 top-0 flex items-center gap-2 px-5 py-3"
              style={{
                backgroundColor: item.badgeColor,
                color: item.badgeText,
              }}
            >
              <span className="text-[16px] font-semibold" style={inter}>
                ✦ {item.badge}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between px-2 py-1">
          <div>
            <h3
              className="text-[28px] font-semibold leading-[1.05] tracking-[-0.05em] text-[#040617] sm:text-[34px]"
              style={inter}
            >
              {item.title}
            </h3>

            <p
              className="mt-4 text-[20px] leading-[1.5] text-[#7A7D8B]"
              style={inter}
            >
              {item.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div
              className="flex flex-wrap items-center gap-6 text-[18px] text-[#565B6B]"
              style={inter}
            >
              <span>
                {item.date}
                {item.time ? ` (${item.time})` : ""}
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {item.location}
              </span>
            </div>

            {children}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState("News");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF9F6] px-5 py-14 sm:px-8 lg:px-12">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1560px]">
        <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === "News" ? (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3 }}
            >
              {newsItems.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3 }}
            >
              <h1
                className="mb-8 text-[44px] font-semibold leading-[1] tracking-[-0.05em] text-[#040617] sm:text-[56px] lg:text-[72px]"
                style={inter}
              >
                Upcoming Events
              </h1>

              {upcomingEvents.map((item) => (
                <UpcomingEventCard key={item.slug} item={item} />
              ))}

              <h1
                className="mb-8 mt-20 text-[44px] font-semibold leading-[1] tracking-[-0.05em] text-[#040617] sm:text-[56px] lg:text-[72px]"
                style={inter}
              >
                Ended Events
              </h1>

              {endedEvents.map((item) => (
                <EndedEventCard key={item.slug} item={item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}