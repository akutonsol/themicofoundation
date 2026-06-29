"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticContent = {
  heading: "Our History",
  paragraphs: [
    "With over 19 decades in teacher training the Mico University College holds the enviable record of being the oldest teacher training institution in the Western Hemisphere. The Mico University College stands as a beacon of excellence in the delivery of high quality teacher education in Jamaica, the wider Caribbean region and beyond.",
    "The Mico embodies resilience, endurance and relevance especially in the 21st century. Its remit is enshrined in the College's Strategic Plan, which envisions The Mico achieving full University status offering degrees at all levels in science, technology, liberal arts, and the humanities.",
    "A significant feature of the stability of The Mico since its inception in 1836 is the reliable and affirmative support of the Lady Mico Trust. The Trust is consistent in its support and oversight of both the ownership and management of the College.",
    "During the 1970s, the College initiated a development and expansion programme to address the need to acquire more properties and other tangible assets. The then Principal, Dr. Errol Lawrence Miller, encouraged the Board of Directors to establish a locally managed entity in which assets not acquired through Government of Jamaica subventions to the college, could be privately managed.",
    "A foundation was deemed as a suitable measure to implement the idea. The idea was actioned in 1981 with the establishment of the Mico Foundation as a registered company under the Companies' Act of Jamaica, with registered offices at 1A Marescaux Road.",
  ],
  buttonText: "Read Full History",
  buttonLink: "/history",
};

const paragraphClass =
  "text-[24px] leading-[1.65] tracking-[-0.03em] text-[#040617] sm:text-[30px] lg:text-[36px]";

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[4%] top-[2%] h-[1200px] w-[92%] opacity-[0.18]">
        <div className="grid h-full w-full grid-cols-12 grid-rows-10">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const [content, setContent] = useState(staticContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.aboutContent);
        if (data) {
          setContent({
            heading: data.heading || staticContent.heading,
            paragraphs: data.paragraphs?.length > 0 ? data.paragraphs : staticContent.paragraphs,
            buttonText: data.buttonText || staticContent.buttonText,
            buttonLink: data.buttonLink || staticContent.buttonLink,
          });
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    }
    fetchContent();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
      <BackgroundGrid />
      <div className="relative mx-auto max-w-[1650px]">
        <motion.h1
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center text-[64px] font-semibold leading-[0.9] tracking-[-0.06em] text-[#040617] sm:text-[100px] lg:text-[150px]"
          style={inter}
        >
          {content.heading}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}
          className="mx-auto mt-12 max-w-[1450px]"
        >
          <div className="border-l border-[#E5E6EB] pl-6 sm:pl-10">
            {content.paragraphs.map((para, i) => (
              <p key={i} className={`${i > 0 ? 'mt-8 ' : ''}${paragraphClass}`} style={inter}>
                {para}
              </p>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href={content.buttonLink}
              className="inline-flex items-center gap-3 rounded-[18px] bg-[#FFD900] px-8 py-5 text-[17px] font-semibold text-[#040617] transition hover:scale-[1.02]"
              style={inter}
            >
              {content.buttonText}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}