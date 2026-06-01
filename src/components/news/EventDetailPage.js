"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";

const inter = { fontFamily: "'Inter', sans-serif" };

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

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-2%] top-[140px] h-[900px] w-[560px] opacity-[0.13]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-9">
          {Array.from({ length: 54 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageLightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 px-5 py-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="relative max-h-[90vh] w-full max-w-[1200px] overflow-hidden rounded-[22px] bg-black"
            initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }} transition={{ duration: 0.28 }}
            onClick={e => e.stopPropagation()}>
            <button onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-[#FFD900]">
              <X className="h-6 w-6" />
            </button>
            <img src={image} alt="Event gallery" className="max-h-[90vh] w-full object-contain" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GalleryGrid({ images, onImageClick }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-center text-[28px] font-semibold tracking-[-0.04em] text-[#040617] sm:text-[34px]" style={inter}>
        Event Gallery
      </h2>
      <div className="grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[190px] md:grid-cols-4 lg:grid-cols-7 lg:auto-rows-[180px]">
        {images.map((img, index) => {
          const src = typeof img === "string" ? img : img?.url;
          if (!src) return null;
          const large = index === 4;
          const tall = index === 3 || index === 7;
          const wide = index === 5;
          return (
            <motion.button type="button" key={`${src}-${index}`} onClick={() => onImageClick(src)}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.03 }}
              className={[
                "group overflow-hidden rounded-[6px] bg-[#E5E6EB]",
                large ? "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2" : "",
                tall ? "row-span-2" : "",
                wide ? "md:col-span-2" : "",
              ].join(" ")}>
              <img src={src} alt={`Event gallery ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06] group-hover:brightness-90" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [event, setEvent] = useState(null);
  const [prevEvent, setPrevEvent] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch(`*[_type == "newsEvent" && type == "event"] | order(date desc) {
        _id, title, "slug": slug.current, date, location, description, excerpt,
        "image": featuredImage.asset->url,
        "gallery": gallery[]{
          "url": asset->url, alt
        }
      }`)
      .then(events => {
        if (!events?.length) { setLoading(false); return; }
        const idx = events.findIndex(e => e.slug === slug);
        const safeIdx = idx === -1 ? 0 : idx;
        const current = events[safeIdx];
        setEvent({ ...current, date: formatDate(current.date) });
        if (safeIdx > 0) setPrevEvent({ ...events[safeIdx - 1], date: formatDate(events[safeIdx - 1].date) });
        if (safeIdx < events.length - 1) setNextEvent({ ...events[safeIdx + 1], date: formatDate(events[safeIdx + 1].date) });
        setLoading(false);
      })
      .catch(err => { console.error("EventDetailPage error:", err); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <p className="text-[20px] text-[#8A8E9D]" style={inter}>Loading event...</p>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FAF9F6]">
        <div className="text-center">
          <p className="text-[20px] text-[#8A8E9D]" style={inter}>Event not found.</p>
          <Link href="/news" className="mt-4 inline-block text-[#FFD900] underline" style={inter}>Back to Events</Link>
        </div>
      </section>
    );
  }

  const galleryImages = event.gallery?.length > 0
    ? event.gallery
    : event.image ? [{ url: event.image }] : [];

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 pb-10 pt-8 sm:px-8 lg:px-14 lg:pb-16">
      <BackgroundGrid />
      <div className="relative mx-auto max-w-[1500px]">
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="max-w-[1320px] text-[56px] font-semibold leading-[0.95] tracking-[-0.065em] text-[#040617] sm:text-[82px] lg:text-[112px]" style={inter}>
          {event.title}
        </motion.h1>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-[18px] text-[#8A8E9D] sm:text-[20px]" style={inter}>{event.date}</p>
          {event.location && (
            <div className="inline-flex items-center gap-2 text-[17px] font-medium text-[#040617] sm:text-[18px]" style={inter}>
              <MapPin className="h-5 w-5" />
              {event.location}
            </div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-6 border-l border-[#E5E6EB] pl-5">
          <p className="max-w-[1400px] text-[22px] leading-[1.6] tracking-[-0.02em] text-[#7A7D8B] sm:text-[26px]" style={inter}>
            {event.description || event.excerpt}
          </p>
        </motion.div>

        <GalleryGrid images={galleryImages} onImageClick={setSelectedImage} />
        <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

        <div className="mt-14 flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {prevEvent ? (
              <Link href={`/pasteventdetails?slug=${prevEvent.slug}`} className="inline-flex items-center gap-4">
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                  <ArrowLeft className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[20px] font-semibold text-[#040617]" style={inter}>Previous Event</p>
                  <p className="text-[17px] text-[#7A7D8B]" style={inter}>{prevEvent.title}</p>
                </div>
              </Link>
            ) : (
              <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>This Is First Event</p>
            )}
          </div>
          <div>
            {nextEvent ? (
              <Link href={`/pasteventdetails?slug=${nextEvent.slug}`} className="inline-flex items-center gap-4">
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                  <ArrowRight className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[20px] font-semibold text-[#040617]" style={inter}>Next Event</p>
                  <p className="text-[17px] text-[#7A7D8B]" style={inter}>{nextEvent.title}</p>
                </div>
              </Link>
            ) : (
              <p className="text-right text-[20px] font-semibold text-[#7A7D8B]" style={inter}>This Is Last Event</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}