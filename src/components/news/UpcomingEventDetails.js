"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

const inter = { fontFamily: "'Inter', sans-serif" };

const upcomingEvents = [
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
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    description:
      "Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. This event brings together alumni, educators, students, sponsors, and community partners to explore how education can continue to transform lives.",
    details: [
      "Keynote presentations from education and community leaders.",
      "Panel discussions focused on innovation, access, and student success.",
      "Networking opportunities with alumni, partners, sponsors, and stakeholders.",
      "Opportunities to learn how to support future Mico Foundation initiatives.",
    ],
  },
  {
    id: 2,
    slug: "education-partners-summit-upcoming",
    title: "Education Partners Summit",
    date: "21 August 2025",
    time: "10 AM UTC",
    location: "Jamaica, Kingston",
    contactName: "Partnerships Office",
    email: "partnerships@micofoundation.org",
    phone: "+1 (876) 000-0000",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    description:
      "A gathering of education leaders, partners, and community stakeholders focused on expanding access and strengthening institutional impact.",
    details: [
      "Partner presentations and strategy sessions.",
      "Foundation updates and upcoming project opportunities.",
      "Sponsor and stakeholder networking.",
      "Discussion around long-term education development goals.",
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

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[22px] border border-[#E5E6EB] bg-white p-5">
      <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#FFD900] text-black">
        <Icon className="h-6 w-6" />
      </div>

      <p className="text-[16px] text-[#7A7D8B]" style={inter}>
        {label}
      </p>

      <p
        className="mt-1 text-[22px] font-semibold leading-[1.2] text-[#040617]"
        style={inter}
      >
        {value}
      </p>
    </div>
  );
}

export default function UpcomingEventDetails() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const currentIndex = upcomingEvents.findIndex((item) => item.slug === slug);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const event = upcomingEvents[safeIndex];

  const prevEvent = safeIndex > 0 ? upcomingEvents[safeIndex - 1] : null;
  const nextEvent =
    safeIndex < upcomingEvents.length - 1 ? upcomingEvents[safeIndex + 1] : null;

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
          <img
            src={event.image}
            alt={event.title}
            className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[620px]"
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <DetailItem icon={Calendar} label="Date" value={event.date} />
          <DetailItem icon={Clock} label="Time" value={event.time} />
          <DetailItem icon={MapPin} label="Location" value={event.location} />
          <DetailItem icon={Mail} label="Contact" value={event.email} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]"
        >
          <div className="rounded-[28px] border border-[#E5E6EB] bg-white p-7 sm:p-10">
            <h2
              className="text-[34px] font-semibold tracking-[-0.05em] text-[#040617] sm:text-[44px]"
              style={inter}
            >
              Event Details
            </h2>

            <p
              className="mt-5 text-[22px] leading-[1.6] tracking-[-0.02em] text-[#7A7D8B] sm:text-[26px]"
              style={inter}
            >
              {event.description}
            </p>

            <div className="mt-8 space-y-4">
              {event.details.map((detail, index) => (
                <div key={index} className="flex gap-4">
                  <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#FFD900]" />
                  <p
                    className="text-[20px] leading-[1.5] text-[#040617] sm:text-[22px]"
                    style={inter}
                  >
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[#FFD900] p-7 sm:p-10">
            <h3
              className="text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-black sm:text-[44px]"
              style={inter}
            >
              Interested In Attending?
            </h3>

            <p
              className="mt-5 text-[20px] leading-[1.5] text-black/75"
              style={inter}
            >
              For registration, sponsorship, vendor opportunities, or event
              participation, contact our team for more details.
            </p>

            <div className="mt-8 space-y-4">
              <p className="text-[18px] font-semibold text-black" style={inter}>
                {event.contactName}
              </p>

              <p className="flex items-center gap-3 text-[18px] text-black/75" style={inter}>
                <Mail className="h-5 w-5" />
                {event.email}
              </p>

              <p className="flex items-center gap-3 text-[18px] text-black/75" style={inter}>
                <Phone className="h-5 w-5" />
                {event.phone}
              </p>
            </div>

            <a
              href={`mailto:${event.email}`}
              className="mt-10 inline-flex w-full items-center justify-center rounded-[18px] bg-black px-6 py-4 text-[16px] font-semibold text-white transition hover:scale-[1.01]"
              style={inter}
            >
              Contact For Details
            </a>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {prevEvent ? (
              <Link
                href={`/upcomingevents?slug=${prevEvent.slug}`}
                className="inline-flex items-center gap-4"
              >
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                  <ArrowLeft className="h-6 w-6" />
                </span>

                <div>
                  <p className="text-[20px] font-semibold text-[#040617]" style={inter}>
                    Previous Event
                  </p>
                  <p className="text-[17px] text-[#7A7D8B]" style={inter}>
                    {prevEvent.title}
                  </p>
                </div>
              </Link>
            ) : (
              <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>
                This Is First Upcoming Event
              </p>
            )}
          </div>

          <div>
            {nextEvent ? (
              <Link
                href={`/upcomingevents?slug=${nextEvent.slug}`}
                className="inline-flex items-center gap-4"
              >
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                  <ArrowRight className="h-6 w-6" />
                </span>

                <div>
                  <p className="text-[20px] font-semibold text-[#040617]" style={inter}>
                    Next Event
                  </p>
                  <p className="text-[17px] text-[#7A7D8B]" style={inter}>
                    {nextEvent.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="text-right">
                <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>
                  This Is Last Upcoming Event
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}