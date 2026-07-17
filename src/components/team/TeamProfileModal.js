"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function TeamProfileModal({ member, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[980px] overflow-hidden rounded-[28px] bg-[#FFFDF9] shadow-[var(--shadow-5)]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#040617]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-0 md:grid-cols-[360px_1fr]">
              <div className="relative min-h-[360px] bg-neutral-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <p
                  className="text-[18px] text-[#8A8E9D]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  {member.role}
                </p>

                <h2
                  className="mt-2 text-[34px] font-semibold leading-[1.05] tracking-[-0.05em] text-[#040617] sm:text-[46px]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  {member.name}
                </h2>

                {member.department && (
                  <p
                    className="mt-3 text-[18px] text-[#565B6B]"
                    style={{ fontFamily: "'inter', sans-serif" }}
                  >
                    {member.department}
                  </p>
                )}

                <p
                  className="mt-6 text-[19px] leading-[1.6] text-[#6F7181]"
                  style={{ fontFamily: "'inter', sans-serif" }}
                >
                  {member.bio}
                </p>

                {(member.email || member.tenure) && (
                  <div className="mt-8 space-y-2">
                    {member.email && (
                      <p
                        className="text-[17px] text-[#040617]"
                        style={{ fontFamily: "'inter', sans-serif" }}
                      >
                        <span className="text-[#8A8E9D]">Email:</span> {member.email}
                      </p>
                    )}

                    {member.tenure && (
                      <p
                        className="text-[17px] text-[#040617]"
                        style={{ fontFamily: "'inter', sans-serif" }}
                      >
                        <span className="text-[#8A8E9D]">Tenure:</span> {member.tenure}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}