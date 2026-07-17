"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, X, ArrowRight, ArrowLeft } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

const projects = [
  {
    id: 1,
    num: "01",
    category: "Scholarships",
    title: "Student Scholarship Fund",
    description: "Opening access to education through tuition assistance, books, meals, transportation, and academic support initiatives.",
    fullDescription: "The Student Scholarship Fund provides comprehensive financial support to deserving students pursuing higher education. We cover tuition fees, textbooks, meals, transportation costs, and provide academic mentorship programs. Our initiative ensures that financial barriers never stand between talented students and their educational dreams.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80",
    accent: "#FFD900",
    href: "/projects",
  },
  {
    id: 2,
    num: "02",
    category: "Historic Restoration",
    title: "Buxton College Restoration",
    description: "Preserving heritage architecture connected to The Mico legacy while creating renewed educational spaces for future generations.",
    fullDescription: "The Buxton College Restoration project honors our rich educational heritage by preserving and modernizing historic campus buildings. This initiative combines architectural preservation with modern educational infrastructure, creating spaces that respect our past while serving future generations.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80",
    accent: "#5EDA71",
    href: "/projectdetail?slug=buxton-college",
  },
  {
    id: 3,
    num: "03",
    category: "Campus Development",
    title: "Campus Modernization",
    description: "Creating modern classrooms, upgraded facilities, smart learning spaces, and improved educational infrastructure.",
    fullDescription: "Our Campus Modernization initiative transforms traditional learning environments into state-of-the-art educational facilities. We're implementing smart classroom technology, creating collaborative learning spaces, upgrading laboratories, and building sustainable infrastructure.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
    accent: "#60A5FA",
    href: "/projects",
  },
  {
    id: 4,
    num: "04",
    category: "Community Impact",
    title: "Community Learning Programs",
    description: "Supporting outreach, inclusive learning initiatives, rural education programs, and community-centered development.",
    fullDescription: "Community Learning Programs extend educational opportunities beyond traditional campus boundaries. We operate mobile learning centers, provide adult education classes, support rural schools, and create inclusive programs for underserved communities.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80",
    accent: "#F97316",
    href: "/projects",
  },
];

function ProjectRow({ project, index, isActive, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '20px 24px',
          borderRadius: '16px',
          background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
          borderLeft: `3px solid ${isActive ? project.accent : 'transparent'}`,
          transition: 'all 0.25s ease',
        }}
        whileHover={{ background: 'rgba(255,255,255,0.04)', x: 4 }}
      >
        <span style={{ ...inter, fontSize: '12px', color: isActive ? project.accent : 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.1em', minWidth: '28px' }}>
          {project.num}
        </span>
        <div style={{ flex: 1 }}>
          <p style={{ ...inter, fontSize: '11px', color: isActive ? project.accent : 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            {project.category}
          </p>
          <p style={{ ...inter, fontSize: '18px', fontWeight: 600, color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)', margin: 0, letterSpacing: '-0.02em' }}>
            {project.title}
          </p>
        </div>
        <motion.div
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={16} color={project.accent} />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

function DetailModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', padding: '24px' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 24, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '1100px', background: '#0A1628', borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'var(--shadow-dark-4)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', minHeight: '560px' }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="50vw" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #0A1628)' }} />
          <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
            <span style={{ ...inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: project.accent, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '100px', border: `1px solid ${project.accent}40` }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '32px', marginLeft: 'auto' }}>
              <X size={18} color="white" />
            </button>
            <p style={{ ...inter, fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>{project.num}</p>
            <h2 style={{ ...inter, fontSize: '42px', fontWeight: 700, color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 24px' }}>{project.title}</h2>
            <p style={{ ...inter, fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{project.fullDescription}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
            <a href="/endowments" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', borderRadius: '100px', border: `1px solid ${project.accent}`, color: project.accent, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}>
              Endowments <ArrowUpRight size={14} />
            </a>
            <a href="/donate" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', borderRadius: '100px', background: project.accent, color: '#040617', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Donate Now <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FoundationProjectsDeck() {
  const [active, setActive] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const activeProject = projects[active];

  const prev = () => setActive(i => (i - 1 + projects.length) % projects.length);
  const next = () => setActive(i => (i + 1) % projects.length);

  return (
    <>
      <section style={{ background: 'linear-gradient(160deg, #020C1B 0%, #001A2E 50%, #020C1B 100%)', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,72px)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        {/* Glow blob */}
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '600px', height: '600px', background: `radial-gradient(circle, ${activeProject.accent}12 0%, transparent 70%)`, pointerEvents: 'none', transition: 'background 0.6s ease', borderRadius: '50%' }} />

        <div style={{ maxWidth: '1700px', margin: '0 auto', position: 'relative' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(48px,6vw,80px)', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p style={{ ...inter, fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFD900', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'block', width: '24px', height: '1px', background: '#FFD900' }} />
                Foundation Initiatives
              </p>
              <h2 style={{ ...inter, fontSize: 'clamp(52px,7vw,104px)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.05em', color: '#FFFFFF', margin: 0 }}>
                Building The Future<br />
                <span style={{ color: activeProject.accent, transition: 'color 0.4s ease' }}>Through Projects.</span>
              </h2>
            </div>
            <p style={{ ...inter, fontSize: 'clamp(16px,1.6vw,20px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '420px', margin: 0 }}>
              Transformational initiatives supporting education, restoration, and community development.
            </p>
          </div>

          {/* Main layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '40px', alignItems: 'start' }}>

            {/* Left — project list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ ...inter, fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 16px 24px' }}>
                {projects.length} Projects
              </p>
              {projects.map((p, i) => (
                <ProjectRow key={p.id} project={p} index={i} isActive={i === active} onClick={() => setActive(i)} />
              ))}

              {/* Nav + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px', padding: '0 24px' }}>
                <button onClick={prev} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = activeProject.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}>
                  <ArrowLeft size={18} />
                </button>
                <button onClick={next} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = activeProject.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}>
                  <ArrowRight size={18} />
                </button>
                <span style={{ ...inter, fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>
                  {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Right — featured card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#0A1628', boxShadow: `var(--shadow-dark-4), 0 0 60px ${activeProject.accent}20` }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '380px' }}>
                  <Image src={activeProject.image} alt={activeProject.title} fill style={{ objectFit: 'cover' }} sizes="60vw" priority />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0A1628 100%)' }} />

                  {/* Category badge */}
                  <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ ...inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: activeProject.accent, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '100px', border: `1px solid ${activeProject.accent}50` }}>
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Number */}
                  <div style={{ position: 'absolute', top: '20px', right: '20px', ...inter, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    {activeProject.num}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '32px 36px 36px' }}>
                  <h3 style={{ ...inter, fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 16px' }}>
                    {activeProject.title}
                  </h3>
                  <p style={{ ...inter, fontSize: '17px', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: '0 0 32px' }}>
                    {activeProject.description}
                  </p>

                  {/* Progress dots */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
                    {projects.map((_, i) => (
                      <button key={i} onClick={() => setActive(i)} style={{ height: '4px', width: i === active ? '32px' : '8px', borderRadius: '100px', background: i === active ? activeProject.accent : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => setModalProject(activeProject)}
                      style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '100px', background: activeProject.accent, color: '#040617', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      View Details <ArrowUpRight size={14} />
                    </button>
                    <a href={activeProject.href} style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .projects-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <AnimatePresence>
        {modalProject && <DetailModal project={modalProject} onClose={() => setModalProject(null)} />}
      </AnimatePresence>
    </>
  );
}