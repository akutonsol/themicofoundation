"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

function Field({ label, type = "text", textarea = false, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] text-[#414651]" style={inter}>{label}</label>
      {textarea ? (
        <textarea
          placeholder="Start Typing..."
          rows={5}
          value={value}
          onChange={onChange}
          className="resize-none rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 py-3 text-[16px] text-[#040617] outline-none transition focus:border-[#FFD900]"
          style={{ ...inter, borderColor: error ? '#EF4444' : undefined }}
        />
      ) : (
        <input
          type={type}
          placeholder="Start Typing..."
          value={value}
          onChange={onChange}
          className="rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 py-3 text-[16px] text-[#040617] outline-none transition focus:border-[#FFD900]"
          style={{ ...inter, borderColor: error ? '#EF4444' : undefined }}
        />
      )}
      {error && <span style={{ ...inter, fontSize: '13px', color: '#EF4444' }}>{error}</span>}
    </div>
  );
}

// FIX: marquee offset more to the left
function Ribbon({ color, offset, textColor = "#040617" }) {
  return (
    <div
      className="absolute hidden h-[72px] w-[1200px] items-center gap-10 overflow-hidden lg:flex"
      style={{
        left: "-420px",
        top: "420px",
        backgroundColor: color,
        transform: `rotate(45deg) translateY(${offset}px)`,
      }}
    >
      <div className="flex animate-[marquee_18s_linear_infinite] items-center gap-10 whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="text-[26px] font-semibold tracking-[-0.04em]" style={{ ...inter, color: textColor }}>
            Together For Better Education ✦
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SponsorshipForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', address1: '', address2: '', country: '', city: '', zip: '', state: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      const res = await fetch('/api/sponsorship', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
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
    <section className="relative overflow-hidden bg-[#FFFDF9] px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <Ribbon color="#58DE6E" offset={76} />
      <Ribbon color="#FFD900" offset={0} />

      <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="pt-2">
          <h2 className="text-[34px] font-semibold tracking-[-0.05em] text-[#040617] sm:text-[42px]" style={inter}>Become Our Sponsor</h2>
          <div className="mt-8 max-w-[720px] border-l border-[#E5E6EB] pl-5">
            <p className="text-[20px] leading-[1.5] tracking-[-0.02em] text-[#7A7D8B]" style={inter}>
              The Mico University College has served Jamaica, the wider Caribbean and beyond for more than 180 years. This tradition of endurance and resilience in delivering quality teacher education made The Mico an iconic institution of profound worth in the western hemisphere during the 21st century.
            </p>
            <p className="mt-4 text-[20px] leading-[1.5] tracking-[-0.02em] text-[#7A7D8B]" style={inter}>
              Have a project in mind? Need our expertise? Please complete the form below and we will be in touch with you as soon as possible.
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          className="relative overflow-hidden rounded-[22px] border border-[#E5E6EB] bg-[#FFFDF9] p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
            <div className="grid h-full w-full grid-cols-7 grid-rows-8">
              {Array.from({ length: 56 }).map((_, i) => (<div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />))}
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="mb-8 text-center text-[30px] font-semibold tracking-[-0.04em] text-[#040617]" style={inter}>Sponsorship Form</h3>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5EDA71]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h4 className="text-[24px] font-semibold text-[#040617]" style={inter}>Submission Received!</h4>
                <p className="text-[18px] text-[#6F7181]" style={inter}>Thank you for your interest. We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First Name" value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
                  <Field label="Last Name" value={form.lastName} onChange={update('lastName')} />
                </div>
                <div className="mt-5"><Field label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} /></div>
                <div className="mt-5"><Field label="Address Line 1" value={form.address1} onChange={update('address1')} /></div>
                <div className="mt-5"><Field label="Address Line 2 (Optional)" value={form.address2} onChange={update('address2')} /></div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="Country" value={form.country} onChange={update('country')} />
                  <Field label="City" value={form.city} onChange={update('city')} />
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="ZIP/Postal Code" value={form.zip} onChange={update('zip')} />
                  <Field label="State/Province" value={form.state} onChange={update('state')} />
                </div>
                <div className="mt-5"><Field label="Subject" value={form.subject} onChange={update('subject')} /></div>
                <div className="mt-5"><Field label="Message" textarea value={form.message} onChange={update('message')} error={errors.message} /></div>
                {errors.submit && <p style={{ ...inter, fontSize: '14px', color: '#EF4444', marginTop: '8px' }}>{errors.submit}</p>}
                <div className="mt-10 flex justify-end">
                  <button type="submit" disabled={loading}
                    className="inline-flex min-w-[190px] items-center justify-center gap-3 rounded-[18px] bg-[#FFD900] px-7 py-4 text-[16px] font-semibold text-[#040617] transition hover:scale-[1.02] disabled:opacity-60"
                    style={inter}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}