"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

function Field({ label, type = "text", textarea = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] text-[#414651]" style={inter}>
        {label}
      </label>

      {textarea ? (
        <textarea
          placeholder="Start Typing..."
          rows={5}
          className="resize-none rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 py-3 text-[16px] text-[#040617] outline-none transition focus:border-[#FFD900]"
          style={inter}
        />
      ) : (
        <input
          type={type}
          placeholder="Start Typing..."
          className="rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 py-3 text-[16px] text-[#040617] outline-none transition focus:border-[#FFD900]"
          style={inter}
        />
      )}
    </div>
  );
}

function Ribbon({ color, offset, textColor = "#040617" }) {
  return (
    <div
      className="absolute left-[-220px] top-[420px] hidden h-[72px] w-[980px] rotate-45 items-center gap-10 overflow-hidden lg:flex"
      style={{
        backgroundColor: color,
        transform: `rotate(45deg) translateY(${offset}px)`,
      }}
    >
      <div className="flex animate-[marquee_18s_linear_infinite] items-center gap-10 whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="text-[26px] font-semibold tracking-[-0.04em]"
            style={{ ...inter, color: textColor }}
          >
            Together For Better Education ✦
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SponsorshipForm() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <Ribbon color="#58DE6E" offset={76} />
      <Ribbon color="#FFD900" offset={0} />

      <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="pt-2"
        >
          <h2
            className="text-[34px] font-semibold tracking-[-0.05em] text-[#040617] sm:text-[42px]"
            style={inter}
          >
            Become Our Sponsor
          </h2>

          <div className="mt-8 max-w-[720px] border-l border-[#E5E6EB] pl-5">
            <p
              className="text-[20px] leading-[1.5] tracking-[-0.02em] text-[#7A7D8B]"
              style={inter}
            >
              The Mico University College has served Jamaica, the wider
              Caribbean and beyond for more than 180 years. This tradition of
              endurance and resilience in delivering quality teacher education
              made The Mico an iconic institution of profound worth in the
              western hemisphere during the 21st century.
            </p>

            <p
              className="mt-4 text-[20px] leading-[1.5] tracking-[-0.02em] text-[#7A7D8B]"
              style={inter}
            >
              Have a project in mind? Need our expertise? Please complete the
              form below and we will be in touch with you as soon as possible.
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative overflow-hidden rounded-[22px] border border-[#E5E6EB] bg-[#FFFDF9] p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
            <div className="grid h-full w-full grid-cols-7 grid-rows-8">
              {Array.from({ length: 56 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-black/[0.05]"
                  style={{ borderRadius: "18px" }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <h3
              className="mb-8 text-center text-[30px] font-semibold tracking-[-0.04em] text-[#040617]"
              style={inter}
            >
              Sponsorship Form
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First Name" />
              <Field label="Last Name" />
            </div>

            <div className="mt-5">
              <Field label="Email" type="email" />
            </div>

            <div className="mt-5">
              <Field label="Address Line 1" />
            </div>

            <div className="mt-5">
              <Field label="Address Line 2 (Optional)" />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Country" />
              <Field label="City" />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="ZIP/Postal Code" />
              <Field label="State/Province" />
            </div>

            <div className="mt-5">
              <Field label="Subject" />
            </div>

            <div className="mt-5">
              <Field label="Message" textarea />
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="inline-flex min-w-[190px] items-center justify-center gap-3 rounded-[18px] bg-[#FFD900] px-7 py-4 text-[16px] font-semibold text-[#040617] transition hover:scale-[1.02]"
                style={inter}
              >
                Submit
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}