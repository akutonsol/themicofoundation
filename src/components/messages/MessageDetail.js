"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

// Fallback static data
const staticMessages = [
  {
    slug: "burchell-duhaney-message",
    role: "Secretary Manager",
    name: "Mr. Burchell Duhaney J.P.",
    image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg",
    intro: "I am indeed happy to lead the management team of The Mico Foundation at this time when The Mico University College is on the verge of changing its status to full university.",
    body: [
      "The Mico Foundation continues to play a vital role in safeguarding the legacy, mission, and future development of The Mico University College.",
      "As we continue this journey, we remain focused on strengthening our institutional partnerships, supporting strategic projects, and ensuring that future generations inherit an educational environment that reflects excellence, resilience, and opportunity.",
      "We are grateful to our donors, alumni, trustees, partners, and friends who continue to support the Foundation's work.",
    ],
  },
  {
    slug: "karl-james-message",
    role: "Trustee",
    name: "Dr. R. Karl James CD.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80",
    intro: "The work of The Mico Foundation is deeply connected to educational stewardship, legacy, and service.",
    body: [
      "Our responsibility is to protect the mission entrusted to us while supporting the continued development of one of the Caribbean's most important educational institutions.",
      "Through thoughtful leadership and sustained support, we aim to strengthen opportunities for students, educators, and the wider community.",
    ],
  },
  {
    slug: "sylvester-tulloch-message",
    role: "Chairman",
    name: "Dr. Sylvester Tulloch, CD.",
    image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg",
    intro: "Leadership, service, and education remain at the center of our work as a Foundation.",
    body: [
      "The Mico Foundation stands on a proud legacy of educational impact. Our goal is to ensure that legacy continues with strength, vision, and accountability.",
      "We invite our community to continue walking with us as we support meaningful projects and institutional advancement.",
    ],
  },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-4%] top-[6%] h-[760px] w-[720px] opacity-[0.13]">
        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <div className="absolute right-[-4%] bottom-[-8%] h-[760px] w-[760px] opacity-[0.13]">
        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <div className="absolute left-[6%] top-[18%] text-[42px] text-[#FFD900]">✦</div>
      <div className="absolute right-[12%] bottom-[18%] text-[42px] text-[#FFD900]">✦</div>
    </div>
  );
}

// FIX: accept slug as prop, removed useSearchParams
export default function MessageDetail({ slug }) {
  const [message, setMessage] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const [messageData, allData] = await Promise.all([
          client.fetch(queries.messageBySlug(slug)),
          client.fetch(queries.allMessages),
        ]);

        if (messageData) {
          setMessage({
            slug: messageData.slug,
            role: messageData.role,
            name: messageData.name,
            image: urlFor(messageData.photo).width(900).url(),
            intro: messageData.quote,
            body: messageData.fullMessage
              ? messageData.fullMessage.split("\n\n").filter(Boolean)
              : [],
          });
          console.log("✅ Loaded message from CMS:", messageData.name);
        } else {
          // Fallback to static data
          const found = staticMessages.find((m) => m.slug === slug);
          setMessage(found || staticMessages[0]);
          console.log("ℹ️ Using static message data");
        }

        if (allData && allData.length > 0) {
          setAllMessages(allData);
        } else {
          setAllMessages(staticMessages.map((m) => ({ slug: m.slug, name: m.name })));
        }
      } catch (error) {
        console.error("Error fetching message:", error);
        const found = staticMessages.find((m) => m.slug === slug);
        setMessage(found || staticMessages[0]);
        setAllMessages(staticMessages.map((m) => ({ slug: m.slug, name: m.name })));
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchMessage();
    } else {
      setMessage(staticMessages[0]);
      setAllMessages(staticMessages.map((m) => ({ slug: m.slug, name: m.name })));
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F6]">
        <p className="text-[24px] text-[#040617]" style={inter}>Loading message...</p>
      </section>
    );
  }

  if (!message) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F6]">
        <p className="text-[24px] text-[#040617]" style={inter}>Message not found</p>
      </section>
    );
  }

  const currentIndex = allMessages.findIndex((m) => m.slug === message.slug);
  const prevMessage = currentIndex > 0 ? allMessages[currentIndex - 1] : null;
  const nextMessage = currentIndex < allMessages.length - 1 ? allMessages[currentIndex + 1] : null;

  return (
    <main className="relative overflow-hidden bg-[#FAF9F6]">
      <BackgroundGrid />

      <section className="relative px-6 py-12 sm:px-10 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-[1650px]">
          <Link href="/" className="inline-flex items-center gap-2 text-[15px] text-[#040617]" style={inter}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>

          <div style={{ marginTop: "64px" }}>
            <div style={{ borderRadius: "36px", border: "1px solid #E5E6EB", background: "rgba(255,255,255,0.8)", padding: "64px", backdropFilter: "blur(8px)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "56px", alignItems: "start" }}>

                {/* LEFT IMAGE */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ position: "relative", width: "420px", flexShrink: 0 }}>
                  <div style={{ overflow: "hidden", borderRadius: "28px", border: "1px solid #E5E6EB", background: "#F4F4F1" }}>
                    <img
                      src={message.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"}
                      alt={message.name}
                      style={{ height: "620px", width: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                  </div>
                  <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "24px", borderRadius: "22px", background: "rgba(255,255,255,0.95)", padding: "20px 24px", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", backdropFilter: "blur(8px)" }}>
                    <p style={{ ...inter, fontSize: "15px", textTransform: "uppercase", letterSpacing: "0.25em", color: "#7A7D8B", margin: 0 }}>{message.role}</p>
                    <h3 style={{ ...inter, margin: "8px 0 0", fontSize: "26px", fontWeight: 600, lineHeight: 1.1, color: "#040617" }}>{message.name}</h3>
                  </div>
                </motion.div>

                {/* RIGHT CONTENT */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
                  <p style={{ ...inter, fontSize: "20px", fontWeight: 500, color: "#7A7D8B", margin: 0 }}>{message.role}</p>
                  <h1 style={{ ...inter, margin: "12px 0 0", fontSize: "86px", fontWeight: 600, lineHeight: 0.92, letterSpacing: "-0.07em", color: "#040617" }}>{message.name}</h1>

                  <div style={{ margin: "40px 0", display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ height: "8px", flex: 1, borderRadius: "999px", background: "#FFD900" }} />
                    <div style={{ width: "56px", height: "56px", borderRadius: "999px", background: "#FFD900", color: "#040617", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.12)", flexShrink: 0 }}>
                      <Quote size={24} />
                    </div>
                  </div>

                  <h2 style={{ ...inter, fontSize: "58px", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.05em", color: "#040617", margin: 0 }}>{message.intro}</h2>

                  <div style={{ marginTop: "48px", paddingLeft: "32px", borderLeft: "1px solid #E5E6EB", display: "flex", flexDirection: "column", gap: "32px" }}>
                    {message.body.map((paragraph, index) => (
                      <p key={index} style={{ ...inter, fontSize: "24px", lineHeight: 1.8, letterSpacing: "-0.02em", color: "#6F7181", margin: 0 }}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation — FIX: dynamic routes */}
          <div className="mt-20 flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {prevMessage ? (
                <Link href={`/messagesdetail/${prevMessage.slug}`} className="inline-flex items-center gap-4">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                    <ArrowLeft className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[20px] font-semibold text-[#040617]" style={inter}>Previous Message</p>
                    <p className="text-[17px] text-[#7A7D8B]" style={inter}>{prevMessage.name}</p>
                  </div>
                </Link>
              ) : (
                <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>This Is First Message</p>
              )}
            </div>
            <div>
              {nextMessage ? (
                <Link href={`/messagesdetail/${nextMessage.slug}`} className="inline-flex items-center gap-4">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#E5E6EB] text-[#040617] transition hover:bg-[#FFD900]">
                    <ArrowRight className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[20px] font-semibold text-[#040617]" style={inter}>Next Message</p>
                    <p className="text-[17px] text-[#7A7D8B]" style={inter}>{nextMessage.name}</p>
                  </div>
                </Link>
              ) : (
                <div className="text-right">
                  <p className="text-[20px] font-semibold text-[#7A7D8B]" style={inter}>This Is Last Message</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}