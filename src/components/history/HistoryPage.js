"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Landmark } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticConversation = [
  { name: "John Brown", side: "left", label: "Asked about the legacy", text: "I always knew The Mico had history, but I didn't realize the Foundation helped protect so much of that legacy." },
  { name: "Eric Campbell", side: "right", label: "Shared the history", text: "Yes. The Foundation was created to help safeguard the assets, partnerships, and long-term support behind The Mico's mission." },
  { name: "John Brown", side: "left", label: "Asked about the mission", text: "So it is not just about preserving buildings. It is about protecting the future of education too." },
  { name: "Eric Campbell", side: "right", label: "Explained the purpose", text: "Exactly. Every project connects the institution's history with the needs of future generations." },
  { name: "John Brown", side: "left", label: "Reflected on impact", text: "That makes the work feel bigger. It is stewardship, restoration, and opportunity all at once." },
  { name: "Eric Campbell", side: "right", label: "Connected past and future", text: "That is the heart of the Foundation: honoring what came before while helping build what comes next." },
  { name: "John Brown", side: "left", label: "Asked about support", text: "So each donation, project, and partnership becomes part of The Mico story." },
  { name: "Eric Campbell", side: "right", label: "Closed the thought", text: "Yes. It keeps the legacy moving forward, generation after generation." },
];

const staticTimeline = [
  { year: "1836", title: "A Historic Beginning", text: "The Mico began its journey as one of the oldest teacher-training institutions in the Western Hemisphere." },
  { year: "1970s", title: "A Need For Expansion", text: "As the institution grew, leadership recognized the need to protect and privately manage assets connected to its development." },
  { year: "1981", title: "The Foundation Was Established", text: "The Mico Foundation was created as a registered company in Jamaica to support, protect, and manage resources for The Mico." },
  { year: "Today", title: "Legacy In Motion", text: "The Foundation continues to support educational development, restoration, partnerships, and future growth." },
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
  timeline: staticTimeline,
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

function TypewriterText({ text, active }) {
  const [displayText, setDisplayText] = useState(active ? "" : text);
  useEffect(() => {
    if (!active) { setDisplayText(text); return; }
    setDisplayText("");
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, 24);
    return () => clearInterval(interval);
  }, [text, active]);
  return (
    <>
      {displayText}
      {active && displayText.length < text.length && (
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>|</motion.span>
      )}
    </>
  );
}

function TypingDots({ isLeft }) {
  return (
    <div className={`mt-6 flex items-center gap-1 ${isLeft ? "justify-start" : "justify-end"}`}>
      {[0, 1, 2].map((dot) => (
        <motion.span key={dot} animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
          className={`h-2 w-2 rounded-full ${isLeft ? "bg-[#24180A]/30" : "bg-[#24180A]/45"}`} />
      ))}
    </div>
  );
}

function ChatBubble({ message, index, activeIndex }) {
  const isLeft = message.side === "left";
  const isVisible = index <= activeIndex;
  const isTyping = index === activeIndex;
  if (!isVisible) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isLeft ? "items-start" : "items-end"}`}>
      <div className={`mb-4 flex items-center gap-3 ${isLeft ? "ml-2" : "mr-2 flex-row-reverse"}`}>
        <div className={`flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold ${isLeft ? "bg-[#24180A] text-[#FFFDF7]" : "bg-[#FFD900] text-[#24180A]"}`} style={inter}>
          {message.name.split(" ").map((w) => w[0]).join("")}
        </div>
        <div className={isLeft ? "text-left" : "text-right"}>
          <p className="m-0 text-[15px] font-bold uppercase tracking-[0.12em] text-[#24180A]" style={inter}>{message.name}</p>
          <p className="m-0 mt-1 text-[13px] font-medium text-[#24180A]/50" style={inter}>{isTyping ? "Typing..." : message.label}</p>
        </div>
      </div>
      <div className={`relative max-w-[620px] rounded-[30px] border p-8 shadow-sm ${isLeft ? "rounded-tl-[6px] border-[#24180A]/15 bg-white text-[#24180A]" : "rounded-tr-[6px] border-[#24180A]/20 bg-[#FFD900] text-[#24180A]"}`}>
        <p className="m-0 min-h-[132px] text-[28px] font-semibold leading-[1.25] tracking-[-0.04em] sm:text-[34px]" style={inter}>
          <TypewriterText text={message.text} active={isTyping} />
        </p>
        {isTyping ? <TypingDots isLeft={isLeft} /> : (
          <div className={`mt-6 flex items-center gap-1 ${isLeft ? "justify-start" : "justify-end"}`}>
            {[0, 1, 2].map((dot) => (<span key={dot} className={`h-2 w-2 rounded-full ${isLeft ? "bg-[#24180A]/25" : "bg-[#24180A]/35"}`} />))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ConversationSequence({ conversation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const current = conversation[activeIndex];
    if (!current) return;
    const typingTime = Math.min(Math.max(current.text.length * 24 + 900, 2400), 5200);
    const timer = setTimeout(() => {
      if (activeIndex < conversation.length - 1) setActiveIndex(activeIndex + 1);
      else setTimeout(() => setActiveIndex(0), 3000);
    }, typingTime);
    return () => clearTimeout(timer);
  }, [activeIndex, conversation]);

  // Build pairs
  const pairs = [];
  for (let i = 0; i < conversation.length; i += 2) pairs.push(i);

  return (
    <div className="mx-auto max-w-[1500px] space-y-28">
      {pairs.map((startIndex) => (
        <motion.div key={startIndex}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: activeIndex >= startIndex ? 1 : 0.12, y: activeIndex >= startIndex ? 0 : 40 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-2 lg:items-start"
        >
          <ChatBubble message={conversation[startIndex]} index={startIndex} activeIndex={activeIndex} />
          {conversation[startIndex + 1] && (
            <div className="pt-16 lg:pt-28">
              <ChatBubble message={conversation[startIndex + 1]} index={startIndex + 1} activeIndex={activeIndex} />
            </div>
          )}
        </motion.div>
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
            timeline: data.timeline?.length > 0 ? data.timeline : staticContent.timeline,
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

      {/* ── TIMELINE ── */}
      <section className="bg-[#24180A] px-6 py-24 text-[#FFFDF7] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <motion.h2 initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.65 }}
            className="mb-16 text-[64px] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[96px]" style={inter}>Historical Timeline</motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.timeline.map((item, index) => (
              <motion.div key={item.year} initial={{ opacity: 0, y: 46 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
                <p className="mb-8 text-[46px] font-semibold tracking-[-0.06em] text-[#FFD900]" style={inter}>{item.year}</p>
                <h3 className="mb-4 text-[28px] font-semibold tracking-[-0.04em]" style={inter}>{item.title}</h3>
                <p className="text-[18px] leading-[1.55] text-white/70" style={inter}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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