"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

function Field({ label, placeholder, textarea = false }) {
  return (
    <div>
      <label style={{ ...inter, display: "block", marginBottom: 8, fontSize: 16, color: "#414651" }}>
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={6}
          placeholder={placeholder}
          style={{
            ...inter,
            width: "100%",
            height: 170,
            resize: "none",
            borderRadius: 8,
            border: "1px solid #D9DDE6",
            background: "#FFFDF9",
            padding: "16px",
            fontSize: 16,
            color: "#040617",
            outline: "none",
          }}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          style={{
            ...inter,
            width: "100%",
            height: 48,
            borderRadius: 8,
            border: "1px solid #D9DDE6",
            background: "#FFFDF9",
            padding: "0 16px",
            fontSize: 16,
            color: "#040617",
            outline: "none",
          }}
        />
      )}
    </div>
  );
}

export default function ContactUs() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#FAF9F6", padding: "48px 0 80px" }}>
      <div className="contact-wrapper" style={{ position: "relative", zIndex: 1, maxWidth: "1720px", margin: "0 auto", padding: "0 48px" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 0.72fr", gap: 40, marginBottom: 56, alignItems: "start" }}>
          <motion.h1
            className="contact-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              ...inter,
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.06em",
              color: "#040617",
              margin: 0,
            }}
          >
            Contact Form
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{ justifySelf: "end", maxWidth: 460, borderLeft: "1px solid #E5E6EB", paddingLeft: 32 }}
          >
            <p style={{ ...inter, display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#7A7D8B", margin: "0 0 14px" }}>
              <MapPin size={24} color="#040617" />
              1A Marescaux Road, Kingston 5.
            </p>

            <p style={{ ...inter, display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#7A7D8B", margin: "0 0 14px" }}>
              <Mail size={24} color="#040617" />
              micofoundation@yahoo.com.
            </p>

            <p style={{ ...inter, display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#7A7D8B", margin: 0 }}>
              <Phone size={24} color="#040617" />
              (876) 929-5260-9&nbsp;&nbsp; (876) 665-7788
            </p>
          </motion.div>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 28, alignItems: "start" }}>
          <motion.form
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="First Name" placeholder="Start Typing..." />
              <Field label="Last Name (Optional)" placeholder="Start Typing..." />
            </div>

            <div style={{ marginTop: 18 }}>
              <Field label="Your Email" placeholder="olivia@untitledui.com" />
            </div>

            <div style={{ marginTop: 18 }}>
              <Field label="Subject" placeholder="olivia@untitledui.com" />
            </div>

            <div style={{ marginTop: 18 }}>
              <Field label="Your Message" placeholder="Start typing your message..." textarea />
            </div>

            <button
              type="submit"
              style={{
                ...inter,
                marginTop: 32,
                height: 54,
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                borderRadius: 14,
                border: "none",
                background: "#FFD900",
                padding: "0 24px",
                fontSize: 16,
                fontWeight: 600,
                color: "#040617",
                cursor: "pointer",
              }}
            >
              Send Message
              <ArrowRight size={20} />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16 }}
            style={{ height: 500, borderRadius: 18, overflow: "hidden", background: "#000" }}
          >
            <iframe
              title="The Mico Foundation Map"
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1A%20Marescaux%20Road,%20Kingston%205,%20Jamaica&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-wrapper {
            padding: 0 24px !important;
          }

          .contact-grid {
            grid-template-columns: 1fr !important;
          }

          .contact-title {
            font-size: 72px !important;
          }
        }
      `}</style>
    </section>
  );
}