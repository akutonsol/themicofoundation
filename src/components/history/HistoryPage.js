"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Landmark } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticConversation = [
  {
    title: "The 1950s and 1960s",
    side: "left",
    paragraphs: [
      "Marked one of the most transformative periods in the history of The Mico University College (then known as Mico College). During these two decades, the College evolved from a traditional male teacher-training institution into a modern, co-educational college that played a central role in Jamaica's educational expansion before and after independence in 1962.",
      "Overall, the 1950s were characterized by modernization, co-education, and curriculum reform, while the 1960s were defined by rapid expansion, alignment with Jamaica's Independence, and the broadening of teacher education into the secondary sector. These changes established the foundation for Mico's later evolution into one of the Caribbean's foremost institutions for teacher education.",
    ],
  },
  {
    title: "The 1970s",
    side: "right",
    paragraphs: [
      "Marked one of the most transformative decades in the history of The Mico University College. Under the leadership of Dr. Errol Miller, who assumed the principalship in 1972, the institution expanded its national footprint to support Jamaica's sweeping educational reforms.",
      "Key developments from this era include:",
      "Secondary Education Expansion: Moving beyond its historical focus on primary and junior secondary training, Mico restructured its curriculum to prepare teachers across the full secondary spectrum with dual subject specializations. By the decade's end, Mico had become Jamaica's primary and largest producer of secondary school educators.",
      "Special Education & Mico CARE: When the Jamaican government integrated special education into the public funding framework in 1974, it selected Mico as the designated national training institution for the field. In the late 1970s, Dr. Miller partnered with the Dutch government to establish the Child Assessment and Research in Education (CARE) Center—also known as the Diagnostic and Therapeutic Center.",
      "Infrastructure Growth: To support its growing student body, the campus expanded significantly. Projects included a 300-bed female residence hall on Arnold Road (later named Errol Miller Hall), a new auditorium, a modern cafeteria (now the Bonham Carter Building), dedicated facilities for the Mico CARE Center, and initial architectural planning for a new library.",
    ],
  },
];

const staticStory = [
  "With roots reaching back to 1836, The Mico stands as one of the most significant educational institutions in Jamaica and the wider Caribbean. Its story is one of resilience, service, leadership, and educational transformation.",
  "The Mico Foundation was established to support the long-term protection and development of assets connected to The Mico University College. Its purpose is not only administrative — it is deeply connected to legacy, responsibility, and future-building.",
  "Through property stewardship, partnerships, fundraising, restoration, and project support, the Foundation helps ensure that the mission of The Mico continues with strength and stability.",
  "Today, The Mico Foundation continues to serve as a bridge between history and possibility: preserving what came before while helping create what comes next.",
];

const staticContent = {
  heroLabel: "The Mico Foundation History",
  heroHeading: "A Legacy Built\nTo Protect The Future.",
  heroSubtext: "From historic stewardship to future impact.",
  heroImageUrl: "https://themico.edu.jm/wp-content/uploads/2024/05/DSC8377-Pano.jpg",
  storyHeading: "The Story Behind The Foundation",
  storyParagraphs: staticStory,
  conversation: staticConversation,
  ctaHeading: "Help continue the legacy.",
  ctaButtonText: "Explore Projects",
  ctaButtonLink: "/projects",
};

function BackgroundTexture() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]">
      <div className="grid h-full w-full grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }).map((_, i) => (<div key={i} className="border border-[#24180A]" />))}
      </div>
    </div>
  );
}

function ChatBubble({ message }) {
  const isLeft = message.side === "left";
  const paras = message.paragraphs || (message.text ? [message.text] : []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full flex-col ${isLeft ? "items-start" : "items-end"}`}>
      <div className={`relative w-full max-w-[760px] rounded-[26px] border p-7 shadow-[var(--shadow-2)] sm:p-9 ${isLeft ? "rounded-tl-[6px] border-[#24180A]/15 bg-white text-[#24180A]" : "rounded-tr-[6px] border-[#24180A]/20 bg-[#FFD900] text-[#24180A]"}`}>
        <h3 className="m-0 mb-4 text-[20px] font-bold tracking-[-0.03em] sm:text-[24px]" style={inter}>{message.title || message.name}</h3>
        <div className="space-y-3">
          {paras.map((p, i) => (
            <p key={i} className="m-0 text-[14px] font-normal leading-[1.6] text-[#24180A]/85 sm:text-[15px]" style={inter}>{p}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ConversationSequence({ conversation }) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
      {conversation.map((message, i) => (
        <ChatBubble key={i} message={message} />
      ))}
    </div>
  );
}

export default function HistoryPage() {
  const [content, setContent] = useState(staticContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.historyPage);
        if (data) {
          setContent({
            heroLabel: data.heroLabel || staticContent.heroLabel,
            heroHeading: data.heroHeading || staticContent.heroHeading,
            heroSubtext: data.heroSubtext || staticContent.heroSubtext,
            heroImageUrl: data.heroImage ? urlFor(data.heroImage).width(1800).url() : staticContent.heroImageUrl,
            storyHeading: data.storyHeading || staticContent.storyHeading,
            storyParagraphs: data.storyParagraphs?.length > 0 ? data.storyParagraphs : staticContent.storyParagraphs,
            conversation: data.conversation?.length > 0 ? data.conversation : staticContent.conversation,
            ctaHeading: data.ctaHeading || staticContent.ctaHeading,
            ctaButtonText: data.ctaButtonText || staticContent.ctaButtonText,
            ctaButtonLink: data.ctaButtonLink || staticContent.ctaButtonLink,
          });
        }
      } catch (error) {
        console.error('Error fetching history page:', error);
      }
    }
    fetchContent();
  }, []);

  const headingLines = content.heroHeading.split('\n');

  return (
    <main className="overflow-hidden bg-[#F6F0E5] text-[#24180A]">

      {/* ── HERO ── */}
      <section className="relative px-6 pb-16 pt-20 sm:px-10 lg:px-20">
        <BackgroundTexture />
        <div className="relative mx-auto max-w-[1500px]">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#24180A]/20 bg-white/40 px-5 py-3 text-[15px] font-semibold uppercase tracking-[0.18em]" style={inter}>
            <BookOpen className="h-4 w-4" />
            {content.heroLabel}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.05 }}
            className="max-w-[1250px] bg-[#EEE6D9] px-1 text-[72px] font-normal leading-[0.98] tracking-[-0.06em] text-[#24180A] sm:text-[104px] lg:text-[118px]" style={inter}>
            {headingLines.map((line, i) => (
              <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
            ))}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.18 }}
            className="relative mt-16 h-[460px] overflow-hidden rounded-[34px] border border-[#24180A]/20">
            <img src={content.heroImageUrl} alt="Historic building" className="h-full w-full object-cover sepia" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24180A]/80 via-[#24180A]/15 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="max-w-[850px] text-[46px] font-semibold leading-[1] tracking-[-0.06em] text-white" style={inter}>{content.heroSubtext}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONVERSATION ── */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <ConversationSequence conversation={content.conversation} />
      </section>

      {/* ── STORY ── */}
      <motion.section initial={{ opacity: 0, y: 120 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative px-6 py-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="sticky top-28">
              <motion.div initial={{ opacity: 0, rotate: -12, scale: 0.8 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.65 }}>
                <Landmark className="mb-6 h-12 w-12 text-[#B28300]" />
              </motion.div>
              <h2 className="text-[58px] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[82px]" style={inter}>{content.storyHeading}</h2>
            </div>
          </div>
          <div className="space-y-10 border-l border-[#24180A]/20 pl-8">
            {content.storyParagraphs.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.08 }}
                className="text-[26px] leading-[1.65] tracking-[-0.03em] text-[#3F352A]" style={inter}>{p}</motion.p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 rounded-[36px] bg-[#FFD900] p-10 sm:p-14 lg:flex-row lg:items-center">
          <h2 className="max-w-[850px] text-[54px] font-semibold leading-[0.95] tracking-[-0.07em] text-[#24180A] sm:text-[82px]" style={inter}>{content.ctaHeading}</h2>
          <a href={content.ctaButtonLink} className="inline-flex items-center gap-3 rounded-[18px] bg-[#24180A] px-8 py-5 text-[17px] font-semibold text-white" style={inter}>
            {content.ctaButtonText}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </main>
  );
}