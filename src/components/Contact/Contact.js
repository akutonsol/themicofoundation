"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticSettings = {
  heading: "Contact Form",
  address: "1A Marescaux Road, Kingston 5.",
  email: "micofoundation@yahoo.com",
  phones: ["(876) 929-5260-9", "(876) 665-7788"],
  mapEmbedUrl: "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1A%20Marescaux%20Road,%20Kingston%205,%20Jamaica&t=&z=16&ie=UTF8&iwloc=B&output=embed",
};

function Field({ label, placeholder, textarea = false, value, onChange, error }) {
  const base = {
    ...inter, width: "100%", borderRadius: 8,
    border: `1px solid ${error ? '#EF4444' : '#D9DDE6'}`,
    background: "#FFFDF9", fontSize: 16, color: "#040617", outline: "none",
  };
  return (
    <div>
      <label style={{ ...inter, display: "block", marginBottom: 8, fontSize: 16, color: "#414651" }}>{label}</label>
      {textarea ? (
        <textarea rows={6} placeholder={placeholder} value={value} onChange={onChange}
          style={{ ...base, height: 170, resize: "none", padding: "16px" }} />
      ) : (
        <input type="text" placeholder={placeholder} value={value} onChange={onChange}
          style={{ ...base, height: 48, padding: "0 16px" }} />
      )}
      {error && <span style={{ ...inter, fontSize: 13, color: '#EF4444', marginTop: 4, display: 'block' }}>{error}</span>}
    </div>
  );
}

export default function ContactUs() {
  const [settings, setSettings] = useState(staticSettings);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await client.fetch(queries.contactSettings);
        if (data) {
          setSettings({
            heading: data.heading || staticSettings.heading,
            address: data.address || staticSettings.address,
            email: data.email || staticSettings.email,
            phones: data.phones?.length > 0 ? data.phones : staticSettings.phones,
            mapEmbedUrl: data.mapEmbedUrl || staticSettings.mapEmbedUrl,
          });
        }
      } catch (error) {
        console.error('Error fetching contact settings:', error);
      }
    }
    fetchSettings();
  }, []);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#FAF9F6", padding: "48px 0 80px" }}>
      <div className="contact-wrapper" style={{ position: "relative", zIndex: 1, maxWidth: "1720px", margin: "0 auto", padding: "0 48px" }}>

        {/* Foundation note — sits above the title */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "flex-start", gap: 20, background: "rgba(255,217,0,0.08)", border: "1px solid rgba(255,217,0,0.35)", borderLeft: "4px solid #FFD900", borderRadius: 16, padding: "24px 28px", marginBottom: 40 }}
        >
          <div>
            <h2 style={{ ...inter, fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.4px", lineHeight: 1.22, color: "#040617", margin: "0 0 12px" }}>
              The Mico Foundation, a Limited Liability Company — Not for Profit
            </h2>
            <p style={{ ...inter, fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 400, lineHeight: 1.6, color: "#4A4A4A", margin: 0 }}>
              Established to support the developmental goals of the Mico University College.
            </p>
          </div>
        </motion.div>

        {/* Header row */}
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 0.72fr", gap: 40, marginBottom: 56, alignItems: "start" }}>
          <motion.h1
            className="contact-title"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ ...inter, fontSize: 42, fontWeight: 600, lineHeight: 1.0, letterSpacing: "-0.04em", color: "#040617", margin: 0 }}
          >
            {settings.heading}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
            style={{ justifySelf: "end", maxWidth: 460, borderLeft: "1px solid #E5E6EB", paddingLeft: 32 }}
          >
            <p style={{ ...inter, display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#7A7D8B", margin: "0 0 14px" }}>
              <MapPin size={24} color="#040617" />
              {settings.address}
            </p>
            <p style={{ ...inter, display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#7A7D8B", margin: "0 0 14px" }}>
              <Mail size={24} color="#040617" />
              {settings.email}
            </p>
            <p style={{ ...inter, display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#7A7D8B", margin: 0 }}>
              <Phone size={24} color="#040617" />
              {settings.phones.join('\u00a0\u00a0\u00a0')}
            </p>
          </motion.div>
        </div>

        {/* Form + Map row */}
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 28, alignItems: "start" }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '48px 0', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#5EDA71', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ ...inter, fontSize: 28, fontWeight: 600, color: '#040617', margin: 0 }}>Message Sent!</h3>
                <p style={{ ...inter, fontSize: 18, color: '#6F7181', margin: 0 }}>Thank you for reaching out. We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <>
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <Field label="First Name" placeholder="Start Typing..." value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
                  <Field label="Last Name (Optional)" placeholder="Start Typing..." value={form.lastName} onChange={update('lastName')} />
                </div>
                <div style={{ marginTop: 18 }}>
                  <Field label="Your Email" placeholder="your@email.com" value={form.email} onChange={update('email')} error={errors.email} />
                </div>
                <div style={{ marginTop: 18 }}>
                  <Field label="Subject" placeholder="How can we help?" value={form.subject} onChange={update('subject')} />
                </div>
                <div style={{ marginTop: 18 }}>
                  <Field label="Your Message" placeholder="Start typing your message..." textarea value={form.message} onChange={update('message')} error={errors.message} />
                </div>
                {errors.submit && <p style={{ ...inter, fontSize: 14, color: '#EF4444', marginTop: 8 }}>{errors.submit}</p>}
                <button type="submit" disabled={loading}
                  style={{ ...inter, marginTop: 32, height: 54, display: "inline-flex", alignItems: "center", gap: 14, borderRadius: 14, border: "none", background: loading ? '#E5E6EB' : "#FFD900", padding: "0 24px", fontSize: 16, fontWeight: 600, color: "#040617", cursor: loading ? 'not-allowed' : "pointer", opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.16 }}
            style={{ height: 500, borderRadius: 18, overflow: "hidden", background: "#000" }}
          >
            <iframe
              title="The Mico Foundation Map"
              src={settings.mapEmbedUrl}
              width="100%" height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-wrapper { padding: 0 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-title { font-size: 34px !important; }
        }
      `}</style>
    </section>
  );
}