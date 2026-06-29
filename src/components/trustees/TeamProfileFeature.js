"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };
const CARD_W = 457;
const PANEL_W = 477;
const CARD_H = 941;
const GAP = 15;

const staticTeam = [
  { name: "Kelly Markus", role: "CVO & Owner", email: "kmarkus@hunterspoint.co", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80", bio: "Kelly most recently served as the VP of Experiential Marketing at Refinery29. She grew top and bottom line revenue over $16M in Y1 and exceeded financial goals to $24M in Y2." },
  { name: "Edward Chiquitucto", role: "Design Director", email: "edward@micofoundation.org", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80", bio: "Edward brings creative direction, visual storytelling, and brand experience across design-led campaigns and institutional projects." },
  { name: "Carin Murphy", role: "Managing Director", email: "carin@micofoundation.org", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80", bio: "Carin leads strategy, partnerships, operations, and stakeholder alignment across foundation initiatives." },
  { name: "Mars Khan", role: "Associate Producer", email: "mars@micofoundation.org", image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=1000&q=80", bio: "Mars supports production, coordination, community engagement, and project execution across major initiatives." },
  { name: "Jasmine Clarke", role: "Program Coordinator", email: "jasmine@micofoundation.org", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80", bio: "Jasmine supports education programs, donor coordination, community outreach, and special project development." },
];

function ProfilePanel({ member }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={member.name}
        initial={{ opacity: 0, width: 0, x: -20 }}
        animate={{ opacity: 1, width: PANEL_W, x: 0 }}
        exit={{ opacity: 0, width: 0, x: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: CARD_H, background: "#FFFDF9", color: "#040617", position: "relative", padding: "47px 45px 44px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,217,0,0.45)" }}
      >
        <h2 style={{ ...inter, margin: 0, fontSize: "40px", lineHeight: "0.95", letterSpacing: "-0.075em", fontWeight: 900, color: "#040617" }}>{member.name}</h2>
        <p style={{ ...inter, margin: "26px 0 62px", fontSize: "18px", lineHeight: "1.2", fontWeight: 500, color: "#6F7181" }}>{member.role}</p>
        <div style={{ height: "620px", overflowY: "auto", paddingRight: "28px" }}>
          <p style={{ ...inter, margin: 0, fontSize: "19px", lineHeight: "1.6", fontWeight: 400, color: "#040617" }}>{member.bio}</p>
        </div>
        <p style={{ ...inter, position: "absolute", left: "45px", bottom: "47px", margin: 0, fontSize: "13px", fontWeight: 500, color: "#6F7181" }}>{member.email}</p>
      </motion.div>
    </AnimatePresence>
  );
}

function TeamImageCard({ member, isActive, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.25 }}
      style={{ width: CARD_W, height: CARD_H, overflow: "hidden", position: "relative", flexShrink: 0, background: "#000d1f" }}
    >
      <img src={member.image} alt={member.name} style={{ width: CARD_W, height: CARD_H, objectFit: "cover", objectPosition: "center", display: "block", filter: isActive ? "brightness(0.7) saturate(0.8)" : "brightness(0.75) saturate(0.85)" }} />
      {!isActive && (
        <>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,15,40,0.75), rgba(0,15,40,0.08) 62%)" }} />
          <motion.button type="button" onClick={(e) => { e.stopPropagation(); onClick(); }}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            style={{ ...inter, position: "absolute", left: "24px", bottom: "28px", display: "inline-flex", alignItems: "center", gap: "10px", background: "#FFD900", border: "none", color: "#040617", fontSize: "13px", fontWeight: 800, padding: "10px 18px", borderRadius: "999px", cursor: "pointer", boxShadow: "0 12px 28px rgba(0,0,0,0.35)", letterSpacing: "-0.01em" }}
          >
            Profile <span style={{ fontSize: "15px", lineHeight: 1 }}>→</span>
          </motion.button>
        </>
      )}
    </motion.div>
  );
}

export default function TeamProfileFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [team, setTeam] = useState(staticTeam);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchBoardMembers() {
      try {
        const data = await client.fetch(queries.trustees);
        if (data?.length > 0) {
          setTeam(data.map(m => ({
            name: m.name,
            role: m.role,
            email: m.email || '',
            bio: m.bio || '',
            image: m.photo ? urlFor(m.photo).width(1000).url() : staticTeam[0].image,
          })));
        }
      } catch (error) {
        console.error('Error fetching board members:', error);
      }
    }
    fetchBoardMembers();
  }, []);

  const maxDrag = -1 * ((CARD_W + GAP) * team.length + PANEL_W + GAP * team.length - 1200);

  return (
    <section
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ width: "100%", height: "971px", background: "#001f3f", overflow: "hidden", border: "2px solid #001f3f", position: "relative", padding: `${GAP}px` }}
    >
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} transition={{ duration: 0.25 }}
            style={{ ...inter, position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 20, background: "#FFD900", color: "#040617", padding: "12px 18px", borderRadius: "999px", fontSize: "14px", fontWeight: 800, boxShadow: "0 18px 45px rgba(0,0,0,0.35)", pointerEvents: "none" }}
          >
            Drag to see more
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        ref={carouselRef}
        drag="x" dragElastic={0.06} dragMomentum
        dragConstraints={{ left: maxDrag, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
        style={{ display: "flex", gap: `${GAP}px`, height: CARD_H, width: "max-content", cursor: "grab" }}
      >
        {team.map((member, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={member.name} style={{ display: "flex", gap: `${GAP}px`, height: CARD_H, flexShrink: 0 }}>
              <TeamImageCard member={member} isActive={isActive} onClick={() => setActiveIndex(index)} />
              {isActive && <ProfilePanel member={member} />}
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
