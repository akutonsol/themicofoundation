"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };
const ACCENTS = ["#FFD900", "#5EDA71", "#60A5FA", "#F97316"];

const galleryVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], when: "beforeChildren", staggerChildren: 0.05 } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3 } },
};

const imageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const desktopTileClasses = [
  "col-span-2 row-span-1 aspect-[0.9/1]",
  "col-span-2 row-span-1 aspect-[0.9/1]",
  "col-span-2 row-span-1 aspect-[0.9/1]",
  "col-span-2 row-span-2 aspect-[0.9/1.8]",
  "col-span-5 row-span-2 aspect-[1.65/1]",
  "col-span-1 row-span-1 aspect-[0.7/1]",
  "col-span-1 row-span-1 aspect-[0.7/1]",
  "col-span-2 row-span-1 aspect-[1.15/1]",
  "col-span-3 row-span-1 aspect-[1.6/1]",
];

function Lightbox({ project, activeImageIndex, onClose, onNext, onPrev }) {
  const image = project.images[activeImageIndex];
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)', padding: '24px' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.96, y: 18, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: '1400px', background: '#0A1628', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ position: 'relative', aspectRatio: '16/9', width: '100%', background: '#0d1b2e' }}>
          {image?.url && <img src={image.url} alt={image.alt || project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>✕</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <p style={{ ...inter, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: project.accent || '#FFD900', margin: '0 0 4px' }}>{project.status}</p>
            <p style={{ ...inter, fontSize: '18px', fontWeight: 600, color: 'white', margin: '0 0 2px' }}>{project.title}</p>
            <p style={{ ...inter, fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Image {activeImageIndex + 1} of {project.images.length}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{ fn: onPrev, label: '←' }, { fn: onNext, label: '→' }].map(({ fn, label }, i) => (
              <button key={i} onClick={fn} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{label}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectImage({ image, index, className = "", onOpen, accent }) {
  return (
    <motion.button type="button" variants={imageVariants} onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-[10px] bg-[#0d1b2e] text-left ${className}`}
      whileHover={{ y: -3 }} transition={{ duration: 0.22 }}>
      <div className="relative h-full w-full">
        {image?.url && <img src={image.url} alt={image.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-semibold text-[#040617] opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: accent }}>View</div>
      </div>
    </motion.button>
  );
}

function GalleryDesktop({ project, onOpen }) {
  const images = useMemo(() => Array.from({ length: 9 }, (_, i) => project.images[i % project.images.length]), [project.images]);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={project.id} variants={galleryVariants} initial="initial" animate="animate" exit="exit"
        className="hidden lg:grid lg:grid-cols-10 lg:auto-rows-auto lg:gap-3">
        {images.map((img, i) => (
          <ProjectImage key={`${project.id}-${i}`} image={img} index={i} onOpen={onOpen} className={desktopTileClasses[i]} accent={project.accent} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryTablet({ project, onOpen }) {
  const images = useMemo(() => Array.from({ length: 6 }, (_, i) => project.images[i % project.images.length]), [project.images]);
  return (
    <AnimatePresence mode="wait">
      <motion.div key={project.id} variants={galleryVariants} initial="initial" animate="animate" exit="exit"
        className="hidden grid-cols-2 gap-3 sm:grid md:grid lg:hidden">
        {images.map((img, i) => (
          <ProjectImage key={`${project.id}-${i}`} image={img} index={i} onOpen={onOpen}
            className={i === 0 ? "aspect-[1.3/1] sm:col-span-2" : "aspect-[1/1]"} accent={project.accent} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryMobile({ project, onOpen }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={project.id} variants={galleryVariants} initial="initial" animate="animate" exit="exit"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:hidden">
        {project.images.map((img, i) => (
          <motion.button key={`${project.id}-${i}`} type="button" variants={imageVariants} onClick={() => onOpen(i)}
            className="group relative min-w-[84%] snap-center overflow-hidden rounded-[12px] bg-[#0d1b2e] aspect-[1/1.15]">
            {img?.url && <img src={img.url} alt={img.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default function CompletedProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Match both "complete" and "completed" status values
        const data = await client.fetch(`
          *[_type == "project" && (status == "completed" || status == "complete")] | order(order asc) {
            _id, title, "slug": slug.current, label, status,
            "images": gallery[]{
              "url": asset->url,
              "alt": alt
            }
          }
        `);
        if (data?.length > 0) {
          setProjects(data.map((p, i) => ({
            id: p._id,
            num: String(i + 1).padStart(2, '0'),
            status: 'Completed',
            title: p.title,
            href: `/projectdetail/${p.slug}`,
            accent: ACCENTS[i % ACCENTS.length],
            images: (p.images || []).filter(img => img?.url),
          })));
        }
      } catch (err) {
        console.error('Error fetching completed projects:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const lightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    if (lightboxOpen || projects.length === 0) return;
    const timer = setInterval(() => setActiveIndex(p => (p + 1) % projects.length), 5000);
    return () => clearInterval(timer);
  }, [lightboxOpen, projects.length]);

  useEffect(() => { setLightboxIndex(null); }, [activeIndex]);

  if (loading || projects.length === 0) return null;

  const activeProject = projects[activeIndex];
  const prev = () => setActiveIndex(p => (p - 1 + projects.length) % projects.length);
  const next = () => setActiveIndex(p => (p + 1) % projects.length);

  return (
    <>
      <section style={{ background: 'linear-gradient(160deg, #020C1B 0%, #001A2E 50%, #020C1B 100%)', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,72px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '40%', width: '600px', height: '500px', background: `radial-gradient(circle, ${activeProject.accent}10 0%, transparent 70%)`, pointerEvents: 'none', borderRadius: '50%', transition: 'background 0.6s ease' }} />

        <div style={{ maxWidth: '1800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(40px,6vw,64px)', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p style={{ ...inter, fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFD900', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'block', width: '24px', height: '1px', background: '#FFD900' }} />
                Project Gallery
              </p>
              <p style={{ ...inter, fontSize: 'clamp(14px,1.4vw,17px)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', margin: '0 0 10px' }}>
                {activeProject.status} · {activeProject.num}
              </p>
              <AnimatePresence mode="wait">
                <motion.h2 key={activeProject.id}
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ ...inter, fontSize: 'clamp(48px,7vw,106px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.05em', color: '#FFFFFF', margin: 0 }}>
                  {activeProject.title}<span style={{ color: activeProject.accent }}>.</span>
                </motion.h2>
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
              <Link href={activeProject.href} style={{ ...inter, fontSize: '16px', color: 'rgba(255,255,255,0.45)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                Learn More
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {[{ fn: prev, icon: <ArrowLeft size={17} /> }, { fn: next, icon: <ArrowRight size={17} /> }].map(({ fn, icon }, i) => (
                  <button key={i} onClick={fn} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = activeProject.accent; e.currentTarget.style.background = `${activeProject.accent}18` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}>
                    {icon}
                  </button>
                ))}
                <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
                  {projects.map((_, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)} style={{ height: '4px', width: i === activeIndex ? '28px' : '8px', borderRadius: '100px', background: i === activeIndex ? activeProject.accent : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {activeProject.images.length > 0 ? (
            <>
              <GalleryMobile project={activeProject} onOpen={setLightboxIndex} />
              <GalleryTablet project={activeProject} onOpen={setLightboxIndex} />
              <GalleryDesktop project={activeProject} onOpen={setLightboxIndex} />
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)', ...inter, fontSize: '18px' }}>
              No gallery images uploaded yet — add photos in the Gallery field in Sanity Studio.
            </div>
          )}

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '180px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: activeProject.accent, borderRadius: '100px' }}
                animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox project={activeProject} activeImageIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex(p => (p + 1) % activeProject.images.length)}
            onPrev={() => setLightboxIndex(p => (p - 1 + activeProject.images.length) % activeProject.images.length)} />
        )}
      </AnimatePresence>
    </>
  );
}