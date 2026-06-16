"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const inter = { fontFamily: "'Inter', sans-serif" };

function DonateResultContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const spiToken = searchParams.get("spiToken");
    const statusParam = searchParams.get("status");
    const message = searchParams.get("message");

    if (statusParam === "declined" || statusParam === "error") {
      setStatus("failed");
      setError(message || "Payment was not completed");
      return;
    }

    if (spiToken && statusParam === "3ds_complete") {
      // Get donation meta from sessionStorage
      let donationMeta = {};
      try {
        donationMeta = JSON.parse(sessionStorage.getItem("donationMeta") || "{}");
        sessionStorage.removeItem("donationMeta");
      } catch {}

      // Complete the payment
      fetch("/api/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spiToken, donationMeta }),
      })
        .then((res) => {
          if (!res.ok) return res.json().then(d => Promise.reject(d));
          return res.json();
        })
        .then((data) => {
          if (data.success && data.approved) {
            setStatus("success");
            setResult(data);
          } else {
            setStatus("failed");
            setError(data.error || "Payment was declined");
          }
        })
        .catch((err) => {
          console.error("Complete payment error:", err);
          // If the server timed out but we got here, the payment may have
          // succeeded anyway — show a neutral message rather than "failed".
          setStatus("failed");
          setError(err?.error || "Payment processing timed out. Check your email — if you received a receipt, the payment succeeded.");
        });
    } else {
      setStatus("failed");
      setError("Invalid payment session");
    }
  }, [searchParams]);

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "#FFFDF9" }}>
      {status === "processing" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", border: "4px solid #FFD900", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />
          <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
          <p style={{ ...inter, fontSize: "20px", color: "#040617" }}>Processing your donation...</p>
        </motion.div>
      )}

      {status === "success" && result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", maxWidth: "520px" }}>
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
          <h1 style={{ ...inter, fontSize: "36px", fontWeight: 700, color: "#040617", letterSpacing: "-0.04em", marginBottom: "16px" }}>
            Thank You!
          </h1>
          <p style={{ ...inter, fontSize: "18px", color: "#6F7181", marginBottom: "32px" }}>
            Your donation has been successfully processed.
          </p>
          <div style={{ background: "#F5F3EE", borderRadius: "16px", padding: "24px", textAlign: "left", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ ...inter, fontSize: "15px", color: "#6F7181" }}>Authorization Code</span>
              <span style={{ ...inter, fontSize: "15px", fontWeight: 600, color: "#040617" }}>{result.authorizationCode}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ ...inter, fontSize: "15px", color: "#6F7181" }}>Order ID</span>
              <span style={{ ...inter, fontSize: "15px", fontWeight: 600, color: "#040617" }}>{result.orderId}</span>
            </div>
            {result.cardBrand && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ ...inter, fontSize: "15px", color: "#6F7181" }}>Card</span>
                <span style={{ ...inter, fontSize: "15px", fontWeight: 600, color: "#040617" }}>{result.cardBrand}</span>
              </div>
            )}
          </div>
          <a href="/" style={{ ...inter, display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "14px", background: "#FFD900", color: "#040617", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
            Return to Home
          </a>
        </motion.div>
      )}

      {status === "failed" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>❌</div>
          <h1 style={{ ...inter, fontSize: "36px", fontWeight: 700, color: "#040617", letterSpacing: "-0.04em", marginBottom: "16px" }}>
            Payment Failed
          </h1>
          <p style={{ ...inter, fontSize: "18px", color: "#6F7181", marginBottom: "32px" }}>
            {error || "Your payment could not be processed. Please try again."}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <a href="/donate" style={{ ...inter, display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "14px", background: "#FFD900", color: "#040617", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
              Try Again
            </a>
            <a href="/" style={{ ...inter, display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "14px", border: "1px solid #E5E6EB", color: "#040617", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
              Go Home
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function DonateResultPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#6F7181" }}>Loading...</p></div>}>
      <DonateResultContent />
    </Suspense>
  );
}
