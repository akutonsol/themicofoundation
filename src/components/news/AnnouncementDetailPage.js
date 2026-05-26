"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bell, Calendar, Tag } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

// Fallback static data
const staticAnnouncements = [
  {
    id: 1,
    slug: "mico-foundation-annual-scholarship-2025",
    title: "MICO Foundation Opens Annual Scholarship Applications for 2025",
    category: "Scholarship",
    date: "24 May 2025",
    excerpt: "The MICO Foundation is pleased to announce the opening of applications for its 2025 Annual Scholarship Programme.",
    content: `The MICO Foundation is pleased to announce the opening of applications for its 2025 Annual Scholarship Programme. This initiative supports outstanding Jamaican students pursuing careers in education, community development, and the social sciences.\n\nEligible applicants must be Jamaican nationals currently enrolled in or accepted to an accredited tertiary institution. Preference will be given to students demonstrating strong academic achievement, community involvement, and financial need.\n\nApplications are open from June 1st through August 31st, 2025. Successful recipients will be notified by October 2025 and will receive support for the 2025–2026 academic year.\n\nFor full eligibility criteria and application instructions, contact the MICO Foundation office or visit our official website.`,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80",
  },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Right large grid */}
      <div className="absolute right-[-3%] top-[100px] h-[1100px] w-[600px] opacity-[0.15]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-10">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.06]"
              style={{ borderRadius: "16px" }}
            />
          ))}
        </div>
      </div>
      {/* Bottom left small grid */}
      <div className="absolute bottom-[60px] left-[-2%] h-[220px] w-[220px] opacity-[0.12]">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.06]"
              style={{ borderRadius: "14px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnnouncementDetailPage({ slug }) {

  const [announcement, setAnnouncement] = useState(null);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const [announcementData, allData] = await Promise.all([
          client.fetch(queries.announcementBySlug(slug)),
          client.fetch(queries.allAnnouncements),
        ]);

        if (announcementData) {
          setAnnouncement({
            ...announcementData,
            date: new Date(announcementData.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          });
          console.log("✅ Loaded announcement from CMS:", announcementData.title);
        } else {
          setAnnouncement(staticAnnouncements[0]);
          console.log("ℹ️ Using static announcement data");
        }

        if (allData && allData.length > 0) {
          setAllAnnouncements(allData);
        }
      } catch (error) {
        console.error("Error fetching announcement:", error);
        setAnnouncement(staticAnnouncements[0]);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchAnnouncement();
    } else {
      setAnnouncement(staticAnnouncements[0]);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 py-14">
        <p className="text-[24px] text-[#040617]" style={inter}>
          Loading announcement...
        </p>
      </section>
    );
  }

  if (!announcement) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 py-14">
        <p className="text-[24px] text-[#040617]" style={inter}>
          Announcement not found
        </p>
      </section>
    );
  }

  const currentSlug = announcement.slug;
  const currentIndex = allAnnouncements.findIndex((a) => a.slug === currentSlug);
  const prevAnnouncement = currentIndex > 0 ? allAnnouncements[currentIndex - 1] : allAnnouncements[allAnnouncements.length - 1];
  const nextAnnouncement = currentIndex < allAnnouncements.length - 1 ? allAnnouncements[currentIndex + 1] : allAnnouncements[0];

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-14 sm:px-10 lg:px-16">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1540px]">

        {/* Top Meta Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          {/* Bell badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full bg-[#FFD900] px-5 py-2"
            style={inter}
          >
            <Bell className="h-4 w-4 text-black" />
            <span className="text-[15px] font-semibold text-black">
              Announcement
            </span>
          </div>

          {/* Category */}
          {announcement.category && (
            <div
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2"
              style={inter}
            >
              <Tag className="h-4 w-4 text-[#8A8E9D]" />
              <span className="text-[15px] text-[#040617]">
                {announcement.category}
              </span>
            </div>
          )}

          {/* Date */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2"
            style={inter}
          >
            <Calendar className="h-4 w-4 text-[#8A8E9D]" />
            <span className="text-[15px] text-[#040617]">
              {announcement.date}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-[1420px] text-[52px] font-semibold leading-[0.93] tracking-[-0.07em] text-[#040617] sm:text-[80px] lg:text-[114px]"
          style={inter}
        >
          {announcement.title}
        </motion.h1>

        {/* Yellow divider accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 h-[6px] w-[120px] origin-left rounded-full bg-[#FFD900]"
        />

        {/* Hero Image — optional */}
        {announcement.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-12 overflow-hidden rounded-[32px]"
          >
            <img
              src={announcement.image}
              alt={announcement.title}
              className="h-[300px] w-full object-cover sm:h-[480px] lg:h-[660px]"
            />
          </motion.div>
        )}

        {/* Two-column layout: body + sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-16 grid gap-12 lg:grid-cols-[1fr_340px]"
        >
          {/* Body Content */}
          <div
            className="space-y-9 text-[24px] leading-[1.7] tracking-[-0.03em] text-[#1A1D28] sm:text-[27px] lg:text-[30px]"
            style={inter}
          >
            {announcement.content
              .trim()
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Info Card */}
            <div className="rounded-[28px] border border-[#E5E6EB] bg-white p-7">
              <h3
                className="text-[22px] font-semibold tracking-[-0.04em] text-[#040617]"
                style={inter}
              >
                Quick Info
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] text-[#8A8E9D]" style={inter}>
                    Published
                  </span>
                  <span
                    className="text-[18px] font-semibold text-[#040617]"
                    style={inter}
                  >
                    {announcement.date}
                  </span>
                </div>

                {announcement.category && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] text-[#8A8E9D]" style={inter}>
                      Category
                    </span>
                    <span
                      className="text-[18px] font-semibold text-[#040617]"
                      style={inter}
                    >
                      {announcement.category}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-[14px] text-[#8A8E9D]" style={inter}>
                    Type
                  </span>
                  <span
                    className="text-[18px] font-semibold text-[#040617]"
                    style={inter}
                  >
                    Official Announcement
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="rounded-[28px] bg-[#FFD900] p-7">
              <h3
                className="text-[26px] font-semibold leading-[1.1] tracking-[-0.05em] text-black"
                style={inter}
              >
                Have Questions?
              </h3>
              <p className="mt-3 text-[17px] leading-[1.5] text-black/70" style={inter}>
                Reach out to the MICO Foundation team for more information about this announcement.
              </p>
              <a
                href="mailto:info@micofoundation.org"
                className="mt-7 inline-flex w-full items-center justify-center rounded-[18px] bg-black px-6 py-4 text-[16px] font-semibold text-white transition hover:scale-[1.01]"
                style={inter}
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next Navigation */}
        {allAnnouncements.length > 1 && (
          <div className="mt-24 grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-2">
            {/* Previous */}
            <Link
              href={`/announcement/${prevAnnouncement.slug}`}
              className="group rounded-[28px] border border-black/10 bg-white p-8 transition hover:border-black/20"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[18px] bg-[#ECECF1] transition group-hover:bg-[#FFD900]">
                  <ArrowLeft className="h-7 w-7 text-[#040617]" />
                </div>
                <div>
                  <p className="text-[17px] text-[#8A8E9D]" style={inter}>
                    Previous Announcement
                  </p>
                  <h3
                    className="mt-2 max-w-[500px] text-[26px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#040617]"
                    style={inter}
                  >
                    {prevAnnouncement.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/announcement/${nextAnnouncement.slug}`}
              className="group rounded-[28px] border border-black/10 bg-white p-8 transition hover:border-black/20"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[17px] text-[#8A8E9D]" style={inter}>
                    Next Announcement
                  </p>
                  <h3
                    className="mt-2 max-w-[500px] text-[26px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#040617]"
                    style={inter}
                  >
                    {nextAnnouncement.title}
                  </h3>
                </div>
                <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[18px] bg-[#ECECF1] transition group-hover:bg-[#FFD900]">
                  <ArrowRight className="h-7 w-7 text-[#040617]" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
