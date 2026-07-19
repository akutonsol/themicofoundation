"use client";

import { useState, useEffect, useCallback } from "react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const STATUS = {
  healthy:  { label: "All systems healthy", color: "#22C55E", dot: "#22C55E" },
  degraded: { label: "Degraded performance", color: "#F5B700", dot: "#F5B700" },
  down:     { label: "Outage detected",      color: "#EF4444", dot: "#EF4444" },
  unknown:  { label: "Unknown",              color: "#8A8E9D", dot: "#8A8E9D" },
};

function statusOf(s) { return STATUS[s] || STATUS.unknown; }
function timeAgo(iso) {
  if (!iso) return "—";
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return `${Math.floor(d)}s ago`;
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}

export default function ControlCenter() {
  const [authed, setAuthed] = useState(false);
  const [unprotected, setUnprotected] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [gateError, setGateError] = useState("");

  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [lastError, setLastError] = useState("");

  // ── Gate ──
  useEffect(() => {
    async function boot() {
      if (typeof window !== "undefined" && sessionStorage.getItem("cc-auth") === "1") {
        setAuthed(true);
        return;
      }
      try {
        const res = await fetch("/api/controlcenter/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
        const data = await res.json();
        if (data.ok && data.unprotected) { setUnprotected(true); setAuthed(true); }
      } catch { /* show gate */ }
    }
    boot();
  }, []);

  async function submitPasscode(e) {
    e.preventDefault();
    setGateError("");
    try {
      const res = await fetch("/api/controlcenter/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ passcode }) });
      const data = await res.json();
      if (data.ok) { sessionStorage.setItem("cc-auth", "1"); setAuthed(true); }
      else setGateError("Incorrect passcode.");
    } catch { setGateError("Could not verify. Try again."); }
  }

  // ── Data ──
  const runLive = useCallback(async () => {
    setLoading(true); setLastError("");
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data = await res.json();
      setLive(data);
    } catch (err) { setLastError(err.message); }
    finally { setLoading(false); }
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const data = await client.fetch(queries.healthChecks);
      setHistory(data || []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!authed) return;
    runLive();
    loadHistory();
  }, [authed, runLive, loadHistory]);

  // ── Gate screen ──
  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", background: "#05070D", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <form onSubmit={submitPasscode} style={{ ...inter, width: "100%", maxWidth: 380, background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 32, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          <p style={{ ...inter, fontSize: 12, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#f3af19", margin: "0 0 10px" }}>Control Center</p>
          <h1 style={{ ...inter, fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>Maintenance access</h1>
          <p style={{ ...inter, fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 22px" }}>Enter the passcode to view the website health dashboard.</p>
          <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="Passcode"
            style={{ ...inter, width: "100%", height: 48, borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", color: "#fff", padding: "0 14px", fontSize: 15, outline: "none" }} />
          {gateError && <p style={{ ...inter, fontSize: 13, color: "#EF4444", margin: "10px 0 0" }}>{gateError}</p>}
          <button type="submit" style={{ ...inter, width: "100%", marginTop: 18, height: 48, borderRadius: 10, border: "none", background: "#f3af19", color: "#141210", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Unlock</button>
        </form>
      </main>
    );
  }

  const st = statusOf(live?.status);
  const pageChecks = (live?.checks || []).filter(c => c.category === "Pages");
  const okPages = pageChecks.filter(c => c.ok);
  const avgMs = okPages.length ? Math.round(okPages.reduce((a, c) => a + (c.ms || 0), 0) / okPages.length) : 0;
  const passed = (live?.checks || []).filter(c => c.ok).length;
  const total = (live?.checks || []).length;
  const lastCron = history.find(h => h.source === "cron");
  const uptime = history.length ? Math.round((history.filter(h => h.status === "healthy").length / history.length) * 100) : null;

  const groups = ["Pages", "CMS", "Config"];

  return (
    <main style={{ minHeight: "100vh", background: "#05070D", color: "#fff", padding: "clamp(24px,5vw,56px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
          <div>
            <p style={{ ...inter, fontSize: 12, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#f3af19", margin: "0 0 8px" }}>The Mico Foundation · Maintenance</p>
            <h1 style={{ ...inter, fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>Control Center</h1>
            <p style={{ ...inter, fontSize: 15, color: "rgba(255,255,255,0.5)", margin: "8px 0 0" }}>Website health &amp; automated monitoring</p>
          </div>
          <button onClick={runLive} disabled={loading}
            style={{ ...inter, display: "inline-flex", alignItems: "center", gap: 10, background: "#f3af19", color: "#141210", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 12, border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Running checks…" : "Run check now"}
          </button>
        </div>

        {unprotected && (
          <div style={{ ...inter, fontSize: 13, color: "#F5B700", background: "rgba(245,183,0,0.08)", border: "1px solid rgba(245,183,0,0.25)", borderRadius: 10, padding: "10px 14px", marginBottom: 20 }}>
            ⚠ This console is unprotected. Set a <code>CONTROLCENTER_KEY</code> environment variable to require a passcode.
          </div>
        )}

        {/* Status banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#0B0F1A", border: `1px solid ${st.color}44`, borderRadius: 16, padding: "22px 26px", marginBottom: 20 }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: st.dot, boxShadow: `0 0 0 5px ${st.color}22`, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ ...inter, fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 800, color: st.color, margin: 0 }}>{st.label}</p>
            <p style={{ ...inter, fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>{live?.summary || (loading ? "Checking…" : lastError || "—")}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ ...inter, fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Checked</p>
            <p style={{ ...inter, fontSize: 15, fontWeight: 600, color: "#fff", margin: "2px 0 0" }}>{live ? timeAgo(live.runAt) : "—"}</p>
          </div>
        </div>

        {/* Metric tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Checks passed", value: total ? `${passed}/${total}` : "—" },
            { label: "Avg page response", value: avgMs ? `${avgMs} ms` : "—" },
            { label: "Uptime (recent)", value: uptime == null ? "—" : `${uptime}%` },
            { label: "Last scheduled run", value: lastCron ? timeAgo(lastCron.runAt) : "none yet" },
          ].map((t, i) => (
            <div key={i} style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
              <p style={{ ...inter, fontSize: 12, color: "rgba(255,255,255,0.45)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.label}</p>
              <p style={{ ...inter, fontSize: 28, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>{t.value}</p>
            </div>
          ))}
        </div>

        {/* Checks by group */}
        {groups.map(group => {
          const items = (live?.checks || []).filter(c => c.category === group);
          if (!items.length) return null;
          return (
            <section key={group} style={{ marginBottom: 26 }}>
              <h2 style={{ ...inter, fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>{group}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                {items.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "#0B0F1A", border: `1px solid ${c.ok ? "rgba(255,255,255,0.07)" : "rgba(239,68,68,0.4)"}`, borderRadius: 12, padding: "14px 16px" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.ok ? "#22C55E" : "#EF4444", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ ...inter, fontSize: 15, fontWeight: 600, color: "#fff", margin: 0 }}>{c.name}{c.critical && <span style={{ color: "#f3af19", fontSize: 11, marginLeft: 6 }}>critical</span>}</p>
                      <p style={{ ...inter, fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "3px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* History */}
        <section style={{ marginTop: 8 }}>
          <h2 style={{ ...inter, fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Scheduled run history</h2>
          <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
            {history.length === 0 ? (
              <p style={{ ...inter, fontSize: 14, color: "rgba(255,255,255,0.45)", padding: "20px 20px", margin: 0 }}>
                No scheduled runs recorded yet. The cron writes a record every 6 hours; the first one appears after it fires (or trigger it manually — see notes below).
              </p>
            ) : history.map((h, i) => {
              const hs = statusOf(h.status);
              return (
                <div key={h._id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderTop: i ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: hs.dot, flexShrink: 0 }} />
                  <span style={{ ...inter, fontSize: 14, fontWeight: 600, color: hs.color, width: 90, flexShrink: 0, textTransform: "capitalize" }}>{h.status}</span>
                  <span style={{ ...inter, fontSize: 14, color: "rgba(255,255,255,0.7)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.summary}</span>
                  <span style={{ ...inter, fontSize: 12, color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>{h.source}</span>
                  <span style={{ ...inter, fontSize: 13, color: "rgba(255,255,255,0.5)", width: 90, textAlign: "right", flexShrink: 0 }}>{timeAgo(h.runAt)}</span>
                </div>
              );
            })}
          </div>
        </section>

        <p style={{ ...inter, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 28, lineHeight: 1.7 }}>
          Automated monitoring runs on a schedule via Vercel Cron (<code>/api/health/cron</code>, every 6 hours) and stores each run in the CMS.
          &quot;Run check now&quot; performs a live check without recording it. Set <code>CRON_SECRET</code> to secure the scheduled endpoint and <code>CONTROLCENTER_KEY</code> to require a passcode here.
        </p>
      </div>
    </main>
  );
}
