"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { createClient } from "@sanity/client";

const inter = { fontFamily: "'Inter', sans-serif" };
const tabs = ["News", "Events"];

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  perspective: "published",
});

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "long", year: "numeric",
    });
  } catch { return dateStr; }
}

function getItemHref(item) {
  if (item.type === "upcoming") return `/upcomingevents/${item.slug}`;
  if (item.type === "announcement") return `/announcement/${item.slug}`;
  if (item.type === "event") return `/pasteventdetails?slug=${item.slug}`;
  return `/newsdetail/${item.slug}`;
}

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-[240px] h-[900px] w-[620px] opacity-[0.18]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
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
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-w-[180px] rounded-[18px] px-8 py-4 text-[20px] font-semibold tracking-[-0.03em] transition ${
              activeTab === tab ? "bg-[#FFD900] text-[#040617]" : "text-[#7A7D8B]"
            }`}
            style={inter}
          >
            {tab}
          </button>
        ))}
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
            {item.image
              ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              : <div className="h-full w-full bg-[#E5E6EB]" />
            }
            <div className="absolute left-0 top-0 flex items-center gap-2 px-5 py-3" style={{ backgroundColor: "#2EE66B" }}>
              <span className="text-[16px] font-semibold text-[#040617]" style={inter}>
                ✦ {item.category || "Newsroom"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between px-2 py-1">
          <div>
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <p className="text-[22px] text-[#8A8E9D]" style={inter}>{item.date}</p>
              {item.author && (
                <p className="text-[18px] text-[#565B6B]" style={inter}>Posted by: {item.author}</p>
              )}
            </div>
            <h3
              className="mt-3 max-w-[900px] text-[28px] font-semibold leading-[1.05] tracking-[-0.05em] text-[#040617] sm:text-[34px] lg:text-[44px]"
              style={inter}
            >
              {item.title}
            </h3>
            <p className="mt-4 max-w-[980px] text-[20px] leading-[1.55] text-[#7A7D8B] sm:text-[22px]" style={inter}>
              {item.excerpt}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-end">
            <Link
              href={getItemHref(item)}
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

function EventLayout({ item, badge, badgeColor, badgeTextColor, children }) {
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
            {item.image
              ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              : <div className="h-full w-full bg-[#E5E6EB]" />
            }
            <div
              className="absolute left-0 top-0 flex items-center gap-2 px-5 py-3"
              style={{ backgroundColor: badgeColor, color: badgeTextColor }}
            >
              <span className="text-[16px] font-semibold" style={inter}>✦ {badge}</span>
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
            <p className="mt-4 text-[20px] leading-[1.5] text-[#7A7D8B]" style={inter}>
              {item.description || item.excerpt}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-6 text-[18px] text-[#565B6B]" style={inter}>
              <span>{item.date}{item.time ? ` (${item.time})` : ""}</span>
              {item.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {item.location}
                </span>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function UpcomingEventCard({ item }) {
  return (
    <EventLayout item={item} badge="Upcoming" badgeColor="#FFD900" badgeTextColor="#040617">
      <Link
        href={getItemHref(item)}
        className="inline-flex w-fit items-center gap-2 rounded-[14px] bg-[#FFD900] px-7 py-3 text-[16px] font-semibold text-[#040617]"
        style={inter}
      >
        Learn More →
      </Link>
    </EventLayout>
  );
}

function EndedEventCard({ item }) {
  return (
    <EventLayout item={item} badge="Ended" badgeColor="#8D93A6" badgeTextColor="#FFFFFF">
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

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState("News");
  const [newsItems, setNewsItems] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [endedEvents, setEndedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "newsEvent"] | order(date desc) {
          _id, title, "slug": slug.current, type, date, location,
          excerpt, description, time, category, author, isFeatured,
          "image": coalesce(featuredImage.asset->url, thumbnailImage.asset->url)
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          const fmt = data.map((item) => ({
            ...item,
            date: formatDate(item.date),
          }));
          setNewsItems(fmt.filter((i) => i.type === "news" || i.type === "newsroom" || !i.type));
          setUpcomingEvents(fmt.filter((i) => i.type === "upcoming"));
          setEndedEvents(fmt.filter((i) => i.type === "event" || i.type === "ended"));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("NewsEventsPage fetch error:", err);
        setLoading(false);
      });
  }, []);

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
              {loading ? (
                <p className="text-center text-[20px] text-[#8A8E9D]" style={inter}>Loading...</p>
              ) : newsItems.length === 0 ? (
                <p className="text-center text-[20px] text-[#8A8E9D]" style={inter}>No news articles yet.</p>
              ) : (
                newsItems.map((item) => <NewsCard key={item.slug || item._id} item={item} />)
              )}
            </motion.div>
          ) : (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="mb-8 text-[44px] font-semibold leading-[1] tracking-[-0.05em] text-[#040617] sm:text-[56px] lg:text-[72px]"
                style={inter}
              >
                Upcoming Events
              </h2>
              {loading ? (
                <p className="text-[20px] text-[#8A8E9D]" style={inter}>Loading...</p>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-[20px] text-[#8A8E9D]" style={inter}>No upcoming events.</p>
              ) : (
                upcomingEvents.map((item) => <UpcomingEventCard key={item.slug || item._id} item={item} />)
              )}

              <h2
                className="mb-8 mt-20 text-[44px] font-semibold leading-[1] tracking-[-0.05em] text-[#040617] sm:text-[56px] lg:text-[72px]"
                style={inter}
              >
                Ended Events
              </h2>
              {loading ? (
                <p className="text-[20px] text-[#8A8E9D]" style={inter}>Loading...</p>
              ) : endedEvents.length === 0 ? (
                <p className="text-[20px] text-[#8A8E9D]" style={inter}>No ended events yet.</p>
              ) : (
                endedEvents.map((item) => <EndedEventCard key={item.slug || item._id} item={item} />)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}