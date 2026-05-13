"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TeamProfileModal from "@/components/team/TeamProfileModal";

const boardMembers = [
  {
    id: 1,
    role: "Emeritus Director",
    name: "Errol Lawrence Miller OJ, CD",
    department: "Board of Directors",
    tenure: "9 years",
    bio: "Errol Lawrence Miller provides long-standing leadership and governance support to the Foundation, helping guide institutional direction and board stewardship.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    role: "Secretary Manager",
    name: "Dr. Sylvester Tulloch, CD.",
    department: "Board of Directors",
    tenure: "6 years",
    bio: "Dr. Sylvester Tulloch contributes to the Foundation’s leadership through strategic oversight, governance participation, and institutional continuity.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    role: "Trustee",
    name: "Dr. R. Karl James CD.",
    department: "Board of Directors",
    tenure: "5 years",
    bio: "Dr. R. Karl James supports the Foundation through board leadership, mission alignment, and long-term strategic guidance.",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    role: "Emeritus Director",
    name: "Errol Lawrence Miller OJ, CD",
    department: "Board of Directors",
    tenure: "9 years",
    bio: "Errol Lawrence Miller provides long-standing leadership and governance support to the Foundation, helping guide institutional direction and board stewardship.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    role: "Secretary Manager",
    name: "Dr. Sylvester Tulloch, CD.",
    department: "Board of Directors",
    tenure: "6 years",
    bio: "Dr. Sylvester Tulloch contributes to the Foundation’s leadership through strategic oversight, governance participation, and institutional continuity.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    role: "Trustee",
    name: "Dr. R. Karl James CD.",
    department: "Board of Directors",
    tenure: "5 years",
    bio: "Dr. R. Karl James supports the Foundation through board leadership, mission alignment, and long-term strategic guidance.",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    role: "Emeritus Director",
    name: "Errol Lawrence Miller OJ, CD",
    department: "Board of Directors",
    tenure: "9 years",
    bio: "Errol Lawrence Miller provides long-standing leadership and governance support to the Foundation, helping guide institutional direction and board stewardship.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    role: "Secretary Manager",
    name: "Dr. Sylvester Tulloch, CD.",
    department: "Board of Directors",
    tenure: "6 years",
    bio: "Dr. Sylvester Tulloch contributes to the Foundation’s leadership through strategic oversight, governance participation, and institutional continuity.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    role: "Trustee",
    name: "Dr. R. Karl James CD.",
    department: "Board of Directors",
    tenure: "5 years",
    bio: "Dr. R. Karl James supports the Foundation through board leadership, mission alignment, and long-term strategic guidance.",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    role: "Emeritus Director",
    name: "Errol Lawrence Miller OJ, CD",
    department: "Board of Directors",
    tenure: "9 years",
    bio: "Errol Lawrence Miller provides long-standing leadership and governance support to the Foundation, helping guide institutional direction and board stewardship.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
];

function Sparkle({ className = "" }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5L14 0Z"
        fill="#D9D9D9"
      />
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
        <div className="pointer-events-none absolute right-3 top-3 opacity-20">
          <Sparkle />
        </div>

        <div className="aspect-[0.84/1] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="mt-3">
        <p
          className="text-[16px] leading-[1.35] text-[#8A8E9D] sm:text-[18px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          {member.role}
        </p>

        <h3
          className="mt-1 text-[30px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#040617] sm:text-[34px]"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          {member.name}
        </h3>
      </div>
    </motion.button>
  );
}

export default function BoardOfDirectorsSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <section>
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_520px] lg:items-start">
          <h1
            className="text-[56px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#040617] sm:text-[78px] lg:text-[88px]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Board of Directors
          </h1>

          <div className="lg:border-l lg:border-[#E5E6EB] lg:pl-6">
            <p
              className="max-w-[520px] text-[22px] leading-[1.45] text-[#7A7D8B] sm:text-[24px]"
              style={{ fontFamily: "'inter', sans-serif" }}
            >
              The Mico Foundation is led by a 9-member Board with equal reps from
              the Trustees, University, and Alumni. Key roles like the President
              and Trustee serve as ex-officio members during their tenure.
            </p>
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {boardMembers.map((member) => (
            <BoardCard
              key={member.id}
              member={member}
              onOpen={setSelectedMember}
            />
          ))}
        </div>
      </section>

      <TeamProfileModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}