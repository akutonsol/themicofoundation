"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

// Fallback static data — slug is a plain string
const staticEvents = [
  {
    id: 1,
    slug: "mico-future-forward-forum-upcoming",
    title: "Mico Future Forward Forum",
    date: "04 July 2025",
    time: "11 AM UTC",
    location: "Jamaica, Kingston",
    contactName: "Mico Foundation Events Team",
    email: "events@micofoundation.org",
    phone: "+1 (876) 000-0000",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    description: "Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean.",
    details: [
      "Keynote presentations from education and community leaders.",
      "Panel discussions focused on innovation, access, and student success.",
      "Networking opportunities with alumni, partners, sponsors, and stakeholders.",
      "Opportunities to learn how to support future Mico Foundation initiatives.",
    ],
  },
];

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

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[22px] border border-[#E5E6EB] bg-white p-5">
      <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#FFD900] text-black">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-[16px] text-[#7A7D8B]" style={inter}>{label}</p>
      <p className="mt-1 text-[22px] font-semibold leading-[1.2] text-[#040617]" style={inter}>{value}</p>
    </div>
  );
}

// FIX: accept slug as prop instead of useSearchParams
export default function UpcomingEventDetails({ slug }) {
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const [eventData, eventsData] = await Promise.all([
          client.fetch(queries.upcomingEventBySlug(slug)),
          client.fetch(queries.allUpcomingEvents)
        ]);

        if (eventData) {
          setEvent({
            ...eventData,
            // slug is already a plain string from our query
            date: new Date(eventData.date).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'long', year: 'numeric'
            }),
          });
          console.log('✅ Loaded event from CMS:', eventData.title);
        } else {
          setEvent(staticEvents[0]);
          console.log('ℹ️ Using static event data');
        }

        if (eventsData && eventsData.length > 0) {
          setAllEvents(eventsData);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(staticEvents[0]);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchEvent();
    } else {
      setEvent(staticEvents[0]);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#FAF9F6] px-6 pb-14 pt-8 flex items-center justify-center min-h-screen">
        <p className="text-[24px] text-[#040617]" style={inter}>Loading event...</p>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="relative overflow-hidden bg-[#FAF9F6] px-6 pb-14 pt-8 flex items-center justify-center min-h-screen">
        <p className="text-[24px] text-[#040617]" style={inter}>Event not found</p>
      </section>
    );
  }

  // FIX: slug is always a plain string — comparison now works correctly
  const currentSlug = event.slug;
  const currentIndex = allEvents.findIndex(e => e.slug === currentSlug);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 pb-14 pt-8 sm:px-8 lg:px-14 lg:pb-20">
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

        <div className="mt-10 overflow-hidden rounded-[28px]">
          <img src={event.image} alt={event.title} className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[620px]" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <DetailItem icon={Calendar} label="Date" value={event.date} />
          {event.time && <DetailItem icon={Clock} label="Time" value={event.time} />}
          {event.location && <DetailItem icon={MapPin} label="Location" value={event.location} />}
          {event.email && <DetailItem icon={Mail} label="Contact" value={event.email} />}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]"
        >
          <div className="rounded-[28px] border border-[#E5E6EB] bg-white p-7 sm:p-10">
            <h2 className="text-[34px] font-semibold tracking-[-0.05em] text-[#040617] sm:text-[44px]" style={inter}>
              Event Details
            </h2>
            <p className="mt-5 text-[22px] leading-[1.6] tracking-[-0.02em] text-[#7A7D8B] sm:text-[26px]" style={inter}>
              {event.description}
            </p>
            {event.details && event.details.length > 0 && (
              <div className="mt-8 space-y-4">
                {event.details.map((detail, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#FFD900]" />
                    <p className="text-[20px] leading-[1.5] text-[#040617] sm:text-[22px]" style={inter}>{detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[28px] bg-[#FFD900] p-7 sm:p-10">
            <h3 className="text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-black sm:text-[44px]" style={inter}>
              Interested In Attending?
            </h3>
            <p className="mt-5 text-[20px] leading-[1.5] text-black/75" style={inter}>
              For registration, sponsorship, vendor opportunities, or event participation, contact our team for more details.
            </p>
            {event.contactName && (
              <div className="mt-8 space-y-4">
                <p className="text-[18px] font-semibold text-black" style={inter}>{event.contactName}</p>
                {event.email && (
                  <p className="flex items-center gap-3 text-[18px] text-black/75" style={inter}>
                    <Mail className="h-5 w-5" />{event.email}
                  </p>
                )}
                {event.phone && (
                  <p className="flex items-center gap-3 text-[18px] text-black/75" style={inter}>
                    <Phone className="h-5 w-5" />{event.phone}
                  </p>
                )}
              </div>
            )}
            {/* FIX: restored missing opening <a tag */}
            {event.email && (
              <a
                href={`mailto:${event.email}`}
                className="mt-10 inline-flex w-full items-center justify-center rounded-[18px] bg-black px-6 py-4 text-[16px] font-semibold text-white transition hover:scale-[1.01]"
                style={inter}
              >
                Contact For Details
              </a>
            )}
          </div>
        </motion.div>

        {/* Navigation — FIX: dynamic routes */}
        {allEvents.length > 1 && (
          <div className="mt-14 flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {prevEvent ? (
                <Link href={`/upcomingevents/${prevEvent.slug}`} className="inline-flex items-center gap-4">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                    <ArrowLeft className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[20px] font-semibold text-[#040617]" style={inter}>Previous Event</p>
                    <p className="text-[17px] text-[#7A7D8B]" style={inter}>{prevEvent.title}</p>
                  </div>
                </Link>
              ) : (
                <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>This Is First Upcoming Event</p>
              )}
            </div>
            <div>
              {nextEvent ? (
                <Link href={`/upcomingevents/${nextEvent.slug}`} className="inline-flex items-center gap-4">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                    <ArrowRight className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[20px] font-semibold text-[#040617]" style={inter}>Next Event</p>
                    <p className="text-[17px] text-[#7A7D8B]" style={inter}>{nextEvent.title}</p>
                  </div>
                </Link>
              ) : (
                <div className="text-right">
                  <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>This Is Last Upcoming Event</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}