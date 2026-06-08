"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

function MagazineReader({ magazine, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom]               = useState(1);
  const [direction, setDirection]     = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panOffset,    setPanOffset]    = useState({ x:0, y:0 });
  const [isDragging,   setIsDragging]   = useState(false);
  const dragStart = useRef(null);
  const lastPan   = useRef({ x:0, y:0 });
  const viewerRef = useRef(null);
  const totalPages = magazine.pages.length;

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setCurrentPage(Math.max(0, Math.min(index, totalPages - 1)));
    setPanOffset({ x:0, y:0 });
    lastPan.current = { x:0, y:0 };
  }, [totalPages]);

  const prev = useCallback(() => { if (currentPage > 0) goTo(currentPage - 1, -1); }, [currentPage, goTo]);
  const next = useCallback(() => { if (currentPage < totalPages - 1) goTo(currentPage + 1, 1); }, [currentPage, totalPages, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")    prev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown")   next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  // Pan / drag handlers
  const onMouseDown = useCallback((e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - lastPan.current.x, y: e.clientY - lastPan.current.y };
  }, [zoom]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging || !dragStart.current) return;
    const nx = e.clientX - dragStart.current.x;
    const ny = e.clientY - dragStart.current.y;
    setPanOffset({ x: nx, y: ny });
    lastPan.current = { x: nx, y: ny };
  }, [isDragging]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch pan
  const onTouchStart = useCallback((e) => {
    if (zoom <= 1) return;
    const t = e.touches[0];
    dragStart.current = { x: t.clientX - lastPan.current.x, y: t.clientY - lastPan.current.y };
  }, [zoom]);

  const onTouchMove = useCallback((e) => {
    if (!dragStart.current) return;
    const t = e.touches[0];
    const nx = t.clientX - dragStart.current.x;
    const ny = t.clientY - dragStart.current.y;
    setPanOffset({ x: nx, y: ny });
    lastPan.current = { x: nx, y: ny };
  }, []);

  // Reset pan when zoom returns to 1
  useEffect(() => {
    if (zoom <= 1) {
      setPanOffset({ x:0, y:0 });
      lastPan.current = { x:0, y:0 };
    }
  }, [zoom]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const variants = {
    enter:  (dir) => ({ x: dir > 0 ?  80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir > 0 ? -80 :  80, opacity: 0 }),
  };

  const currentImg = magazine.pages[currentPage];

  return (
    <motion.div
      ref={viewerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "rgba(4,6,23,0.97)" }}
    >
      <style>{`
        .mag-thumb:hover { opacity: 1 !important; border-color: #FFD900 !important; }
        .mag-thumb.active { border-color: #FFD900 !important; opacity: 1 !important; }
        @media (max-width: 768px) { .mag-sidebar { display: none !important; } }
      `}</style>

      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <BookOpen size={18} color="#FFD900" />
          <div>
            <p style={{ ...inter, fontSize:"14px", fontWeight:600, color:"#FFFFFF", margin:0 }}>{magazine.title}</p>
            {magazine.issue && <p style={{ ...inter, fontSize:"12px", color:"rgba(255,255,255,0.4)", margin:0 }}>{magazine.issue}</p>}
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <span style={{ ...inter, fontSize:"13px", color:"rgba(255,255,255,0.5)" }}>
            {currentPage + 1} / {totalPages}
          </span>

          {/* Zoom out */}
          <button
            onClick={() => setZoom(z => Math.max(0.5, parseFloat((z - 0.25).toFixed(2))))}
            style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:"8px", padding:"8px", cursor:"pointer", color:"white", display:"flex" }}>
            <ZoomOut size={16} />
          </button>

          <span style={{ ...inter, fontSize:"12px", color:"rgba(255,255,255,0.4)", minWidth:"36px", textAlign:"center" }}>
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom in */}
          <button
            onClick={() => setZoom(z => Math.min(3, parseFloat((z + 0.25).toFixed(2))))}
            style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:"8px", padding:"8px", cursor:"pointer", color:"white", display:"flex" }}>
            <ZoomIn size={16} />
          </button>

          {/* Fullscreen / maximize */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            style={{ background: isFullscreen ? "rgba(255,217,0,0.2)" : "rgba(255,255,255,0.08)", border:"none", borderRadius:"8px", padding:"8px", cursor:"pointer", color: isFullscreen ? "#FFD900" : "white", display:"flex" }}>
            <Maximize2 size={16} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            style={{ background:"rgba(255,255,255,0.08)", border:"none", borderRadius:"8px", padding:"8px 14px", cursor:"pointer", color:"white", display:"flex", alignItems:"center", gap:"6px", fontFamily:inter.fontFamily, fontSize:"13px" }}>
            <X size={16} />
            Close
          </button>
        </div>
      </div>

      {/* Main area */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* Sidebar thumbnails */}
        <div className="mag-sidebar" style={{ width:"120px", flexShrink:0, overflowY:"auto", borderRight:"1px solid rgba(255,255,255,0.06)", padding:"12px 8px", display:"flex", flexDirection:"column", gap:"8px" }}>
          {magazine.pages.map((page, i) => (
            <button
              key={i}
              className={`mag-thumb ${i === currentPage ? "active" : ""}`}
              onClick={() => goTo(i, i > currentPage ? 1 : -1)}
              style={{ background:"none", border:`2px solid ${i === currentPage ? "#FFD900" : "rgba(255,255,255,0.1)"}`, borderRadius:"6px", padding:"2px", cursor:"pointer", opacity: i === currentPage ? 1 : 0.5, transition:"all 0.2s", overflow:"hidden" }}>
              <img src={page.url} alt={`Page ${i + 1}`} style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", display:"block", borderRadius:"4px" }} />
              <p style={{ ...inter, fontSize:"10px", color:"rgba(255,255,255,0.5)", textAlign:"center", margin:"4px 0 0" }}>{i + 1}</p>
            </button>
          ))}
        </div>

        {/* Page viewer */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"auto", position:"relative", padding:"24px" }}>

          {/* Prev button */}
          <button
            onClick={prev}
            disabled={currentPage === 0}
            style={{ position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)", zIndex:10, background: currentPage === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"50%", width:"48px", height:"48px", display:"flex", alignItems:"center", justifyContent:"center", cursor: currentPage === 0 ? "not-allowed" : "pointer", color:"white", opacity: currentPage === 0 ? 0.3 : 1, transition:"all 0.2s" }}>
            <ChevronLeft size={22} />
          </button>

          {/* Zoom wrapper - separate from framer-motion so transforms don't conflict */}
          <div
            style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%", cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default", userSelect:"none" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
          >
            <div style={{
              transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s ease",
              willChange: "transform",
            }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                >
                  {currentImg && (
                    <img
                      src={currentImg.url}
                      alt={currentImg.caption || `Page ${currentPage + 1}`}
                      style={{ maxHeight:"calc(100vh - 160px)", maxWidth:"calc(100vw - 200px)", objectFit:"contain", borderRadius:"8px", boxShadow:"0 32px 80px rgba(0,0,0,0.6)", display:"block" }}
                    />
                  )}
                  {currentImg?.caption && (
                    <p style={{ ...inter, fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginTop:"10px" }}>{currentImg.caption}</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            disabled={currentPage === totalPages - 1}
            style={{ position:"absolute", right:"16px", top:"50%", transform:"translateY(-50%)", zIndex:10, background: currentPage === totalPages - 1 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"50%", width:"48px", height:"48px", display:"flex", alignItems:"center", justifyContent:"center", cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer", color:"white", opacity: currentPage === totalPages - 1 ? 0.3 : 1, transition:"all 0.2s" }}>
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div style={{ height:"3px", background:"rgba(255,255,255,0.06)", flexShrink:0 }}>
        <motion.div
          style={{ height:"100%", background:"#FFD900", borderRadius:"2px" }}
          animate={{ width:`${((currentPage + 1) / totalPages) * 100}%` }}
          transition={{ duration:0.3 }}
        />
      </div>
    </motion.div>
  );
}

function MagazineCard({ magazine, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      whileHover={{ y:-6 }}
      transition={{ duration:0.4 }}
      style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", padding:0 }}
    >
      <div style={{ position:"relative", borderRadius:"16px", overflow:"hidden", border:"1px solid #E5E6EB", boxShadow:"0 8px 32px rgba(0,0,0,0.08)" }}>
        <img
          src={magazine.coverUrl}
          alt={magazine.title}
          style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", display:"block" }}
        />
        <div style={{ position:"absolute", inset:0, background:"rgba(4,6,23,0.6)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.3s" }}
          className="mag-hover-overlay">
          <div style={{ background:"#FFD900", borderRadius:"50%", width:"56px", height:"56px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <BookOpen size={24} color="#040617" />
          </div>
        </div>
        {magazine.pages.length > 0 && (
          <div style={{ position:"absolute", top:"12px", right:"12px", background:"#FFD900", borderRadius:"100px", padding:"4px 10px" }}>
            <span style={{ ...inter, fontSize:"11px", fontWeight:700, color:"#040617" }}>{magazine.pages.length} pages</span>
          </div>
        )}
      </div>
      <div style={{ padding:"14px 4px 0" }}>
        <p style={{ ...inter, fontSize:"16px", fontWeight:600, color:"#040617", margin:0, lineHeight:1.2 }}>{magazine.title}</p>
        {magazine.issue && <p style={{ ...inter, fontSize:"14px", color:"#6F7181", margin:"4px 0 0" }}>{magazine.issue}</p>}
      </div>
    </motion.button>
  );
}

export default function MagazineSection() {
  const [magazines,      setMagazines]      = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [activeMagazine, setActiveMagazine] = useState(null);

  useEffect(() => {
    async function fetchMagazines() {
      try {
        const data = await client.fetch(queries.magazines);
        if (data?.length > 0) {
          setMagazines(data.map(mag => ({
            _id:      mag._id,
            title:    mag.title,
            issue:    mag.issue || "",
            coverUrl: mag.coverImage
              ? urlFor(mag.coverImage).width(800).url()
              : mag.pages?.[0]?.image
                ? urlFor(mag.pages[0].image).width(800).url()
                : "",
            pages: (mag.pages || []).map(p => ({
              url:     urlFor(p.image).width(1400).url(),
              caption: p.caption || "",
            })),
          })));
        }
      } catch (error) {
        console.error("Error fetching magazines:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMagazines();
  }, []);

  if (loading || magazines.length === 0) return null;

  return (
    <>
      <style>{`
        .mag-card-wrap:hover .mag-hover-overlay { opacity: 1 !important; }
      `}</style>

      <section style={{ backgroundColor:"#FAF9F6", padding:"clamp(80px,10vw,120px) clamp(24px,5vw,80px)", position:"relative", overflow:"hidden" }}>
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"32px", marginBottom:"clamp(40px,6vw,64px)", maxWidth:"1650px", margin:"0 auto clamp(40px,6vw,64px)" }}>
          <div>
            <p style={{ ...inter, fontSize:"12px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6F7181", margin:"0 0 12px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ display:"block", width:"28px", height:"1px", background:"#040617" }} />
              Publications
            </p>
            <h2 style={{ ...inter, fontSize:"clamp(48px,6vw,88px)", fontWeight:600, color:"#040617", margin:0, lineHeight:0.92, letterSpacing:"-0.04em" }}>
              Our Magazine
            </h2>
          </div>
          <p style={{ ...inter, fontSize:"clamp(16px,1.6vw,20px)", color:"#7A7D8B", lineHeight:1.65, maxWidth:"480px", textAlign:"right" }}>
            Read our latest publications, annual reports, and updates from The Mico Foundation.
          </p>
        </motion.div>

        <div style={{ maxWidth:"1650px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"32px" }}>
          {magazines.map(mag => (
            <div key={mag._id} className="mag-card-wrap">
              <MagazineCard magazine={mag} onClick={() => setActiveMagazine(mag)} />
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeMagazine && (
          <MagazineReader magazine={activeMagazine} onClose={() => setActiveMagazine(null)} />
        )}
      </AnimatePresence>
    </>
  );
}