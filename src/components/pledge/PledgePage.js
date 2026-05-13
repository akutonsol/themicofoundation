"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Wallet,
} from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

const project = {
  title: "Buxton College Restoration",
  status: "Active Project",
  location: "Jamaica, Buxton",
  mediaType: "image", // "video" or "image"
  mediaUrl:
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=2200&q=80",
  videoUrl: "/videos/buxton-college.mp4",
  description:
    "Support the restoration of Buxton College, a historic landmark dedicated to education, heritage, and community impact. Your pledge helps preserve this important space for future generations.",
};

const currencies = ["USD", "JM", "GBP", "CAN"];
const countries = ["Jamaica", "United States", "Canada", "United Kingdom", "Other"];

const paymentMethods = [
  { id: "bank", label: "Bank Transfer", icon: Landmark },
  { id: "check", label: "Cheque / Check", icon: Banknote },
  { id: "cash", label: "Cash Deposit", icon: Wallet },
  { id: "zelle", label: "Zelle", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: CreditCard },
];

function Field({ label, required, placeholder, type = "text" }) {
  return (
    <div>
      <label
        style={{
          ...inter,
          display: "block",
          marginBottom: 8,
          fontSize: 15,
          fontWeight: 600,
          color: "#040617",
        }}
      >
        {label} {required && <span style={{ color: "#E11D48" }}>*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        style={{
          ...inter,
          width: "100%",
          height: 54,
          border: "1px solid #E5E6EB",
          borderRadius: 12,
          background: "#FFFDF9",
          padding: "0 16px",
          fontSize: 16,
          color: "#040617",
          outline: "none",
        }}
      />
    </div>
  );
}

function BankingDetails({ country, method }) {
  const isJamaica = country === "Jamaica";

  if (method === "paypal") {
    return (
      <InfoBox
        title="PayPal Details"
        items={[
          "PayPal Email: my.foundation@mucfa.org",
          "Please include your full name and project name in the note.",
          "Project: Buxton College Restoration",
        ]}
      />
    );
  }

  if (method === "zelle") {
    return (
      <InfoBox
        title="Zelle Details"
        items={[
          "Zelle Email: my.foundation@mucfa.org",
          "For US residents only.",
          "Please include your full name and project name in the memo.",
        ]}
      />
    );
  }

  if (method === "cash") {
    return isJamaica ? (
      <InfoBox
        title="Cash Deposit Details"
        items={[
          "Deposit to: Mico Heritage Enterprise, BNS New Kingston",
          "Account #: 10006017",
          "Transit #: 50575",
          "Please keep your deposit receipt for confirmation.",
        ]}
      />
    ) : (
      <InfoBox
        title="Cash Deposit Details"
        items={[
          "For international donors, please contact MUCFA before making a cash deposit.",
          "Email: my.foundation@mucfa.org",
          "Phone: 678-294-9934",
        ]}
      />
    );
  }

  if (isJamaica) {
    return (
      <InfoBox
        title="Make your donation using the following Banking Details"
        items={[
          "Mico Heritage Enterprise, BNS New Kingston",
          "ACCOUNT # 10006017",
          "Swift Code: NOSCJMNK",
          "TRANSIT # 50575",
          "You may also send Checks to The Mico Foundation, 1A Marescaux Road, Kingston 5.",
        ]}
      />
    );
  }

  return (
    <InfoBox
      title="MUCFA Banking Details"
      items={[
        "Registered Office: 2717 Nettle Lane, Buford GA 30519",
        "Mailing Address: 2717 Nettle Lane, Buford GA 30519",
        "Email Address: my.foundation@mucfa.org",
        "Phone Number: 678-294-9934",
        "Bank Name: Chase",
        "Account Number: 933309911",
        "Zelle, US residents: my.foundation@mucfa.org",
        "Visit: MUCFA",
      ]}
    />
  );
}

function InfoBox({ title, items }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        background: "#FFF7CC",
        border: "1px solid rgba(255, 217, 0, 0.45)",
        borderRadius: 18,
        padding: 24,
      }}
    >
      <h3
        style={{
          ...inter,
          fontSize: 20,
          fontWeight: 700,
          color: "#040617",
          margin: "0 0 18px",
        }}
      >
        {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item) => (
          <p
            key={item}
            style={{
              ...inter,
              display: "flex",
              gap: 10,
              fontSize: 16,
              lineHeight: 1.45,
              color: "#040617",
              margin: 0,
            }}
          >
            <Check size={18} color="#040617" style={{ marginTop: 2, flexShrink: 0 }} />
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function PledgePage() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("100.00");
  const [country, setCountry] = useState("Jamaica");
  const [method, setMethod] = useState("bank");
  const [commitment, setCommitment] = useState("30 Days");

  const formattedAmount = useMemo(() => {
    const clean = Number(amount || 0);
    return `${currency} ${clean.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [amount, currency]);

  return (
    <main style={{ background: "#FAF9F6" }}>
      <section style={{ width: "100%",
    padding: "64px 72px 96px" }}>
       <div
  style={{
    width: "70%",
    maxWidth: "100%",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "0.85fr 1.15fr",
    gap: 48,
    alignItems: "start",
  }}
  className="pledge-grid"
>
          {/* LEFT PROJECT OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              position: "sticky",
              top: 30,
            }}
          >
            <p
              style={{
                ...inter,
                fontSize: 20,
                fontWeight: 600,
                color: "#FFD900",
                margin: "0 0 12px",
              }}
            >
              {project.status}
            </p>

            <h1
              style={{
                ...inter,
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: "-0.08em",
                color: "#040617",
                margin: 0,
              }}
            >
              Pledge To
              <br />
              {project.title}
            </h1>

            <p
              style={{
                ...inter,
                marginTop: 28,
                fontSize: 22,
                lineHeight: 1.5,
                color: "#6F7181",
                maxWidth: 620,
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                marginTop: 30,
                display: "flex",
                gap: 10,
                alignItems: "center",
                color: "#6F7181",
                fontSize: 18,
                ...inter,
              }}
            >
              <MapPin size={20} color="#040617" />
              {project.location}
            </div>

            <div
              style={{
                marginTop: 34,
                height: 420,
                borderRadius: 28,
                overflow: "hidden",
                background: "#040617",
              }}
            >
              {project.mediaType === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={project.videoUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={project.mediaUrl}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E5E6EB",
              borderRadius: 30,
              padding: 38,
              boxShadow: "0 20px 80px rgba(0,0,0,0.04)",
            }}
          >
            <h2
              style={{
                ...inter,
                fontSize: 38,
                fontWeight: 700,
                letterSpacing: "-0.05em",
                color: "#040617",
                margin: "0 0 8px",
              }}
            >
              Pledge Form
            </h2>

            <p style={{ ...inter, fontSize: 17, color: "#6F7181", margin: "0 0 30px" }}>
              Choose your pledge amount, donation method, and banking location.
            </p>

            {/* Currency */}
            <div>
              <p
                style={{
                  ...inter,
                  color: "#E11D48",
                  fontSize: 15,
                  fontWeight: 600,
                  margin: "0 0 12px",
                }}
              >
                Choose currency type
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {currencies.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCurrency(item)}
                    style={{
                      ...inter,
                      height: 42,
                      padding: "0 18px",
                      borderRadius: 999,
                      border: "1px solid #E5E6EB",
                      background: currency === item ? "#040617" : "#F3F4F6",
                      color: currency === item ? "#FFFFFF" : "#040617",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div style={{ marginTop: 28 }}>
              <label
                style={{
                  ...inter,
                  display: "block",
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#040617",
                }}
              >
                Make your pledge or donation by entering an Amount
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid #FFD900",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#FFFDF9",
                }}
              >
                <span
                  style={{
                    ...inter,
                    padding: "0 18px",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#040617",
                    borderRight: "1px solid #E5E6EB",
                  }}
                >
                  {currency}
                </span>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    ...inter,
                    width: "100%",
                    height: 64,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    padding: "0 18px",
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#040617",
                  }}
                />
              </div>

              <p
                style={{
                  ...inter,
                  marginTop: 10,
                  fontSize: 18,
                  color: "#6F7181",
                }}
              >
                Amount pledged:{" "}
                <span style={{ color: "#040617", fontWeight: 800 }}>
                  {formattedAmount}
                </span>
              </p>
            </div>

            {/* Personal Info */}
            <div style={{ marginTop: 42 }}>
              <h3
                style={{
                  ...inter,
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#040617",
                  margin: "0 0 8px",
                  textTransform: "uppercase",
                }}
              >
                Personal Info
              </h3>

              <p style={{ ...inter, fontSize: 16, color: "#6F7181", margin: "0 0 26px" }}>
                Complete and submit the form below to reflect your donation or pledge.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="First Name:" required placeholder="First Name" />
                <Field label="Last Name:" required placeholder="Last Name" />
                <Field label="Email Address:" required placeholder="Email Address" />
                <Field label="Donor Phone Number:" required placeholder="Phone Number" />
              </div>
            </div>

            {/* Country + Commitment */}
            <div
              style={{
                marginTop: 26,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              <div>
                <label
                  style={{
                    ...inter,
                    display: "block",
                    marginBottom: 8,
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#040617",
                  }}
                >
                  Select Your Country And Follow Banking Instruction: *
                </label>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{
                    ...inter,
                    width: "100%",
                    height: 54,
                    border: "none",
                    borderRadius: 12,
                    background: "#FFD900",
                    padding: "0 16px",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#040617",
                    outline: "none",
                  }}
                >
                  {countries.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    ...inter,
                    display: "block",
                    marginBottom: 14,
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#040617",
                  }}
                >
                  I will fulfil this commitment within
                </label>

                <div style={{ display: "flex", gap: 14 }}>
                  {["30 Days", "60 Days"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCommitment(item)}
                      style={{
                        ...inter,
                        height: 42,
                        padding: "0 16px",
                        borderRadius: 999,
                        border: "1px solid #E5E6EB",
                        background: commitment === item ? "#040617" : "#F3F4F6",
                        color: commitment === item ? "#FFFFFF" : "#040617",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ marginTop: 34 }}>
              <h3
                style={{
                  ...inter,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#040617",
                  margin: "0 0 16px",
                }}
              >
                Choose Payment Method
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 12,
                }}
              >
                {paymentMethods.map((item) => {
                  const Icon = item.icon;
                  const active = method === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMethod(item.id)}
                      style={{
                        ...inter,
                        minHeight: 96,
                        border: `1px solid ${active ? "#FFD900" : "#E5E6EB"}`,
                        borderRadius: 16,
                        background: active ? "#FFF7CC" : "#FFFDF9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        cursor: "pointer",
                        color: "#040617",
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      <Icon size={26} />
                      <span style={{ fontSize: 12 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                marginTop: 34,
                display: "grid",
                gridTemplateColumns: "0.85fr 1.15fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <div>
                <p
                  style={{
                    ...inter,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#040617",
                    margin: "0 0 10px",
                  }}
                >
                  Amount Pledged
                </p>

                <p
                  style={{
                    ...inter,
                    fontSize: 36,
                    fontWeight: 800,
                    color: "#040617",
                    margin: 0,
                  }}
                >
                  {formattedAmount}
                </p>

                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ ...inter, display: "flex", gap: 10, margin: 0, color: "#6F7181" }}>
                    <Mail size={18} color="#040617" />
                    Confirmation will be sent by email.
                  </p>
                  <p style={{ ...inter, display: "flex", gap: 10, margin: 0, color: "#6F7181" }}>
                    <Phone size={18} color="#040617" />
                    Our team may contact you for follow-up.
                  </p>
                </div>
              </div>

              <BankingDetails country={country} method={method} />
            </div>

            <div style={{ marginTop: 42, display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  ...inter,
                  height: 58,
                  border: "none",
                  borderRadius: 16,
                  background: "#FFD900",
                  padding: "0 42px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#040617",
                  cursor: "pointer",
                }}
              >
                Submit Pledge
                <ArrowRight size={22} />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .pledge-grid {
            grid-template-columns: 1fr !important;
          }

          .pledge-grid > div:first-child {
            position: relative !important;
            top: auto !important;
          }

          form div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}