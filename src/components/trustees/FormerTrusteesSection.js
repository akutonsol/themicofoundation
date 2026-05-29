"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const staticFormerTrustees = [
  { id: 1, years: "1821-1836", name: "Sir Stephen Lushington", description: "Sir Stephen Lushington a British judge, Member of Parliament, and a radical for the abolition of slavery and capital punishment. He was influential in the transfer of the Funds of Lady Mico Charity to establish educational institutions in the West Indies.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, years: "1836-1845", name: "Sir Thomas Fowell Buxton", description: "The First chairman for the Lady Mico Charity from 1836-1845, and superintended of the Negro Education Grant. Under his leadership, four teachers colleges, and 300 elementary schools were set up by the charity in the British colonies of Mauritius, the Seychelles, and the West Indies.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, years: "1984-2006", name: "Professor The Honourable Errol Miller, OJ CD", description: "The first citizen outside of the United Kingdom to become a Trustee of the Lady Mico Trust. Professor Miller became a Trustee in 1984.", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80" },
];

function Sparkle({ className = "" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill="#A8B1C7" fillOpacity="0.35" />
    </svg>
  );
}

function GridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[6%] top-[9%] h-[560px] w-[500px] opacity-20">
        <div className="grid h-full w-full grid-cols-6 grid-rows-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-black/10" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-[3%] left-[2%] h-[280px] w-[360px] opacity-15">
        <div className="grid h-full w-full grid-cols-5 grid-rows-5">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="border border-black/10" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <Sparkle className="absolute left-4 top-4" />
      <Sparkle className="absolute right-4 top-4" />
      <Sparkle className="absolute bottom-4 left-4" />
      <Sparkle className="absolute bottom-4 right-4" />
    </div>
  );
}

function TrusteeCard({ trustee }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="pointer-events-none absolute inset-0">
        <Sparkle className="absolute left-[-18px] top-[40px]" />
        <Sparkle className="absolute right-[-14px] top-[120px]" />
        <Sparkle className="absolute bottom-[120px] left-[0px]" />
        <Sparkle className="absolute bottom-[30px] right-[20px]" />
      </div>
      <div className="relative overflow-hidden rounded-[22px] border border-black/10 bg-white">
        <img src={trustee.image} alt={trustee.name} className="h-[330px] w-[270px] object-cover sm:h-[380px] sm:w-[300px] lg:h-[420px] lg:w-[320px]" />
      </div>
      <p className="mt-4 text-[18px] text-black/55" style={{ fontFamily: "'Inter', sans-serif" }}>{trustee.years}</p>
      <h3 className="mt-1 max-w-[420px] text-[22px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[26px]" style={{ fontFamily: "'Inter', sans-serif" }}>{trustee.name}</h3>
      <p className="mt-4 max-w-[430px] text-[18px] leading-[1.58] text-black/70 sm:text-[20px]" style={{ fontFamily: "'Inter', sans-serif" }}>{trustee.description}</p>
    </motion.article>
  );
}

export default function FormerTrusteesSection() {
  const [trustees, setTrustees] = useState(staticFormerTrustees);

  useEffect(() => {
    async function fetchTrustees() {
      try {
        const data = await client.fetch(queries.formerTrustees);
        if (data?.length > 0) {
          setTrustees(data.map(t => ({
            id: t._id,
            years: t.years,
            name: t.name,
            description: t.description,
            image: t.photo ? urlFor(t.photo).width(800).url() : staticFormerTrustees[0].image,
          })));
        }
      } catch (error) {
        console.error('Error fetching former trustees:', error);
      }
    }
    fetchTrustees();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-14">
      <GridOverlay />
      <div className="relative mx-auto max-w-[1560px]">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="mx-auto max-w-[1420px] text-[24px] font-semibold leading-[1.35] tracking-[-0.03em] text-black/45 sm:text-[34px] lg:text-[40px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            "The Longer I Live, The More I Am Certain That The Great Difference Between Men—Between The Feeble And The Powerful, The Great And The Insignificant—Is Energy, Invincible Determination—A Purpose Once Fixed, And Then—Death Or Victory!"
          </p>
          <p className="mt-5 text-[24px] font-semibold text-black sm:text-[34px]" style={{ fontFamily: "'Inter', sans-serif" }}>Thomas Fowell Buxton</p>
          <h1 className="mt-10 text-[56px] font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-[82px] lg:text-[98px]" style={{ fontFamily: "'Inter', sans-serif" }}>Former Trustees</h1>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {trustees.map(trustee => <TrusteeCard key={trustee.id} trustee={trustee} />)}
        </div>
      </div>
    </section>
  );
}
