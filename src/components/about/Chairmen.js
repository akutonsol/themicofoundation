"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticChairmen = [
  { id: 1, years: "1981 - 1986", name: "Colonel Lemuel Lindo, OD, JP.", image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg" },
  { id: 2, years: "1989 - 1994", name: "Major Neil Dwyer", image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg" },
  { id: 3, years: "1999 - 2015", name: "Professor Neville Ying, CD.", image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg" },
  { id: 4, years: "2015 - Present", name: "Dr. Sylvester Tulloch, CD", image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg" },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-2%] bottom-[-10%] h-[520px] w-[720px] opacity-[0.18]">
        <div className="grid h-full w-full grid-cols-8 grid-rows-6">
          {Array.from({ length: 48 }).map((_, i) => (<div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />))}
        </div>
      </div>
      <div className="absolute right-[-2%] top-[46%] h-[320px] w-[580px] opacity-[0.14]">
        <div className="grid h-full w-full grid-cols-7 grid-rows-4">
          {Array.from({ length: 28 }).map((_, i) => (<div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />))}
        </div>
      </div>
      <div className="absolute left-[4%] top-[27%] text-[46px] text-[#B6BDC8]">✦</div>
      <div className="absolute right-[4%] top-[27%] text-[46px] text-[#B6BDC8]">✦</div>
    </div>
  );
}

export default function Chairmen() {
  const [chairmen, setChairmen] = useState(staticChairmen);

  useEffect(() => {
    async function fetchChairmen() {
      try {
        const data = await client.fetch(queries.chairmen);
        if (data?.length > 0) {
          setChairmen(data.map(p => ({
            id: p._id,
            years: p.years,
            name: p.name,
            image: p.photo ? urlFor(p.photo).width(600).url() : staticChairmen[0].image,
          })));
        }
      } catch (error) {
        console.error('Error fetching chairmen:', error);
      }
    }
    fetchChairmen();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
      <BackgroundGrid />
      <div className="relative mx-auto max-w-[1650px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}
          className="text-[72px] font-semibold leading-[0.9] tracking-[-0.08em] text-[#040617] sm:text-[110px] lg:text-[150px]"
          style={inter}
        >
          Chairmans
        </motion.h2>
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {chairmen.map((person, index) => (
            <motion.article key={person.id}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.08 }}
              className="max-w-[280px]"
            >
              <div className="overflow-hidden rounded-[18px] border border-[rgba(4,6,23,0.07)] bg-white" style={{ boxShadow: "var(--shadow-2)" }}>
                <img src={person.image} alt={person.name} className="h-[300px] w-full object-cover object-top" />
              </div>
              <p className="mt-4 text-[18px] leading-[1.2] text-[#7A7D8B]" style={inter}>{person.years}</p>
              <h3 className="mt-1 text-[28px] font-semibold leading-[1.18] tracking-[-0.05em] text-[#040617] sm:text-[30px]" style={inter}>{person.name}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
