"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ ...inter, fontSize: "16px", color: "#414651" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function HeroHeading() {
  return (
    <section
      style={{
        backgroundColor: "#FAF9F6",
        padding: "70px 80px 40px",
        width: "100%",
      }}
    >
      <div style={{ maxWidth: "1650px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="resource-top-grid"
        >
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              ...inter,
              fontSize: "104px",
              fontWeight: 600,
              lineHeight: "0.95",
              letterSpacing: "-0.075em",
              color: "#040617",
              margin: 0,
            }}
          >
            Resource Center
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{
              borderLeft: "1px solid #E5E6EB",
              paddingLeft: "32px",
              marginTop: "8px",
            }}
          >
            <p
              style={{
                ...inter,
                maxWidth: "660px",
                fontSize: "28px",
                lineHeight: "1.45",
                letterSpacing: "-0.03em",
                color: "#7A7D8B",
                margin: 0,
              }}
            >
              We make all of The Mico Foundation evaluation and research reports
              available for public access in accordance with our Accountability
              Policy. These are available at our Evaluation Library.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          style={{ marginTop: "34px" }}
        >
          <h2
            style={{
              ...inter,
              fontSize: "32px",
              fontWeight: 600,
              color: "#040617",
              margin: "0 0 22px",
              letterSpacing: "-0.04em",
            }}
          >
            Search Filter
          </h2>

          <div
            className="resource-filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 1.05fr 1.05fr 240px",
              gap: "16px",
              alignItems: "end",
            }}
          >
            <Field label="Report Name (Optional)">
              <div
                style={{
                  height: "48px",
                  border: "1px solid rgba(4,6,23,0.07)",
                  borderRadius: "8px",
                  backgroundColor: "#FFFDF9",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 14px",
                  gap: "10px",
                }}
              >
                <Search size={22} color="#7A7D8B" />
                <input
                  placeholder="Start typing..."
                  style={{
                    ...inter,
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "16px",
                    color: "#040617",
                  }}
                />
              </div>
            </Field>

            <Field label="Report Type">
              <div
                style={{
                  height: "48px",
                  border: "1px solid rgba(4,6,23,0.07)",
                  borderRadius: "8px",
                  backgroundColor: "#FFFDF9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 14px",
                }}
              >
                <span style={{ ...inter, fontSize: "16px", color: "#7A7D8B" }}>
                  Annual Report, Financial Statement,...
                </span>
                <ChevronDown size={20} color="#7A7D8B" />
              </div>
            </Field>

            <Field label="Sort Reports By">
              <div
                style={{
                  height: "48px",
                  border: "1px solid rgba(4,6,23,0.07)",
                  borderRadius: "8px",
                  backgroundColor: "#FFFDF9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 14px",
                }}
              >
                <span style={{ ...inter, fontSize: "16px", color: "#040617" }}>
                  Newest to Oldest
                </span>
                <ChevronDown size={20} color="#7A7D8B" />
              </div>
            </Field>

            <button
              type="button"
              style={{
                ...inter,
                height: "48px",
                border: "none",
                borderRadius: "12px",
                backgroundColor: "#FFD900",
                color: "#040617",
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <Search size={24} />
              Search
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .resource-top-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .resource-filter-grid {
            grid-template-columns: 1fr !important;
          }

          section h1 {
            font-size: 72px !important;
          }

          section p {
            font-size: 22px !important;
          }
        }
      `}</style>
    </section>
  );
}