"use client";

import BoardOfDirectorsSection from "@/components/team/BoardOfDirectorsSection";
import StaffSection from "@/components/team/StaffSection";

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

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] px-5 py-14 sm:px-8 lg:px-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;700;800&family=inter:wght@400;500;600&display=swap');
      `}</style>

      <div className="relative mx-auto max-w-[1560px]">
        <div className="pointer-events-none absolute left-0 top-0 -translate-x-4 -translate-y-4 opacity-60">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-60">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 -translate-x-4 translate-y-4 opacity-60">
          <Sparkle />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-4 translate-y-4 opacity-60">
          <Sparkle />
        </div>

        <BoardOfDirectorsSection />
        <StaffSection />
      </div>
    </div>
  );
}