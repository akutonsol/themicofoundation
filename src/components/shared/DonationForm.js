"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inter = { fontFamily: "'Inter', sans-serif" };

const AMOUNTS = [25, 50, 100, 250, 500, 1000];
const DONATION_TYPES = [
  { value: "general", label: "General Fund" },
  { value: "scholarship", label: "Scholarship Fund" },
  { value: "restoration", label: "Historic Restoration" },
  { value: "campus", label: "Campus Development" },
  { value: "community", label: "Community Programs" },
];

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const clean = value.replace(/\D/g, "").slice(0, 4);
  if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2);
  return clean;
}

export default function DonationForm() {
  const [step, setStep] = useState(1); // 1=amount, 2=card, 3=3ds
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("general");
  const [message, setMessage] = useState("");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectData, setRedirectData] = useState(null);
  const [spiToken, setSpiToken] = useState(null);
  const [donationMeta, setDonationMeta] = useState(null);

  const finalAmount = amount === "custom" ? customAmount : amount;

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handlePayment = async () => {
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (!cardNumber || !cardExpiry || !cardCvv || !cardholderName || !email) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(finalAmount),
          currency: "840",
          cardPan: cardNumber.replace(/\s/g, ""),
          cardCvv,
          //cardExpiration: cardExpiry.replace("/", ""),
         cardExpiration: (() => { const [mm, yy] = cardExpiry.split("/"); return `${yy}${mm}`; })(),
          cardholderName,
          email,
          phone,
          donationType,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Payment failed. Please try again.");
        return;
      }

      const meta = data.donationMeta || {};
      setDonationMeta(meta);

      // Store meta in sessionStorage for the result page
      try {
        sessionStorage.setItem("donationMeta", JSON.stringify(meta));
      } catch {}

      if (data.requiresRedirect && data.redirectData) {
        // Show 3DS iFrame
        setRedirectData(data.redirectData);
        setStep(3);
      } else if (data.spiToken) {
        // No 3DS required - complete payment directly
        setSpiToken(data.spiToken);
        await completePayment(data.spiToken, meta);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const completePayment = async (token, meta) => {
    try {
      const res = await fetch("/api/donate/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spiToken: token, donationMeta: meta }),
      });
      const data = await res.json();
      if (data.success && data.approved) {
        window.location.href = `/donate-result?status=success`;
      } else {
        setError(data.error || "Payment was declined");
        setStep(2);
      }
    } catch {
      setError("Failed to complete payment");
      setStep(2);
    }
  };

  return (
    <section style={{ background: "#FFFDF9", padding: "clamp(60px,8vw,100px) clamp(20px,5vw,60px)" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <h2 style={{ ...inter, fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, color: "#040617", letterSpacing: "-0.05em", marginBottom: "8px", textAlign: "center" }}>
          Make a Donation
        </h2>
        <p style={{ ...inter, fontSize: "18px", color: "#6F7181", textAlign: "center", marginBottom: "48px" }}>
          Support education, restoration, and community development across Jamaica.
        </p>

        {/* Step 1 — Amount */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ marginBottom: "32px" }}>
              <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "16px" }}>
                Select Amount (USD)
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }}>
                {AMOUNTS.map((val) => (
                  <button key={val} type="button" onClick={() => handleAmountSelect(String(val))}
                    style={{ ...inter, padding: "16px", borderRadius: "12px", border: `2px solid ${amount === String(val) ? "#FFD900" : "#E5E6EB"}`, background: amount === String(val) ? "#FFF7CC" : "#FFFFFF", color: "#040617", fontSize: "18px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                    ${val}
                  </button>
                ))}
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", color: "#6F7181", fontWeight: 600 }}>$</span>
                <input type="number" placeholder="Custom amount" value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount("custom"); }}
                  style={{ ...inter, width: "100%", padding: "16px 16px 16px 36px", borderRadius: "12px", border: `2px solid ${amount === "custom" ? "#FFD900" : "#E5E6EB"}`, fontSize: "18px", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "12px" }}>
                Donation Type
              </label>
              <select value={donationType} onChange={(e) => setDonationType(e.target.value)}
                style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", background: "#FFFFFF", outline: "none", cursor: "pointer" }}>
                {DONATION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "12px" }}>
                Message (optional)
              </label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a message with your donation..."
                style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", minHeight: "100px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
            </div>

            <button type="button" onClick={() => { if (!finalAmount || parseFloat(finalAmount) <= 0) { setError("Please select or enter an amount"); return; } setError(""); setStep(2); }}
              style={{ ...inter, width: "100%", padding: "18px", borderRadius: "14px", background: "#FFD900", color: "#040617", fontSize: "18px", fontWeight: 700, border: "none", cursor: "pointer" }}>
              Continue to Payment →
            </button>
            {error && <p style={{ ...inter, color: "#EF4444", textAlign: "center", marginTop: "12px" }}>{error}</p>}
          </motion.div>
        )}

        {/* Step 2 — Card Details */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button type="button" onClick={() => { setStep(1); setError(""); }}
              style={{ ...inter, background: "none", border: "none", color: "#6F7181", fontSize: "16px", cursor: "pointer", marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
              ← Back
            </button>

            <div style={{ background: "#F5F3EE", borderRadius: "16px", padding: "20px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...inter, fontSize: "16px", color: "#6F7181" }}>Donation Amount</span>
              <span style={{ ...inter, fontSize: "24px", fontWeight: 700, color: "#040617" }}>${finalAmount} USD</span>
            </div>

            <div style={{ display: "grid", gap: "20px", marginBottom: "32px" }}>
              {/* Cardholder Name */}
              <div>
                <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", display: "block", marginBottom: "8px" }}>Cardholder Name *</label>
                <input type="text" placeholder="John Smith" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)}
                  style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
              </div>

              {/* Card Number */}
              <div>
                <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", display: "block", marginBottom: "8px" }}>Card Number *</label>
                <input type="text" inputMode="numeric" placeholder="4012 0000 0000 2006" value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} maxLength={19}
                  style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "18px", outline: "none", letterSpacing: "0.1em", boxSizing: "border-box" }} />
              </div>

              {/* Expiry + CVV */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", display: "block", marginBottom: "8px" }}>Expiry Date *</label>
                  <input type="text" inputMode="numeric" placeholder="MM/YY" value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} maxLength={5}
                    style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "18px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", display: "block", marginBottom: "8px" }}>CVV *</label>
                  <input type="text" inputMode="numeric" placeholder="323" value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4}
                    style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "18px", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", display: "block", marginBottom: "8px" }}>Email Address *</label>
                <input type="text" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
              </div>

              {/* Phone */}
              <div>
                <label style={{ ...inter, fontSize: "14px", fontWeight: 600, color: "#040617", display: "block", marginBottom: "8px" }}>Phone <span style={{ color: "#6F7181", fontWeight: 400 }}>(optional)</span></label>
                <input type="text" inputMode="tel" placeholder="+1 876 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)}
                  style={{ ...inter, width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #E5E6EB", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            {error && <p style={{ ...inter, color: "#EF4444", marginBottom: "16px", textAlign: "center" }}>{error}</p>}

            <button type="button" onClick={handlePayment} disabled={loading}
              style={{ ...inter, width: "100%", padding: "18px", borderRadius: "14px", background: loading ? "#E5E6EB" : "#FFD900", color: "#040617", fontSize: "18px", fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Processing..." : `Donate $${finalAmount} Securely →`}
            </button>

            {/* Security badges */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
              <img src="/images/home-static/powertranz-logo-gray.png" alt="Powered by PowerTranz" style={{ height: "28px", opacity: 0.6 }} />
              <img src="/images/home-static/3dsecure.png" alt="3D Secure" style={{ height: "28px", opacity: 0.6 }} />
              <img src="/images/home-static/visa.png" alt="Visa" style={{ height: "22px", opacity: 0.6 }} />
              <img src="/images/home-static/mastercard.png" alt="Mastercard" style={{ height: "28px", opacity: 0.6 }} />
            </div>
          </motion.div>
        )}

        {/* Step 3 — 3DS iFrame */}
        {step === 3 && redirectData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <p style={{ ...inter, fontSize: "18px", color: "#040617", fontWeight: 600, marginBottom: "8px" }}>
                🔒 Authenticating with your bank...
              </p>
              <p style={{ ...inter, fontSize: "15px", color: "#6F7181" }}>
                Please complete the verification in the window below.
              </p>
            </div>
            <div style={{ border: "2px solid #E5E6EB", borderRadius: "16px", overflow: "hidden" }}>
              <iframe
                srcDoc={redirectData}
                frameBorder="0"
                width="100%"
                height="500"
                style={{ display: "block" }}
                title="3D Secure Authentication"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}