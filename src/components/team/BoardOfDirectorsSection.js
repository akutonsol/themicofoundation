"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";
import TeamProfileModal from "@/components/team/TeamProfileModal";

const staticBoardMembers = [
  { id: 1, role: "Emeritus Director", name: "Errol Lawrence Miller OJ, CD", department: "Board of Directors", tenure: "9 years", bio: "Errol Lawrence Miller provides long-standing leadership and governance support to the Foundation.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, role: "Secretary Manager", name: "Dr. Sylvester Tulloch, CD.", department: "Board of Directors", tenure: "6 years", bio: "Dr. Sylvester Tulloch contributes to the Foundation's leadership through strategic oversight.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, role: "Trustee", name: "Dr. R. Karl James CD.", department: "Board of Directors", tenure: "5 years", bio: "Dr. R. Karl James supports the Foundation through board leadership and mission alignment.", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80" },
];

function Sparkle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5L14 0Z" fill="#D9D9D9" />
    </svg>
  );
}

function BoardCard({ member, onOpen }) {
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
      <div className="relative overflow-hidden rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9]">
        <div className="pointer-events-none absolute right-3 top-3 opacity-20"><Sparkle /></div>
        <div className="aspect-[0.84/1] overflow-hidden">
          <img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-[16px] leading-[1.35] text-[#8A8E9D] sm:text-[18px]" style={{ fontFamily: "'Inter', sans-serif" }}>{member.role}</p>
        <h3 className="mt-1 text-[30px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#040617] sm:text-[34px]" style={{ fontFamily: "'Inter', sans-serif" }}>{member.name}</h3>
      </div>
    </motion.button>
  );
}

export default function BoardOfDirectorsSection() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState(staticBoardMembers);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await client.fetch(queries.boardMembers);
        if (data?.length > 0) {
          setMembers(data.map(m => ({
            id: m._id,
            role: m.role,
            name: m.name,
            department: m.department || 'Board of Directors',
            tenure: m.tenure || '',
            bio: m.bio || '',
            email: m.email || '',
            image: m.photo ? urlFor(m.photo).width(800).url() : staticBoardMembers[0].image,
          })));
          console.log('✅ Loaded board members from CMS:', data.length);
        }
      } catch (error) {
        console.error('Error fetching board members:', error);
      }
    }
    fetchMembers();
  }, []);

  return (
    <>
      <section>
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_520px] lg:items-start">
          <h1 className="text-[56px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#040617] sm:text-[78px] lg:text-[88px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Board of Directors
          </h1>
          <div className="lg:border-l lg:border-[#E5E6EB] lg:pl-6">
            <p className="max-w-[520px] text-[22px] leading-[1.45] text-[#7A7D8B] sm:text-[24px]" style={{ fontFamily: "'Inter', sans-serif" }}>
              The Mico Foundation is led by a 9-member Board with equal reps from the Trustees, University, and Alumni. Key roles like the President and Trustee serve as ex-officio members during their tenure.
            </p>
          </div>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {members.map(member => <BoardCard key={member.id} member={member} onOpen={setSelectedMember} />)}
        </div>
      </section>

      <TeamProfileModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}