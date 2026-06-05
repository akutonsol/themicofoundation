"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const imgLocation = "/images/home-static/location-pin.svg";
const imgArrowBtn = "/images/home-static/button-icon.png";
const imgSparkle  = "/images/home-static/sparkle-large.png";

const inter = { fontFamily: "'Inter', sans-serif" };

const AMOUNTS = [25, 50, 100, 250, 500, 1000];
const DONATION_TYPES = [
  { value: "general",     label: "General Fund" },
  { value: "scholarship", label: "Scholarship Fund" },
  { value: "restoration", label: "Historic Restoration" },
  { value: "campus",      label: "Campus Development" },
  { value: "community",   label: "Community Programs" },
];
const TOTAL_DESKTOP = 40;
const TOTAL_MOBILE  = 24;

const formatCurrency = (n) => {
  if (n >= 1000000) return `$${Math.round(n / 1000000)}M`;
  if (n >= 1000)    return `$${Math.round(n / 1000)}K`;
  return `$${n}`;
};

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(value) {
  const clean = value.replace(/\D/g, "").slice(0, 4);
  if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2);
  return clean;
}

const steps = [
  { num: 1, title: "Donate Amount", sub: "Choose your donation target and amount." },
  { num: 2, title: "Donate Method", sub: "Enter your card details to donate." },
  { num: 3, title: "Authentication", sub: "Complete 3D Secure bank verification." },
];

// ── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ currentStep, mobile = false }) {
  if (mobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
        {steps.map((s, i) => (
          <div key={s.num}>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", opacity: s.num === currentStep ? 1 : 0.5 }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "12px", backgroundColor: s.num === currentStep ? "#FFD900" : "transparent", border: s.num === currentStep ? "none" : "1px solid #E5E6EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ ...inter, fontSize: "32px", fontWeight: 600, color: "#040617" }}>{s.num}</span>
              </div>
              <div>
                <p style={{ ...inter, fontSize: "32px", fontWeight: 600, color: "#040617", letterSpacing: "-0.32px", lineHeight: "46px", margin: 0 }}>{s.title}</p>
                <p style={{ ...inter, fontSize: "20px", color: "#6F7181", letterSpacing: "0.2px", lineHeight: "30px", margin: 0 }}>{s.sub}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "24px", marginTop: "4px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" /></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "32px", maxWidth: "1320px", margin: "0 auto 36px" }}>
      {steps.map((s, i) => (
        <div key={s.num} style={{ display: "flex", flex: 1, alignItems: "center", gap: "16px", opacity: s.num === currentStep ? 1 : 0.5 }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "12px", backgroundColor: s.num === currentStep ? "#FFD900" : "transparent", border: s.num === currentStep ? "none" : "1px solid #E5E6EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ ...inter, fontSize: "32px", fontWeight: 600, color: "#040617" }}>{s.num}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...inter, fontSize: "32px", fontWeight: 600, color: "#040617", letterSpacing: "-0.32px", lineHeight: "46px", margin: 0 }}>{s.title}</p>
            <p style={{ ...inter, fontSize: "20px", color: "#6F7181", letterSpacing: "0.2px", lineHeight: "30px", margin: 0 }}>{s.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" /></svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ projects, currentProject, onPrev, onNext, mobile = false }) {
  if (!projects || projects.length === 0) return (
    <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "20px", padding: "24px", textAlign: "center" }}>
      <p style={{ ...inter, fontSize: "20px", color: "#6F7181" }}>No active projects available</p>
    </div>
  );
  const p   = projects[currentProject];
  const pct = p.targetAmount > 0 ? Math.round((p.amountDonated / p.targetAmount) * 100) : 0;
  const tot = mobile ? TOTAL_MOBILE : TOTAL_DESKTOP;
  const fil = Math.round((pct / 100) * tot);

  if (mobile) return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", position: "relative", overflow: "hidden" }}>
      <img src={imgSparkle} alt="" style={{ position: "absolute", left: "-96px", top: "62px", width: "523px", pointerEvents: "none", opacity: 0.25, zIndex: 0 }} />
      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <img src={p.photo} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 42%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
          <img src={imgLocation} alt="" style={{ width: "24px", height: "24px" }} />
          <span style={{ ...inter, fontSize: "16px", color: "white" }}>{p.location}</span>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ ...inter, fontSize: "32px", fontWeight: 600, color: "#040617", letterSpacing: "-0.32px", lineHeight: "46px", margin: 0, textTransform: "capitalize" }}>{p.title}</p>
        <a href={`/projectdetail?slug=${p.slug}`} style={{ ...inter, fontSize: "24px", color: "#6F7181", textDecoration: "underline" }}>Learn more</a>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ ...inter, fontSize: "32px", color: "#5EDA71", textAlign: "center", margin: "0 0 4px" }}>{pct}%</p>
        <div style={{ display: "flex", gap: "3px" }}>{Array.from({ length: TOTAL_MOBILE }).map((_, i) => <div key={i} style={{ flex: 1, height: "20px", borderRadius: "20px", backgroundColor: i < fil ? "#5EDA71" : "#6F7181", opacity: i < fil ? 1 : 0.2 }} />)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ ...inter, fontSize: "24px", color: "#6F7181", opacity: 0.6 }}>$0</span>
          <span style={{ ...inter, fontSize: "24px", color: "#5EDA71" }}>{p.raised}</span>
          <span style={{ ...inter, fontSize: "24px", color: "#6F7181", opacity: 0.6 }}>{p.goal}</span>
        </div>
      </div>
      {projects.length > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", position: "relative", zIndex: 1 }}>
          <button onClick={onPrev} style={{ width: "44px", height: "44px", border: "2px solid #040617", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", cursor: "pointer", opacity: 0.6 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div style={{ display: "flex", flex: 1, gap: "8px" }}>{projects.map((_, i) => <div key={i} style={{ flex: 1, height: "12px", borderRadius: "90px", backgroundColor: i === currentProject ? "#FFD900" : "#6F7181", opacity: i === currentProject ? 1 : 0.2 }} />)}</div>
          <button onClick={onNext} style={{ width: "44px", height: "44px", backgroundColor: "#040617", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "20px", padding: "16px", display: "flex", flexDirection: "column", gap: "32px", position: "relative", overflow: "hidden" }}>
      <img src={imgSparkle} alt="" style={{ position: "absolute", top: "132px", left: "50%", transform: "translateX(-50%)", width: "523px", pointerEvents: "none", opacity: 0.3 }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <div>
          <p style={{ ...inter, fontSize: "32px", fontWeight: 600, color: "#040617", letterSpacing: "-0.32px", lineHeight: "46px", margin: 0, textTransform: "capitalize" }}>{p.title}</p>
          <a href={`/projectdetail?slug=${p.slug}`} style={{ ...inter, fontSize: "24px", color: "#6F7181", letterSpacing: "0.24px", lineHeight: "38px", textDecoration: "underline" }}>Learn more</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={imgLocation} alt="" style={{ width: "24px", height: "24px" }} />
          <span style={{ ...inter, fontSize: "16px", color: "#6F7181" }}>{p.location}</span>
        </div>
      </div>
      <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9", position: "relative", zIndex: 1 }}>
        <img src={p.photo} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative", zIndex: 1 }}>
        <p style={{ ...inter, fontSize: "32px", fontWeight: 400, color: "#5EDA71", textAlign: "center", letterSpacing: "-0.32px", margin: 0 }}>{pct}%</p>
        <div style={{ display: "flex", gap: "4px" }}>{Array.from({ length: TOTAL_DESKTOP }).map((_, i) => <div key={i} style={{ flex: 1, height: "20px", borderRadius: "20px", backgroundColor: i < fil ? "#5EDA71" : "#d9d9d9", opacity: i < fil ? 1 : 0.4 }} />)}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ ...inter, fontSize: "24px", color: "#6F7181", opacity: 0.8 }}>$0</span>
          <span style={{ ...inter, fontSize: "24px", color: "#5EDA71" }}>{p.raised}</span>
          <span style={{ ...inter, fontSize: "24px", color: "#6F7181", opacity: 0.8 }}>{p.goal}</span>
        </div>
      </div>
      {projects.length > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", opacity: 0.6 }}>
            <span style={{ ...inter, fontSize: "20px", color: "#040617" }}>Last Project</span>
            <button onClick={onPrev} style={{ width: "44px", height: "44px", border: "2px solid #040617", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", cursor: "pointer" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>{projects.map((_, i) => <div key={i} style={{ width: "52px", height: "12px", borderRadius: "90px", backgroundColor: i === currentProject ? "#FFD900" : "#d9d9d9", opacity: i === currentProject ? 1 : 0.4 }} />)}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={onNext} style={{ width: "44px", height: "44px", backgroundColor: "#040617", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span style={{ ...inter, fontSize: "20px", color: "#040617" }}>Next Project</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component — ORIGINAL WORKING PAYMENT LOGIC ───────────────────────────
export default function DonationForm() {
  // Projects
  const [projectsData,   setProjectsData]   = useState(null);
  const [loadingProj,    setLoadingProj]     = useState(true);
  const [currentProject, setCurrentProject] = useState(0);

  // Original working state — untouched
  const [step,         setStep]         = useState(1); // 1=amount, 2=card, 3=3ds
  const [amount,       setAmount]       = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("general");
  const [message,      setMessage]      = useState("");
  const [cardNumber,   setCardNumber]   = useState("");
  const [cardExpiry,   setCardExpiry]   = useState("");
  const [cardCvv,      setCardCvv]      = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [email,        setEmail]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [redirectData, setRedirectData] = useState(null);
  const [spiToken,     setSpiToken]     = useState(null);
  const [donationMeta, setDonationMeta] = useState(null);

  const finalAmount = amount === "custom" ? customAmount : amount;

  // Fetch projects
  useEffect(() => {
    async function load() {
      try {
        const projects = await client.fetch(queries.projects);
        const active = projects.filter(p => p.status === "active").map(p => ({
          id: p._id, slug: p.slug, title: p.title, location: p.location,
          photo: urlFor(p.image).width(1200).url(),
          targetAmount: p.targetAmount, amountDonated: p.amountDonated,
          goal: formatCurrency(p.targetAmount), raised: formatCurrency(p.amountDonated),
        }));
        setProjectsData(active);
      } catch (e) { console.error(e); }
      finally { setLoadingProj(false); }
    }
    load();
  }, []);

  const prevProject = () => setCurrentProject(p => (p - 1 + (projectsData?.length || 1)) % (projectsData?.length || 1));
  const nextProject = () => setCurrentProject(p => (p + 1) % (projectsData?.length || 1));

  // ── ORIGINAL WORKING PAYMENT HANDLER — DO NOT MODIFY ─────────────────────
  const handlePayment = async () => {
    if (!finalAmount || parseFloat(finalAmount) <= 0) { setError("Please enter a valid amount"); return; }
    if (!cardNumber || !cardExpiry || !cardCvv || !cardholderName || !email) { setError("Please fill in all required fields"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(finalAmount),
          currency: "840",
          cardPan: cardNumber.replace(/\s/g, ""),
          cardCvv,
          cardExpiration: (() => { const [mm, yy] = cardExpiry.split("/"); return `${yy}${mm}`; })(),
          cardholderName,
          email, phone, donationType, message,
          projectId:    projectsData?.[currentProject]?.id,
          projectTitle: projectsData?.[currentProject]?.title,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Payment failed. Please try again."); return; }
      const meta = data.donationMeta || {};
      setDonationMeta(meta);
      try { sessionStorage.setItem("donationMeta", JSON.stringify(meta)); } catch {}
      if (data.requiresRedirect && data.redirectData) {
        setRedirectData(data.redirectData);
        setStep(3);
        return;
      }
      if (data.spiToken) {
        setSpiToken(data.spiToken);
        await completePayment(data.spiToken, meta);
      }
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const completePayment = async (token, meta) => {
    try {
      const res = await fetch("/api/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spiToken: token, donationMeta: meta }),
      });
      const data = await res.json();
      if (data.success && data.approved) {
        window.location.href = "/donate-result?status=success";
      } else {
        setError(data.error || "Payment was declined");
        setStep(2);
      }
    } catch { setError("Failed to complete payment"); setStep(2); }
  };

  if (loadingProj) return (
    <section style={{ backgroundColor: "#FFFDF9", padding: "80px 0", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ ...inter, color: "#040617", fontSize: "24px" }}>Loading donation form...</p>
    </section>
  );

  return (
    <section style={{ backgroundColor: "#FFFDF9", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .don-desktop { display: block; padding: 80px 165px; }
        .don-mobile  { display: none; }
        .don-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 1590px; margin: 0 auto; }
        @media (max-width: 768px)  { .don-desktop { display: none !important; } .don-mobile { display: flex !important; } }
        @media (max-width: 1024px) { .don-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── Desktop ── */}
      <div className="don-desktop">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ ...inter, fontSize: "75px", fontWeight: 600, color: "#040617", letterSpacing: "-0.75px", lineHeight: "85px", textAlign: "center", margin: "0 0 42px" }}>
          Donation Form
        </motion.h2>
        <StepIndicator currentStep={step} />
        <div className="don-grid">
          <ProjectCard projects={projectsData} currentProject={currentProject} onPrev={prevProject} onNext={nextProject} />
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

              {/* Step 1 — Amount */}
              {step === 1 && (
                <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "20px", overflow: "hidden" }}>
                  <div style={{ borderBottom: "1px solid #E5E6EB", padding: "20px 24px", textAlign: "center" }}>
                    <h3 style={{ ...inter, fontSize: "40px", fontWeight: 500, color: "#040617", margin: 0 }}>Select Amount (USD)</h3>
                  </div>
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {AMOUNTS.map(val => (
                        <button key={val} type="button" onClick={() => { setAmount(String(val)); setCustomAmount(""); }}
                          style={{ ...inter, padding: "16px", borderRadius: "12px", border: `2px solid ${amount === String(val) ? "#FFD900" : "#E5E6EB"}`, background: amount === String(val) ? "#FFD900" : "#FFFFFF", color: "#040617", fontSize: "24px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                          ${val}
                        </button>
                      ))}
                    </div>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6F7181", fontWeight: 600 }}>$</span>
                      <input type="number" placeholder="Custom amount" value={customAmount}
                        onChange={e => { setCustomAmount(e.target.value); setAmount("custom"); }}
                        style={{ ...inter, width: "100%", padding: "14px 16px 14px 32px", borderRadius: "12px", border: `2px solid ${amount === "custom" ? "#FFD900" : "#E5E6EB"}`, fontSize: "18px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ ...inter, fontSize: "16px", color: "#414651", display: "block", marginBottom: "8px" }}>Donation Type</label>
                      <select value={donationType} onChange={e => setDonationType(e.target.value)}
                        style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", background: "#FFFFFF", outline: "none", cursor: "pointer" }}>
                        {DONATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ ...inter, fontSize: "16px", color: "#414651", display: "block", marginBottom: "8px" }}>Message (optional)</label>
                      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Leave a message with your donation..."
                        style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", minHeight: "90px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    {error && <p style={{ ...inter, color: "#EF4444", textAlign: "center", margin: 0 }}>{error}</p>}
                    <button type="button"
                      onClick={() => { if (!finalAmount || parseFloat(finalAmount) <= 0) { setError("Please select or enter an amount"); return; } setError(""); setStep(2); }}
                      style={{ ...inter, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", backgroundColor: "#FFD900", color: "#040617", fontSize: "16px", fontWeight: 600, padding: "16px 24px", borderRadius: "18px", border: "none", cursor: "pointer", width: "100%" }}>
                      Continue to Payment <img src={imgArrowBtn} alt="" style={{ width: "24px", height: "24px" }} />
                    </button>
                    <div style={{ backgroundColor: "#E8E9EB", padding: "16px", borderRadius: "12px" }}>
                      <p style={{ ...inter, fontSize: "16px", color: "#636473", margin: 0, textAlign: "center" }}>*All donations over $2 are tax deductible</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Card Details */}
              {step === 2 && (
                <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "20px", overflow: "hidden" }}>
                  <div style={{ display: "flex", borderBottom: "1px solid #E5E6EB" }}>
                    {["card", "paypal", "inperson"].map(m => (
                      <button key={m} style={{ ...inter, flex: 1, padding: "16px 10px", background: "none", border: "none", borderBottom: m === "card" ? "2px solid #FFD900" : "2px solid transparent", fontSize: "24px", color: "#040617", cursor: "pointer", opacity: m === "card" ? 1 : 0.75, textTransform: "capitalize" }}>
                        {m === "inperson" ? "In Person" : m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <button type="button" onClick={() => { setStep(1); setError(""); }}
                      style={{ ...inter, alignSelf: "flex-start", background: "none", border: "none", color: "#040617", fontSize: "20px", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Go Back
                    </button>

                    <div style={{ background: "#F5F3EE", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ ...inter, fontSize: "16px", color: "#6F7181" }}>Donation Amount</span>
                      <span style={{ ...inter, fontSize: "24px", fontWeight: 700, color: "#040617" }}>${finalAmount} USD</span>
                    </div>

                    {[
                      { label: "Cardholder Name *", placeholder: "John Smith", value: cardholderName, onChange: e => setCardholderName(e.target.value) },
                      { label: "Card Number *", placeholder: "4012 0000 0000 0000", value: cardNumber, onChange: e => setCardNumber(formatCardNumber(e.target.value)), maxLength: 19 },
                    ].map(f => (
                      <div key={f.label}>
                        <label style={{ ...inter, fontSize: "16px", color: "#414651", display: "block", marginBottom: "6px" }}>{f.label}</label>
                        <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 14px", boxShadow: "0px 1px 2px rgba(10,13,18,0.05)" }}>
                          <input type="text" placeholder={f.placeholder} value={f.value} onChange={f.onChange} maxLength={f.maxLength}
                            style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617", letterSpacing: f.label.includes("Card Number") ? "0.1em" : "normal" }} />
                        </div>
                      </div>
                    ))}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ ...inter, fontSize: "16px", color: "#414651", display: "block", marginBottom: "6px" }}>Date of Expire *</label>
                        <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 14px", boxShadow: "0px 1px 2px rgba(10,13,18,0.05)" }}>
                          <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} maxLength={5}
                            style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                        </div>
                      </div>
                      <div>
                        <label style={{ ...inter, fontSize: "16px", color: "#414651", display: "block", marginBottom: "6px" }}>CVC / CVV *</label>
                        <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 14px", boxShadow: "0px 1px 2px rgba(10,13,18,0.05)" }}>
                          <input type="text" placeholder="123" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4}
                            style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ ...inter, fontSize: "16px", color: "#414651", display: "block", marginBottom: "6px" }}>Email Address *</label>
                      <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 14px", boxShadow: "0px 1px 2px rgba(10,13,18,0.05)" }}>
                        <input type="text" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                          style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "4px 0" }}>
                      <div style={{ height: "1px", background: "#E5E6EB", flex: 1 }} /><span style={{ ...inter, color: "#6F7181", fontSize: "18px" }}>or</span><div style={{ height: "1px", background: "#E5E6EB", flex: 1 }} />
                    </div>

                    <div>
                      <h4 style={{ ...inter, fontSize: "30px", fontWeight: 600, color: "#040617", margin: "0 0 10px" }}>Bank Deposit</h4>
                      <p style={{ ...inter, fontSize: "18px", color: "#040617", margin: "0 0 16px" }}>Buxton Restoration Banking Details</p>
                      {[["Recipient / Beneficiary Name", "Mico Heritage Enterprise, BNS New Kingston"], ["Account Number", "10006017"], ["SWIFT/BIC Code", "NOSCJMKN"], ["Bank Transit Number", "50575"]].map(([k, v]) => (
                        <p key={k} style={{ ...inter, fontSize: "18px", color: "#040617", margin: "0 0 10px" }}><strong>{k}:</strong> {v}</p>
                      ))}
                    </div>

                    {error && <p style={{ ...inter, color: "#EF4444", textAlign: "center", margin: 0 }}>{error}</p>}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginTop: "10px" }}>
                      <div>
                        <p style={{ ...inter, fontSize: "18px", color: "#6F7181", margin: "0 0 8px" }}>Your Donation to {projectsData?.[currentProject]?.title || "this project"}:</p>
                        <p style={{ ...inter, fontSize: "32px", color: "#040617", margin: 0 }}>${finalAmount} USD <span style={{ color: "#2F8A45", fontSize: "18px" }}>+1% to total target</span></p>
                      </div>
                      <button type="button" onClick={handlePayment} disabled={loading}
                        style={{ ...inter, background: loading ? "#E5E6EB" : "#FFF0A8", border: "none", color: "#040617", fontSize: "16px", fontWeight: 600, padding: "16px 24px", borderRadius: "18px", cursor: loading ? "not-allowed" : "pointer", minWidth: "160px", opacity: loading ? 0.7 : 1 }}>
                        {loading ? "Processing..." : "Donate Now"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — 3DS iframe — ORIGINAL WORKING APPROACH */}
              {step === 3 && redirectData && (
                <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "20px", overflow: "hidden" }}>
                  <div style={{ borderBottom: "1px solid #E5E6EB", padding: "20px 24px", textAlign: "center" }}>
                    <h3 style={{ ...inter, fontSize: "32px", fontWeight: 500, color: "#040617", margin: 0 }}>🔒 Please complete bank authentication below</h3>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <p style={{ ...inter, fontSize: "16px", color: "#6F7181", textAlign: "center", marginBottom: "20px" }}>Complete the verification in the window below.</p>
                    <div style={{ border: "2px solid #E5E6EB", borderRadius: "16px", overflow: "hidden" }}>
                      <iframe
                        ref={(el) => {
                          if (el) {
                            const doc = el.contentDocument || el.contentWindow?.document;
                            if (doc) { doc.open(); doc.write(redirectData); doc.close(); }
                          }
                        }}
                        frameBorder="0"
                        width="100%"
                        height="500"
                        style={{ display: "block" }}
                        title="3D Secure Authentication"
                      />
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="don-mobile" style={{ flexDirection: "column", gap: "24px", padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <h2 style={{ ...inter, fontSize: "52px", fontWeight: 600, color: "#040617", letterSpacing: "-0.5px", lineHeight: "60px", textAlign: "center", margin: 0, width: "100%" }}>Donation Form</h2>
        <StepIndicator currentStep={step} mobile />
        <ProjectCard projects={projectsData} currentProject={currentProject} onPrev={prevProject} onNext={nextProject} mobile />
        <AnimatePresence mode="wait">
          <motion.div key={`m-${step}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ width: "100%" }}>

            {step === 1 && (
              <div style={{ width: "100%", backgroundColor: "#FFFDF9", borderRadius: "16px", overflow: "hidden", border: "1px solid #E5E6EB" }}>
                <div style={{ borderBottom: "1px solid #E5E6EB", padding: "16px", textAlign: "center" }}>
                  <h3 style={{ ...inter, fontSize: "28px", fontWeight: 500, color: "#040617", margin: 0 }}>Select Amount (USD)</h3>
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {AMOUNTS.map(val => (
                      <button key={val} type="button" onClick={() => { setAmount(String(val)); setCustomAmount(""); }}
                        style={{ ...inter, padding: "14px", borderRadius: "12px", border: `2px solid ${amount === String(val) ? "#FFD900" : "#E5E6EB"}`, background: amount === String(val) ? "#FFD900" : "#FFFFFF", color: "#040617", fontSize: "20px", fontWeight: 600, cursor: "pointer" }}>
                        ${val}
                      </button>
                    ))}
                  </div>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#6F7181" }}>$</span>
                    <input type="number" placeholder="Custom amount" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setAmount("custom"); }}
                      style={{ ...inter, width: "100%", padding: "12px 12px 12px 28px", borderRadius: "12px", border: `2px solid ${amount === "custom" ? "#FFD900" : "#E5E6EB"}`, fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <select value={donationType} onChange={e => setDonationType(e.target.value)}
                    style={{ ...inter, width: "100%", padding: "12px 14px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", background: "#FFFFFF", outline: "none" }}>
                    {DONATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  {error && <p style={{ ...inter, color: "#EF4444", textAlign: "center", margin: 0 }}>{error}</p>}
                  <button type="button" onClick={() => { if (!finalAmount || parseFloat(finalAmount) <= 0) { setError("Please select or enter an amount"); return; } setError(""); setStep(2); }}
                    style={{ ...inter, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", backgroundColor: "#FFD900", color: "#040617", fontSize: "16px", fontWeight: 600, padding: "16px", borderRadius: "18px", border: "none", cursor: "pointer", width: "100%" }}>
                    Continue to Payment <img src={imgArrowBtn} alt="" style={{ width: "20px", height: "20px" }} />
                  </button>
                  <p style={{ ...inter, fontSize: "14px", color: "#6F7181", textAlign: "center", margin: 0 }}>*All donations over $2 are tax deductible</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ width: "100%", backgroundColor: "#FFFDF9", borderRadius: "16px", border: "1px solid #E5E6EB" }}>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <button type="button" onClick={() => { setStep(1); setError(""); }}
                    style={{ ...inter, alignSelf: "flex-start", background: "none", border: "none", color: "#040617", fontSize: "18px", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Go Back
                  </button>
                  <div style={{ background: "#F5F3EE", borderRadius: "10px", padding: "14px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ ...inter, fontSize: "14px", color: "#6F7181" }}>Amount</span>
                    <span style={{ ...inter, fontSize: "18px", fontWeight: 700, color: "#040617" }}>${finalAmount} USD</span>
                  </div>
                  {[
                    { label: "Cardholder Name *", ph: "John Smith", val: cardholderName, set: setCardholderName },
                    { label: "Card Number *", ph: "4012 0000 0000 0000", val: cardNumber, set: v => setCardNumber(formatCardNumber(v)) },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ ...inter, fontSize: "14px", color: "#414651", display: "block", marginBottom: "4px" }}>{f.label}</label>
                      <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 12px" }}>
                        <input type="text" placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)}
                          style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ ...inter, fontSize: "14px", color: "#414651", display: "block", marginBottom: "4px" }}>Expire *</label>
                      <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 12px" }}>
                        <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} maxLength={5}
                          style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ ...inter, fontSize: "14px", color: "#414651", display: "block", marginBottom: "4px" }}>CVV *</label>
                      <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 12px" }}>
                        <input type="text" placeholder="123" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4}
                          style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ ...inter, fontSize: "14px", color: "#414651", display: "block", marginBottom: "4px" }}>Email *</label>
                    <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "8px", padding: "10px 12px" }}>
                      <input type="text" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                        style={{ ...inter, width: "100%", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "16px", color: "#040617" }} />
                    </div>
                  </div>
                  {error && <p style={{ ...inter, color: "#EF4444", textAlign: "center", margin: 0 }}>{error}</p>}
                  <button type="button" onClick={handlePayment} disabled={loading}
                    style={{ ...inter, background: loading ? "#E5E6EB" : "#FFD900", border: "none", color: "#040617", fontSize: "16px", fontWeight: 600, padding: "16px", borderRadius: "18px", cursor: loading ? "not-allowed" : "pointer", width: "100%" }}>
                    {loading ? "Processing..." : `Donate $${finalAmount} Securely →`}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && redirectData && (
              <div style={{ width: "100%", backgroundColor: "#FFFDF9", border: "1px solid #E5E6EB", borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ borderBottom: "1px solid #E5E6EB", padding: "16px", textAlign: "center" }}>
                  <h3 style={{ ...inter, fontSize: "22px", fontWeight: 500, color: "#040617", margin: 0 }}>🔒 Complete bank authentication</h3>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ border: "2px solid #E5E6EB", borderRadius: "12px", overflow: "hidden" }}>
                    <iframe
                      ref={(el) => {
                        if (el) {
                          const doc = el.contentDocument || el.contentWindow?.document;
                          if (doc) { doc.open(); doc.write(redirectData); doc.close(); }
                        }
                      }}
                      frameBorder="0" width="100%" height="400" style={{ display: "block" }} title="3D Secure Authentication"
                    />
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}