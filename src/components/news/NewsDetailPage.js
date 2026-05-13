"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

const newsItems = [
  {
    id: 1,
    slug: "lady-mico-charity-breaks-historical-barrier",

    title: "The Lady Mico Charity – Breaks Its Historical Barrier",

    excerpt:
      "The Lady Mico Charity made a significant historical change in 1984 when it invited a Jamaican citizen into the membership of its 300 year old Charity.",

    content: `
The Lady Mico Charity, now the Lady Mico Trust, made a significant historical change in 1984 when it invited to the membership of its 300 year old Charity a Jamaican citizen and Principal of its only surviving Caribbean education institution, Professor, the Honourable Errol Lawrence Miller.

This appointment made by the then chairman Mr. Henry Buxton was unprecedented as no member other than the descendants of Sir Thomas Fowell Buxton, the first chair of the Charity or persons external to the United Kingdom, were made trustees of the Lady Mico Charity.

This historical initiative made Professor Errol Miller the first individual outside of the United Kingdom to sit as a trustee of the Lady Mico Trust.

The appointment served to strengthen the relationship between the Mico College and the Mico Foundation and deepened the Foundation’s custodial responsibility for the property owned by the Lady Mico Trust at 1A Marescaux Road, on which stands the Mico University College.

Professor Miller’s invitation was grounded in the Trust’s confidence and respect for his professional, innovative and astute leadership as Principal of The Mico.

His appointment to the Trust is in recognition of his significant contribution to the growth and sustainability of the Mico as a Trust Institution.

Among Professor Miller’s major achievements is the establishment of the Mico Foundation as a Limited Liability Company which has as one of its functions the purchase and ownership of properties for the use of The Mico.

The Foundation currently owns and manages seven properties to support the development of The Mico University College.

It acts as a firewall between funds provided by the Government of Jamaica for the operation of the University College and funds independently raised by The Mico.

The Foundation, as a trust institution is the legal framework in which the assets of University College are protected.
    `,

    date: "04 July 2025",
    location: "Jamaica, Kingston",

    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=80",
  },

  {
    id: 2,
    slug: "mico-foundation-launches-new-scholarship-program",

    title: "Mico Foundation Launches New Scholarship Program",

    excerpt:
      "The Foundation announces a new scholarship initiative supporting future educators across Jamaica.",

    content: `
The Mico Foundation officially launched a new scholarship initiative designed to support aspiring educators across Jamaica.

The initiative focuses on leadership development, teacher training, and expanding educational access for underserved communities.

The program reflects the Foundation’s continued commitment to sustainable educational transformation and long-term institutional growth.
    `,

    date: "18 July 2025",
    location: "Kingston, Jamaica",

    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
  },

  {
    id: 3,
    slug: "trustees-host-annual-community-forum",

    title: "Trustees Host Annual Community Forum",

    excerpt:
      "Trustees gathered educators, alumni, and community leaders for the annual Foundation forum.",

    content: `
The annual community forum brought together trustees, alumni, educators, and national stakeholders for meaningful dialogue around the future of education in Jamaica.

The event emphasized innovation, accessibility, and preserving the historical mission of The Mico Foundation.
    `,

    date: "30 July 2025",
    location: "Spanish Town, Jamaica",

    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80",
  },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-4%] top-[120px] h-[1200px] w-[680px] opacity-[0.16]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-10">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.05]"
              style={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[-2%] bottom-[80px] h-[260px] w-[260px] opacity-[0.14]">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
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

export default function NewsDetailPage() {
  const params = useSearchParams();

  const slug = params.get("slug");

  const currentIndex = newsItems.findIndex(
    (item) => item.slug === slug
  );

  const article =
    newsItems[currentIndex] || newsItems[0];

  const nextArticle =
    newsItems[(currentIndex + 1) % newsItems.length];

  const prevArticle =
    newsItems[
      (currentIndex - 1 + newsItems.length) %
        newsItems.length
    ];

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-14 sm:px-10 lg:px-16">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1540px]">

        {/* Top Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            className="text-[22px] text-[#8A8E9D]"
            style={inter}
          >
            {article.date}
          </p>

          <div
            className="inline-flex items-center gap-2 text-[18px] text-[#040617]"
            style={inter}
          >
            <MapPin className="h-5 w-5" />
            {article.location}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-[1450px] text-[54px] font-semibold leading-[0.92] tracking-[-0.07em] text-[#040617] sm:text-[82px] lg:text-[118px]"
          style={inter}
        >
          {article.title}
        </motion.h1>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="mt-14 overflow-hidden rounded-[32px]"
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-[320px] w-full object-cover sm:h-[520px] lg:h-[720px]"
          />
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mx-auto mt-16 max-w-[1380px]"
        >
          <div
            className="space-y-10 text-[24px] leading-[1.7] tracking-[-0.03em] text-[#1A1D28] sm:text-[28px] lg:text-[32px]"
            style={inter}
          >
            {article.content
              .trim()
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-24 grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-2">

          {/* Previous */}
          <Link
            href={`/newsdetail?slug=${prevArticle.slug}`}
            className="group rounded-[28px] border border-black/10 bg-white p-8 transition hover:border-black/20"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-[#ECECF1] transition group-hover:bg-[#FFD900]">
                <ArrowLeft className="h-7 w-7 text-[#040617]" />
              </div>

              <div>
                <p
                  className="text-[18px] text-[#8A8E9D]"
                  style={inter}
                >
                  Previous News
                </p>

                <h3
                  className="mt-2 max-w-[520px] text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#040617]"
                  style={inter}
                >
                  {prevArticle.title}
                </h3>
              </div>
            </div>
          </Link>

          {/* Next */}
          <Link
            href={`/newsdetail?slug=${nextArticle.slug}`}
            className="group rounded-[28px] border border-black/10 bg-white p-8 transition hover:border-black/20"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p
                  className="text-[18px] text-[#8A8E9D]"
                  style={inter}
                >
                  Next News
                </p>

                <h3
                  className="mt-2 max-w-[520px] text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#040617]"
                  style={inter}
                >
                  {nextArticle.title}
                </h3>
              </div>

              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-[#ECECF1] transition group-hover:bg-[#FFD900]">
                <ArrowRight className="h-7 w-7 text-[#040617]" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}