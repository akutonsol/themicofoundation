"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, X } from "lucide-react";
import { useState } from "react";


const inter = { fontFamily: "'Inter', sans-serif" };

const endedEvents = [
  {
    id: 1,
    slug: "mico-future-forward-forum",
    title: "Mico Future Forward Forum",
    date: "04 July 2025",
    location: "Jamaica, Kingston",
    description:
      "The Future Forward Forum brought together Mico alumni, educators, students, and partners for an inspiring day of dialogue, innovation, and vision. Centered on the theme “Shaping Education for the Caribbean’s Future,” the event featured keynote speeches from regional leaders, engaging panel discussions on educational transformation, and interactive workshops focused on digital tools and youth empowerment. It was a powerful gathering that reinforced The Mico Foundation’s mission to lead educational progress across the Caribbean.",
    gallery: [
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 2,
    slug: "mico-heritage-networking-night",
    title: "Mico Heritage Networking Night",
    date: "18 July 2025",
    location: "Kingston, Jamaica",
    description:
      "The Mico Heritage Networking Night created space for alumni, supporters, and institutional partners to connect around the Foundation’s legacy and future vision. The evening highlighted stories of service, educational impact, and continued support for The Mico University College.",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-2%] top-[140px] h-[900px] w-[560px] opacity-[0.13]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-9">
          {Array.from({ length: 54 }).map((_, i) => (
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
function ImageLightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 px-5 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-[1200px] overflow-hidden rounded-[22px] bg-black"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-[#FFD900]"
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>

            <img
              src={image}
              alt="Expanded event gallery"
              className="max-h-[90vh] w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="mt-8">
      <h2
        className="mb-6 text-center text-[28px] font-semibold tracking-[-0.04em] text-[#040617] sm:text-[34px]"
        style={inter}
      >
        Event Gallery
      </h2>

      <div className="grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[190px] md:grid-cols-4 lg:grid-cols-7 lg:auto-rows-[180px]">
        {images.map((src, index) => {
          const large = index === 4;
          const tall = index === 3 || index === 7;
          const wide = index === 5;

          return (
            <motion.button
              type="button"
              key={`${src}-${index}`}
              onClick={() => onImageClick(src)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className={[
                "group overflow-hidden rounded-[6px] bg-[#E5E6EB]",
                large ? "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2" : "",
                tall ? "row-span-2" : "",
                wide ? "md:col-span-2" : "",
              ].join(" ")}
            >
              <img
                src={src}
                alt={`Event gallery ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06] group-hover:brightness-90"
              />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center">
        <div className="flex gap-2">
          <span className="h-3 w-16 rounded-full bg-[#FFD900]" />
          <span className="h-3 w-16 rounded-full bg-[#E5E6EB]" />
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

const currentIndex = endedEvents.findIndex(
  (item) => item.slug === slug
);

const safeIndex = currentIndex === -1 ? 0 : currentIndex;

const event = endedEvents[safeIndex];

const prevEvent =
  safeIndex > 0
    ? endedEvents[safeIndex - 1]
    : null;

const nextEvent =
  safeIndex < endedEvents.length - 1
    ? endedEvents[safeIndex + 1]
    : null;

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 pb-10 pt-8 sm:px-8 lg:px-14 lg:pb-16">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1500px]">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-[1320px] text-[56px] font-semibold leading-[0.95] tracking-[-0.065em] text-[#040617] sm:text-[82px] lg:text-[112px]"
          style={inter}
        >
          {event.title}
        </motion.h1>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <p
            className="text-[18px] text-[#8A8E9D] sm:text-[20px]"
            style={inter}
          >
            {event.date}
          </p>

          <div
            className="inline-flex items-center gap-2 text-[17px] font-medium text-[#040617] sm:text-[18px]"
            style={inter}
          >
            <MapPin className="h-5 w-5" />
            {event.location}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-6 border-l border-[#E5E6EB] pl-5"
        >
          <p
            className="max-w-[1400px] text-[22px] leading-[1.6] tracking-[-0.02em] text-[#7A7D8B] sm:text-[26px]"
            style={inter}
          >
            {event.description}
          </p>
        </motion.div>

<GalleryGrid images={event.gallery} onImageClick={setSelectedImage} />
<ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />


<div className="mt-14 flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

  {/* Previous */}
  <div>
    {prevEvent ? (
      <Link
        href={`/pasteventdetails?slug=${prevEvent.slug}`}
        className="inline-flex items-center gap-4"
      >
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
          <ArrowLeft className="h-6 w-6" />
        </span>

        <div>
          <p
            className="text-[20px] font-semibold text-[#040617]"
            style={inter}
          >
            Previous Event
          </p>

          <p
            className="text-[17px] text-[#7A7D8B]"
            style={inter}
          >
            {prevEvent.title}
          </p>
        </div>
      </Link>
    ) : (
      <div>
        <p
          className="text-[20px] font-semibold text-[#7A7D8B]"
          style={inter}
        >
          This Is First Event
        </p>
      </div>
    )}
  </div>

  {/* Next */}
  <div>
    {nextEvent ? (
      <Link
        href={`/pasteventdetails?slug=${nextEvent.slug}`}
        className="inline-flex items-center gap-4"
      >
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
          <ArrowRight className="h-6 w-6" />
        </span>

        <div>
          <p
            className="text-[20px] font-semibold text-[#040617]"
            style={inter}
          >
            Next Event
          </p>

          <p
            className="text-[17px] text-[#7A7D8B]"
            style={inter}
          >
            {nextEvent.title}
          </p>
        </div>
      </Link>
    ) : (
      <div className="text-right">
        <p
          className="text-[20px] font-semibold text-[#7A7D8B]"
          style={inter}
        >
          This Is Last Event
        </p>
      </div>
    )}
  </div>
</div>






      </div>
    </section>
  );
}