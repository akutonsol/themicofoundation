"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";
import TeamProfileModal from "@/components/team/TeamProfileModal";

const staticStaffMembers = [
  { id: 1, role: "Secretary Manager", name: "Mr. Burchell Duhaney J.P.", department: "Operations & Administration", email: "", tenure: "7 years", bio: "Burchell Duhaney leads the Foundation's day-to-day administration and strategic operations.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, role: "Program Coordinator", name: "Ms. Alicia Brown", department: "Programs", email: "", tenure: "4 years", bio: "Alicia supports program design and implementation across education and community initiatives.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, role: "Communications Officer", name: "Mr. David Clarke", department: "Communications", email: "", tenure: "3 years", bio: "David leads communications strategy and digital storytelling for the Foundation.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, role: "Administrative Officer", name: "Ms. Tanesha Williams", department: "Administration", email: "", tenure: "5 years", bio: "Tanesha oversees administrative workflows and internal coordination.", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80" },
];

function Sparkle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5L14 0Z" fill="#D9D9D9" />
    </svg>
  );
}

function StaffCard({ member, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(member)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="group text-left"
    >
      <div className="relative overflow-hidden rounded-[20px] border border-[rgba(4,6,23,0.07)] bg-[#FFFDF9] shadow-[var(--shadow-2)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-4)]">
        <div className="pointer-events-none absolute right-3 top-3 opacity-20"><Sparkle /></div>
        <div className="aspect-[0.84/1] overflow-hidden">
          <img src={member.image} alt={member.name} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-[16px] leading-[1.35] text-[#8A8E9D] sm:text-[18px]" style={{ fontFamily: "'Inter', sans-serif" }}>{member.role}</p>
        <h3 className="mt-1 text-[19px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#040617] sm:text-[21px]" style={{ fontFamily: "'Inter', sans-serif" }}>{member.name}</h3>
      </div>
    </motion.button>
  );
}

export default function StaffSection() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState(staticStaffMembers);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await client.fetch(queries.staffMembers);
        if (data?.length > 0) {
          setMembers(data.map(m => ({
            id: m._id,
            role: m.role,
            name: m.name,
            department: m.department || '',
            tenure: m.tenure || '',
            bio: m.bio || '',
            email: m.email || '',
            image: m.photo ? urlFor(m.photo).width(800).url() : staticStaffMembers[0].image,
          })));
          console.log('✅ Loaded staff members from CMS:', data.length);
        }
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    }
    fetchMembers();
  }, []);

  return (
    <>
      <section className="mt-24">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_520px] lg:items-start">
          <h1 className="text-[56px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#040617] sm:text-[78px] lg:text-[88px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Staff
          </h1>
          <div className="lg:border-l lg:border-[rgba(4,6,23,0.07)] lg:pl-6">
            <p className="max-w-[520px] text-[22px] leading-[1.45] text-[#7A7D8B] sm:text-[24px]" style={{ fontFamily: "'Inter', sans-serif" }}>
              The Mico Foundation is run by a 5-member team led by Secretary Manager Burchell Duhaney, committed to delivering impactful, values-driven work.
            </p>
          </div>
        </div>
        <div className="grid gap-x-5 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {members.map(member => <StaffCard key={member.id} member={member} onOpen={setSelectedMember} />)}
        </div>
      </section>

      <TeamProfileModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}