"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function TrusteeLegacySection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 15%"],
  });

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22],
    [0, 1, 1]
  );

  const introY = useTransform(
    scrollYProgress,
    [0, 0.15],
    [50, 0]
  );

  const block1Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.3, 0.42],
    [0, 1, 1]
  );

  const block1Y = useTransform(
    scrollYProgress,
    [0.18, 0.3],
    [40, 0]
  );

  const block2Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.55, 0.7],
    [0, 1, 1]
  );

  const block2Y = useTransform(
    scrollYProgress,
    [0.4, 0.55],
    [40, 0]
  );

  const block3Opacity = useTransform(
    scrollYProgress,
    [0.68, 0.82, 1],
    [0, 1, 1]
  );

  const block3Y = useTransform(
    scrollYProgress,
    [0.68, 0.82],
    [40, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-28 sm:px-10 lg:px-16 lg:py-36"
    >
      {/* BACKGROUND GRID */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[5%] top-[12%] h-[620px] w-[620px] opacity-[0.08]">
          <div className="grid h-full w-full grid-cols-6 grid-rows-6">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="border border-black/[0.08]"
                style={{ borderRadius: "20px" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1480px]">
        {/* TITLE */}
        <motion.div
          style={{
            opacity: introOpacity,
            y: introY,
          }}
          className="text-center"
        >
          <h2
            className="text-[62px] font-semibold leading-[0.9] tracking-[-0.06em] text-black sm:text-[92px] lg:text-[132px]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Trustee Legacy
          </h2>

          <p
            className="mx-auto mt-8 max-w-[1080px] text-[24px] leading-[1.6] text-black/55 sm:text-[30px] lg:text-[38px]"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            A continuing story of leadership, stewardship, and educational
            transformation that has shaped generations across the Caribbean.
          </p>
        </motion.div>

        {/* CONTENT BLOCKS */}
        <div className="mx-auto mt-24 max-w-[1220px] space-y-16">
          {/* BLOCK 1 */}
          <motion.div
            style={{
              opacity: block1Opacity,
              y: block1Y,
            }}
            className="rounded-[34px] bg-black px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.18)] sm:px-12 sm:py-14"
          >
            <p
              className="text-[24px] leading-[1.9] tracking-[-0.02em] text-[#E5E5E5] sm:text-[30px] lg:text-[36px]"
              style={{ fontFamily: "'inter', sans-serif" }}
            >
              The Lady Mico Charity was established in 1835 by an Act of
              Parliament in England and Wales, with Sir Thomas Fowell Buxton
              serving as its first chairman. Under his leadership, the Charity
              rapidly expanded educational opportunities throughout the British
              colonies by establishing teachers’ colleges and elementary schools
              across Mauritius, the Seychelles, and the West Indies.
            </p>
          </motion.div>

          {/* BLOCK 2 */}
          <motion.div
            style={{
              opacity: block2Opacity,
              y: block2Y,
            }}
            className="rounded-[34px] bg-[#D7F04A] px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.10)] sm:px-12 sm:py-14"
          >
            <p
              className="text-[24px] leading-[1.9] tracking-[-0.02em] text-black sm:text-[30px] lg:text-[36px]"
              style={{ fontFamily: "'inter', sans-serif" }}
            >
              Today, The Mico University College in Kingston, Jamaica remains
              the only surviving institution from that original educational
              movement and stands as the longest sustained educational charity
              legacy in the West Indies. As the organization evolved into the
              Lady Mico Trust, its mission continued through sustained support
              for teacher training and educational advancement throughout the
              Caribbean.
            </p>
          </motion.div>

          {/* BLOCK 3 */}
          <motion.div
            style={{
              opacity: block3Opacity,
              y: block3Y,
            }}
            className="rounded-[34px] bg-black px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.18)] sm:px-12 sm:py-14"
          >
            <p
              className="text-[24px] leading-[1.9] tracking-[-0.02em] text-[#E5E5E5] sm:text-[30px] lg:text-[36px]"
              style={{ fontFamily: "'inter', sans-serif" }}
            >
              Over generations, the Trustees maintained a strong commitment to
              educational stewardship and public service. Professor The
              Honourable Errol Lawrence Miller, OJ, became the first and only
              citizen outside of the United Kingdom to serve as Trustee of the
              Lady Mico Trust. In 2000, the Jamaican assets of the Trust were
              transferred to The Mico Foundation, which now serves as the chief
              custodian of its enduring mission, history, and institutional
              legacy.
            </p>
          </motion.div>

          {/* CONTINUE HISTORY CTA BLOCK */}
<motion.div
  style={{
    opacity: block3Opacity,
    y: block3Y,
  }}
  className="mx-auto mt-20 max-w-[1220px]"
>
  <a
    href="/history"
    className="group relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[34px] bg-[#FFD900] px-10 py-16 shadow-[0_30px_90px_rgba(0,0,0,0.10)] transition-all duration-500 hover:scale-[1.01]"
  >
    {/* glow */}
    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl" />
    </div>

    {/* arrow */}
    <div className="absolute right-10 top-10 text-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </div>

    {/* content */}
    <div className="relative z-10 text-center">
      <p
        className="text-[48px] font-semibold leading-[0.95] tracking-[-0.05em] text-black sm:text-[72px] lg:text-[104px]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        Continue To Learn
      </p>

      <p
        className="mt-4 text-[22px] font-medium tracking-[-0.03em] text-black/70 sm:text-[30px] lg:text-[40px]"
        style={{ fontFamily: "'inter', sans-serif" }}
      >
        About Our History
      </p>
    </div>
  </a>
</motion.div>
        </div>
      </div>
    </section>
  );
}