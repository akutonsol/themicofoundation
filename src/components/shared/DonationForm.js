"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const imgLocation = "/images/home-static/location-pin.svg";
const imgSparkle  = "/images/home-static/sparkle-large.png";
const inter = { fontFamily: "'Inter', sans-serif" };


function ArrowIcon({ size = 24, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AMOUNTS_MONTHLY = ["$5/Month","$10/Month","$30/Month","$100/Month","$50/Month","$20/Month"];
const AMOUNTS_ONCE    = ["$10","$25","$30","$100","$50","$250"];
const TOTAL_DESKTOP   = 40;
const TOTAL_MOBILE    = 24;

const formatCurrency = (n) => {
  if (n >= 1000000) return "$" + Math.round(n/1000000) + "M";
  if (n >= 1000)    return "$" + Math.round(n/1000) + "K";
  return "$" + n;
};

const COUNTRY_ISO_NUMERIC = {
  'jamaica': '388', 'jm': '388',
  'united states': '840', 'usa': '840', 'us': '840', 'united states of america': '840',
  'canada': '124', 'ca': '124',
  'united kingdom': '826', 'uk': '826', 'gb': '826', 'great britain': '826',
  'trinidad': '780', 'trinidad and tobago': '780', 'tt': '780',
  'barbados': '052', 'bb': '052',
  'bahamas': '044', 'bs': '044',
  'guyana': '328', 'gy': '328',
  'antigua': '028', 'antigua and barbuda': '028',
  'st lucia': '662', 'saint lucia': '662',
};
function getCountryNumericCode(name) {
  if (!name) return '840';
  return COUNTRY_ISO_NUMERIC[name.trim().toLowerCase()] || '840';
}

// Build /api/receipt URL client-side (relative, no SITE_URL dependency)
function buildClientReceiptUrl(result, meta) {
  try {
    const donorName = ((meta?.firstName || '') + ' ' + (meta?.lastName || '')).trim()
      || meta?.cardholderName || 'Donor';
    const receiptData = {
      donorName,
      donorEmail:    meta?.email        || '',
      amount:        result?.amount     || meta?.amount   || 0,
      orderId:       result?.orderId    || meta?.orderId  || '',
      transactionId: result?.transactionId || '',
      authCode:      result?.authorizationCode || '',
      cardBrand:     result?.cardBrand  || '',
      projectTitle:  meta?.projectTitle || '',
      donationType:  meta?.donationType || 'once',
      address:       meta?.address      || '',
      city:          meta?.city         || '',
      state:         meta?.state        || '',
      zip:           meta?.postalCode   || '',
      country:       meta?.country      || 'Jamaica',
      processedAt:   new Date().toISOString(),
    };
    const json   = JSON.stringify(receiptData);
    const bytes  = new TextEncoder().encode(json);
    const binary = Array.from(bytes, b => String.fromCharCode(b)).join('');
    const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return '/api/receipt?data=' + encoded;
  } catch {
    return null;
  }
}

// Download the PDF via fetch so the browser always uses the correct filename/type
async function downloadReceiptPDF(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('[Receipt] Route returned', res.status, res.statusText);
      throw new Error('Server returned ' + res.status);
    }
    const blob = await res.blob();
    console.log('[Receipt] Blob type:', blob.type, '| size:', blob.size);
    if (blob.size === 0) throw new Error('Empty PDF response');
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'Mico-Foundation-Donation-Receipt.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
  } catch (e) {
    console.error('[Receipt] Download failed:', e.message);
    alert('Receipt download failed: ' + e.message + '\nPlease contact support if the problem persists.');
  }
}

function formatCardNumber(v) {
  return v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
}
function formatExpiry(v) {
  const c = v.replace(/\D/g,"").slice(0,4);
  if (c.length >= 3) return c.slice(0,2) + "/" + c.slice(2);
  return c;
}

function detectCardType(number) {
  const n = number.replace(/\s/g,"");
  if (/^4/.test(n))               return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n))           return "amex";
  if (/^6(011|5|4[4-9]|22)/.test(n)) return "discover";
  return null;
}

function CardTypeIcon({ type }) {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center", borderRadius:"4px", padding:"2px 6px", fontSize:"11px", fontWeight:700, letterSpacing:"0.05em", fontFamily:"'Inter',sans-serif" };
  if (type === "visa") return <span style={{...base, backgroundColor:"#1A1F71", color:"white"}}>VISA</span>;
  if (type === "mastercard") return (
    <span style={{display:"inline-flex", alignItems:"center"}}>
      <span style={{width:"18px", height:"18px", borderRadius:"50%", backgroundColor:"#EB001B", display:"inline-block"}}/>
      <span style={{width:"18px", height:"18px", borderRadius:"50%", backgroundColor:"#F79E1B", display:"inline-block", marginLeft:"-7px"}}/>
    </span>
  );
  if (type === "amex")     return <span style={{...base, backgroundColor:"#007BC1", color:"white"}}>AMEX</span>;
  if (type === "discover") return <span style={{...base, backgroundColor:"#FF6600", color:"white"}}>DISC</span>;
  return null;
}

const COUNTRIES = [
  { code:"JM", name:"Jamaica",                        states:["Clarendon","Hanover","Kingston","Manchester","Portland","Saint Andrew","Saint Ann","Saint Catherine","Saint Elizabeth","Saint James","Saint Mary","Saint Thomas","Trelawny","Westmoreland"] },
  { code:"US", name:"United States",                  states:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia"] },
  { code:"CA", name:"Canada",                         states:["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"] },
  { code:"GB", name:"United Kingdom",                 states:["England","Scotland","Wales","Northern Ireland"] },
  { code:"AG", name:"Antigua and Barbuda",            states:[] },
  { code:"BB", name:"Barbados",                       states:[] },
  { code:"BS", name:"Bahamas",                        states:[] },
  { code:"BZ", name:"Belize",                         states:[] },
  { code:"DM", name:"Dominica",                       states:[] },
  { code:"DO", name:"Dominican Republic",             states:[] },
  { code:"GD", name:"Grenada",                        states:[] },
  { code:"GY", name:"Guyana",                         states:[] },
  { code:"HT", name:"Haiti",                          states:[] },
  { code:"KN", name:"Saint Kitts and Nevis",          states:[] },
  { code:"LC", name:"Saint Lucia",                    states:[] },
  { code:"SR", name:"Suriname",                       states:[] },
  { code:"TT", name:"Trinidad and Tobago",            states:[] },
  { code:"VC", name:"Saint Vincent and the Grenadines", states:[] },
  { code:"AU", name:"Australia",                      states:["Australian Capital Territory","New South Wales","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia"] },
  { code:"DE", name:"Germany",                        states:[] },
  { code:"FR", name:"France",                         states:[] },
  { code:"IN", name:"India",                          states:[] },
  { code:"NG", name:"Nigeria",                        states:[] },
  { code:"NL", name:"Netherlands",                    states:[] },
  { code:"NZ", name:"New Zealand",                    states:[] },
  { code:"SG", name:"Singapore",                      states:[] },
  { code:"ZA", name:"South Africa",                   states:[] },
];

// Per-country config: ZIP label (null = no ZIP), state label, phone placeholder
const COUNTRY_CONFIG = {
  JM: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(876) 555-0000" },
  US: { zipLabel:"ZIP Code",       zipRequired:true,  stateLabel:"State",             phonePh:"(555) 000-0000" },
  CA: { zipLabel:"Postal Code",    zipRequired:true,  stateLabel:"Province",          phonePh:"(555) 000-0000" },
  GB: { zipLabel:"Postcode",       zipRequired:true,  stateLabel:"County / Region",   phonePh:"+44 7700 900000" },
  AU: { zipLabel:"Postcode",       zipRequired:true,  stateLabel:"State / Territory", phonePh:"+61 400 000 000" },
  AG: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(268) 555-0000" },
  BB: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(246) 555-0000" },
  BS: { zipLabel:null,             zipRequired:false, stateLabel:"Island",            phonePh:"(242) 555-0000" },
  BZ: { zipLabel:null,             zipRequired:false, stateLabel:"District",          phonePh:"(501) 555-0000" },
  DM: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(767) 555-0000" },
  DO: { zipLabel:"Postal Code",    zipRequired:false, stateLabel:"Province",          phonePh:"(809) 555-0000" },
  GD: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(473) 555-0000" },
  GY: { zipLabel:null,             zipRequired:false, stateLabel:"Region",            phonePh:"(592) 555-0000" },
  HT: { zipLabel:null,             zipRequired:false, stateLabel:"Department",        phonePh:"(509) 555-0000" },
  KN: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(869) 555-0000" },
  LC: { zipLabel:null,             zipRequired:false, stateLabel:"District",          phonePh:"(758) 555-0000" },
  SR: { zipLabel:null,             zipRequired:false, stateLabel:"District",          phonePh:"(597) 555-0000" },
  TT: { zipLabel:null,             zipRequired:false, stateLabel:"Borough / County",  phonePh:"(868) 555-0000" },
  VC: { zipLabel:null,             zipRequired:false, stateLabel:"Parish",            phonePh:"(784) 555-0000" },
  DE: { zipLabel:"Postal Code",    zipRequired:true,  stateLabel:"State",             phonePh:"+49 30 000 0000" },
  FR: { zipLabel:"Postal Code",    zipRequired:true,  stateLabel:"Region",            phonePh:"+33 6 00 00 00 00" },
  IN: { zipLabel:"PIN Code",       zipRequired:true,  stateLabel:"State",             phonePh:"+91 98765 43210" },
  NG: { zipLabel:"Postal Code",    zipRequired:false, stateLabel:"State",             phonePh:"+234 800 000 0000" },
  NL: { zipLabel:"Postcode",       zipRequired:true,  stateLabel:"Province",          phonePh:"+31 6 00 000000" },
  NZ: { zipLabel:"Postcode",       zipRequired:true,  stateLabel:"Region",            phonePh:"+64 21 000 0000" },
  SG: { zipLabel:"Postal Code",    zipRequired:true,  stateLabel:"District",          phonePh:"+65 9123 4567" },
  ZA: { zipLabel:"Postal Code",    zipRequired:true,  stateLabel:"Province",          phonePh:"+27 71 000 0000" },
};
function getCountryCfg(code) {
  return COUNTRY_CONFIG[code] || { zipLabel:"Postal Code", zipRequired:false, stateLabel:"State / Province", phonePh:"+1 000 000 0000" };
}

// Format phone number as user types based on country code
function formatPhone(v, code) {
  if (code === "US" || code === "CA" || code === "JM") {
    const digits = v.replace(/\D/g,"").slice(0,10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return "(" + digits;
    if (digits.length <= 6) return "(" + digits.slice(0,3) + ") " + digits.slice(3);
    return "(" + digits.slice(0,3) + ") " + digits.slice(3,6) + "-" + digits.slice(6);
  }
  // International: keep + and digits/spaces/hyphens, max 20 chars
  return v.replace(/[^\d\s\-+()]/g,"").slice(0,20);
}

// Format ZIP / postal code as user types based on country code
function formatZip(v, code) {
  if (code === "US") {
    const d = v.replace(/\D/g,"").slice(0,9);
    return d.length > 5 ? d.slice(0,5) + "-" + d.slice(5) : d;
  }
  if (code === "CA") {
    const c = v.replace(/[^A-Za-z0-9]/g,"").toUpperCase().slice(0,6);
    return c.length > 3 ? c.slice(0,3) + " " + c.slice(3) : c;
  }
  if (code === "GB") return v.toUpperCase().replace(/[^A-Z0-9\s]/g,"").slice(0,8);
  return v.slice(0,12);
}

const SELECT_STYLE = {
  width:"100%",
  appearance:"none",
  WebkitAppearance:"none",
  MozAppearance:"none",
  backgroundColor:"#FFFDF9",
  border:"1px solid #E5E6EB",
  borderRadius:"8px",
  padding:"10px 40px 10px 14px",
  fontSize:"16px",
  color:"#040617",
  cursor:"pointer",
  outline:"none",
  boxShadow:"0px 1px 2px rgba(10,13,18,0.05)",
  fontFamily:"'Inter',sans-serif",
  lineHeight:"24px",
};

const STEPS = [
  { num:1, title:"Donate Amount",  sub:"Choose your donation target and amount." },
  { num:2, title:"Personal Info",  sub:"Fill required fields about you to continue." },
  { num:3, title:"Donate Method",  sub:"Choose best option for you to send donation." },
];

function StepIndicator({ currentStep, mobile }) {
  const display = Math.min(currentStep, 3);
  if (mobile) return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px",width:"100%"}}>
      {STEPS.map((s,i) => (
        <div key={s.num}>
          <div style={{display:"flex",gap:"16px",alignItems:"flex-start",opacity:s.num===display?1:0.5}}>
            <div style={{width:"60px",height:"60px",borderRadius:"12px",backgroundColor:s.num===display?"#FFD900":"transparent",border:s.num===display?"none":"1px solid #E5E6EB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{...inter,fontSize:"32px",fontWeight:600,color:"#040617"}}>{s.num}</span>
            </div>
            <div>
              <p style={{...inter,fontSize:"32px",fontWeight:600,color:"#040617",letterSpacing:"-0.32px",lineHeight:"46px",margin:0}}>{s.title}</p>
              <p style={{...inter,fontSize:"20px",color:"#6F7181",letterSpacing:"0.2px",lineHeight:"30px",margin:0}}>{s.sub}</p>
            </div>
          </div>
          {i < STEPS.length-1 && (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"24px",marginTop:"4px"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/></svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  return (
    <div style={{display:"flex",alignItems:"center",gap:"32px",maxWidth:"1320px",margin:"0 auto 36px"}}>
      {STEPS.map((s,i) => (
        <div key={s.num} style={{display:"flex",flex:1,alignItems:"center",gap:"16px",opacity:s.num===display?1:0.5}}>
          <div style={{width:"60px",height:"60px",borderRadius:"12px",backgroundColor:s.num===display?"#FFD900":"transparent",border:s.num===display?"none":"1px solid #E5E6EB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{...inter,fontSize:"32px",fontWeight:600,color:"#040617"}}>{s.num}</span>
          </div>
          <div style={{flex:1}}>
            <p style={{...inter,fontSize:"32px",fontWeight:600,color:"#040617",letterSpacing:"-0.32px",lineHeight:"46px",margin:0}}>{s.title}</p>
            <p style={{...inter,fontSize:"20px",color:"#6F7181",letterSpacing:"0.2px",lineHeight:"30px",margin:0}}>{s.sub}</p>
          </div>
          {i < STEPS.length-1 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/></svg>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ projects, currentProject, onPrev, onNext, mobile }) {
  if (!projects || projects.length === 0) return (
    <div style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"20px",padding:"24px",textAlign:"center"}}>
      <p style={{...inter,fontSize:"20px",color:"#6F7181"}}>No active projects available</p>
    </div>
  );
  const p = projects[currentProject];
  const pct = p.targetAmount > 0 ? Math.round((p.amountDonated / p.targetAmount) * 100) : 0;
  const tot = mobile ? TOTAL_MOBILE : TOTAL_DESKTOP;
  const fil = Math.round((pct / 100) * tot);

  if (mobile) return (
    <div style={{display:"flex",flexDirection:"column",gap:"20px",width:"100%",position:"relative",overflow:"hidden"}}>
      <img src={imgSparkle} alt="" style={{position:"absolute",left:"-96px",top:"62px",width:"523px",pointerEvents:"none",opacity:0.25,zIndex:0}}/>
      <div style={{width:"100%",aspectRatio:"16/9",borderRadius:"12px",overflow:"hidden",position:"relative",zIndex:1}}>
        <img src={p.photo} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6) 42%,transparent 100%)"}}/>
        <div style={{position:"absolute",top:"12px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"8px",whiteSpace:"nowrap"}}>
          <img src={imgLocation} alt="" style={{width:"24px",height:"24px"}}/>
          <span style={{...inter,fontSize:"16px",color:"white"}}>{p.location}</span>
        </div>
      </div>
      <div style={{position:"relative",zIndex:1}}>
        <p style={{...inter,fontSize:"32px",fontWeight:600,color:"#040617",letterSpacing:"-0.32px",lineHeight:"46px",margin:0,textTransform:"capitalize"}}>{p.title}</p>
        <a href={"/projectdetail?slug=" + p.slug} style={{...inter,fontSize:"24px",color:"#6F7181",textDecoration:"underline"}}>Learn more</a>
      </div>
      <div style={{position:"relative",zIndex:1}}>
        <p style={{...inter,fontSize:"32px",color:"#5EDA71",textAlign:"center",margin:"0 0 4px"}}>{pct}%</p>
        <div style={{display:"flex",gap:"3px"}}>
          {Array.from({length:TOTAL_MOBILE}).map((_,i) => (
            <div key={i} style={{flex:1,height:"20px",borderRadius:"20px",backgroundColor:i<fil?"#5EDA71":"#6F7181",opacity:i<fil?1:0.2}}/>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:"4px"}}>
          <span style={{...inter,fontSize:"24px",color:"#6F7181",opacity:0.6}}>$0</span>
          <span style={{...inter,fontSize:"24px",color:"#5EDA71"}}>{p.raised}</span>
          <span style={{...inter,fontSize:"24px",color:"#6F7181",opacity:0.6}}>{p.goal}</span>
        </div>
      </div>
      {projects.length > 1 && (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"32px",position:"relative",zIndex:1}}>
          <button onClick={onPrev} style={{width:"44px",height:"44px",border:"2px solid #040617",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",background:"none",cursor:"pointer",opacity:0.6}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{display:"flex",flex:1,gap:"8px"}}>
            {projects.map((_,i) => <div key={i} style={{flex:1,height:"12px",borderRadius:"90px",backgroundColor:i===currentProject?"#FFD900":"#6F7181",opacity:i===currentProject?1:0.2}}/>)}
          </div>
          <button onClick={onNext} style={{width:"44px",height:"44px",backgroundColor:"#040617",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",border:"none",cursor:"pointer"}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"20px",padding:"16px",display:"flex",flexDirection:"column",gap:"32px",position:"relative",overflow:"hidden"}}>
      <img src={imgSparkle} alt="" style={{position:"absolute",top:"132px",left:"50%",transform:"translateX(-50%)",width:"523px",pointerEvents:"none",opacity:0.3}}/>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",position:"relative",zIndex:1}}>
        <div>
          <p style={{...inter,fontSize:"32px",fontWeight:600,color:"#040617",letterSpacing:"-0.32px",lineHeight:"46px",margin:0,textTransform:"capitalize"}}>{p.title}</p>
          <a href={"/projectdetail?slug=" + p.slug} style={{...inter,fontSize:"24px",color:"#6F7181",letterSpacing:"0.24px",lineHeight:"38px",textDecoration:"underline"}}>Learn more</a>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <img src={imgLocation} alt="" style={{width:"24px",height:"24px"}}/>
          <span style={{...inter,fontSize:"16px",color:"#6F7181"}}>{p.location}</span>
        </div>
      </div>
      <div style={{borderRadius:"12px",overflow:"hidden",aspectRatio:"16/9",position:"relative",zIndex:1}}>
        <img src={p.photo} alt={p.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"8px",position:"relative",zIndex:1}}>
        <p style={{...inter,fontSize:"32px",fontWeight:400,color:"#5EDA71",textAlign:"center",letterSpacing:"-0.32px",margin:0}}>{pct}%</p>
        <div style={{display:"flex",gap:"4px"}}>
          {Array.from({length:TOTAL_DESKTOP}).map((_,i) => (
            <div key={i} style={{flex:1,height:"20px",borderRadius:"20px",backgroundColor:i<fil?"#5EDA71":"#d9d9d9",opacity:i<fil?1:0.4}}/>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <span style={{...inter,fontSize:"24px",color:"#6F7181",opacity:0.8}}>$0</span>
          <span style={{...inter,fontSize:"24px",color:"#5EDA71"}}>{p.raised}</span>
          <span style={{...inter,fontSize:"24px",color:"#6F7181",opacity:0.8}}>{p.goal}</span>
        </div>
      </div>
      {projects.length > 1 && (
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"16px",opacity:0.6}}>
            <span style={{...inter,fontSize:"20px",color:"#040617"}}>Last Project</span>
            <button onClick={onPrev} style={{width:"44px",height:"44px",border:"2px solid #040617",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",background:"none",cursor:"pointer"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            {projects.map((_,i) => <div key={i} style={{width:"52px",height:"12px",borderRadius:"90px",backgroundColor:i===currentProject?"#FFD900":"#d9d9d9",opacity:i===currentProject?1:0.4}}/>)}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
            <button onClick={onNext} style={{width:"44px",height:"44px",backgroundColor:"#040617",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",border:"none",cursor:"pointer"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span style={{...inter,fontSize:"20px",color:"#040617"}}>Next Project</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AmountStep({ tab, setTab, selected, setSelected, custom, setCustom, error, onNext, mobile }) {
  const amounts = tab === "monthly" ? AMOUNTS_MONTHLY : AMOUNTS_ONCE;
  if (mobile) return (
    <div style={{width:"100%",backgroundColor:"#FFFDF9",borderRadius:"16px",overflow:"hidden",border:"1px solid #E5E6EB",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",borderBottom:"1px solid #E5E6EB"}}>
        <button onClick={() => { setTab("once"); setSelected("$50"); }}
          style={{flex:1,padding:"10px",...inter,fontSize:"24px",lineHeight:"38px",color:"#040617",background:"none",border:"none",borderBottom:tab==="once"?"2px solid #FFD900":"2px solid transparent",cursor:"pointer",opacity:tab==="once"?1:0.8}}>
          Once
        </button>
        <button onClick={() => { setTab("monthly"); setSelected("$50/Month"); }}
          style={{flex:1,padding:"10px",...inter,fontSize:"24px",lineHeight:"38px",color:"#040617",background:"none",border:"none",borderBottom:tab==="monthly"?"2px solid #FFD900":"2px solid transparent",cursor:"pointer",opacity:tab==="monthly"?1:0.8}}>
          Monthly
        </button>
      </div>
      <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          {amounts.map(a => (
            <button key={a} onClick={() => setSelected(a)}
              style={{cursor:"pointer",border:"1px solid " + (selected===a?"#FFD900":"#E5E6EB"),background:selected===a?"#FFD900":"#FFFDF9",borderRadius:"12px",padding:"10px 32px",...inter,fontSize:"20px",lineHeight:"30px",color:"#040617",textAlign:"center",transition:"all 0.2s"}}>
              {a}
            </button>
          ))}
        </div>
        <button onClick={() => setSelected("custom")}
          style={{cursor:"pointer",border:"1px solid " + (selected==="custom"?"#FFD900":"#E5E6EB"),background:selected==="custom"?"#FFD900":"#FFFDF9",borderRadius:"12px",padding:"10px 32px",...inter,fontSize:"20px",color:"#040617",textAlign:"center"}}>
          Custom
        </button>
        {selected === "custom" && (
          <div>
            <div className="field-wrapper-select" style={{position:"relative"}}>
              <span style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",...inter,fontSize:"18px",color:"#040617",pointerEvents:"none",zIndex:1}}>$</span>
              <input type="text" placeholder="0.00" value={custom} onChange={e => setCustom(e.target.value.replace(/[^0-9.]/g,""))}
                style={{...inter,width:"100%",border:"1px solid " + (error?"#EF4444":"#FFD900"),borderRadius:"12px",padding:"12px 16px 12px 28px",fontSize:"18px",color:"#040617",outline:"none",boxSizing:"border-box"}}/>
            </div>
            {error && <p style={{...inter,fontSize:"14px",color:"#EF4444",margin:"4px 0 0"}}>{error}</p>}
          </div>
        )}
        <p style={{...inter,fontSize:"16px",color:"#6F7181",textAlign:"center",margin:0}}>*All donations over $2 are tax deductible</p>
        <button onClick={onNext} style={{...inter,display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",backgroundColor:"#FFD900",color:"#040617",fontSize:"16px",fontWeight:600,padding:"16px 24px",borderRadius:"18px",border:"none",cursor:"pointer",width:"100%"}}>
          Continue to Personal Info
          <ArrowIcon size={20} color="#040617" />
        </button>
      </div>
      <div style={{backgroundColor:"#E8E9EB",padding:"24px"}}>
        <p style={{...inter,fontSize:"20px",color:"#636473",lineHeight:"30px",margin:0,textAlign:"center"}}>
          Your <strong style={{color:"#040617"}}>{selected==="custom"?(custom||"$50"):selected}</strong> donation helps equip students with school supplies and a safe learning environment.
        </p>
      </div>
    </div>
  );
  return (
    <div style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"20px",overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>
      <img src={imgSparkle} alt="" style={{position:"absolute",top:"105px",left:"138px",width:"523px",pointerEvents:"none",opacity:0.2,zIndex:0}}/>
      <div style={{display:"flex",borderBottom:"1px solid #E5E6EB",position:"relative",zIndex:1}}>
        <button className={tab==="once"?"tab-btn active":"tab-btn"} onClick={() => { setTab("once"); setSelected("$50"); }}>Donate Once</button>
        <button className={tab==="monthly"?"tab-btn active":"tab-btn"} onClick={() => { setTab("monthly"); setSelected("$50/Month"); }}>Donate Monthly</button>
      </div>
      <div style={{padding:"24px",display:"flex",flexDirection:"column",flex:1,gap:"24px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
            {amounts.map(a => (
              <button key={a} className={selected===a?"amt-btn active":"amt-btn"} onClick={() => setSelected(a)}>{a}</button>
            ))}
          </div>
          <div>
            <div className="field-wrapper-select" style={{position:"relative"}}>
              <span style={{position:"absolute",left:"18px",top:"50%",transform:"translateY(-50%)",...inter,fontSize:"24px",color:custom?"#040617":"#9CA3AF",pointerEvents:"none",zIndex:1,lineHeight:"38px"}}>$</span>
              <input type="text" placeholder="0.00" value={custom}
                onChange={e => { setCustom(e.target.value.replace(/[^0-9.]/g,"")); setSelected("custom"); }}
                style={{...inter,width:"100%",border:"1px solid " + (error?"#EF4444":selected==="custom"?"#FFD900":"#E5E6EB"),borderRadius:"20px",padding:"10px 32px 10px 44px",fontSize:"24px",lineHeight:"38px",color:"#040617",backgroundColor:"#FFFDF9",outline:"none",textAlign:"left",boxSizing:"border-box"}}/>
            </div>
            {error && <p style={{...inter,fontSize:"14px",color:"#EF4444",textAlign:"center",margin:"4px 0 0"}}>{error}</p>}
          </div>
          <p style={{...inter,fontSize:"16px",color:"#6F7181",textAlign:"center",margin:0}}>*All donations over $2 are tax deductible</p>
        </div>
        <button onClick={onNext} style={{...inter,display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",backgroundColor:"#FFD900",color:"#040617",fontSize:"16px",fontWeight:600,padding:"16px 24px",borderRadius:"18px",border:"none",cursor:"pointer",width:"100%"}}>
          Continue to Personal Info
          <ArrowIcon size={20} color="#040617" />
        </button>
      </div>
      <div style={{backgroundColor:"#E8E9EB",padding:"24px",position:"relative",zIndex:1}}>
        <p style={{...inter,fontSize:"20px",color:"#636473",lineHeight:"30px",margin:0}}>
          Your <strong style={{color:"#040617"}}>{selected==="custom"?(custom||"$50"):selected}</strong> donation helps equip students with school supplies, access to technology, and a safe learning environment.
        </p>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange, error }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
      <label style={{...inter,fontSize:"16px",color:"#414651",letterSpacing:"0.16px",lineHeight:"24px"}}>{label}</label>
      <div className="field-wrapper" style={{backgroundColor:"#FFFDF9",border:"1px solid " + (error?"#EF4444":"#E5E6EB"),borderRadius:"8px",padding:"10px 14px",boxShadow:"0px 1px 2px rgba(10,13,18,0.05)",transition:"background-color 0.2s,border-color 0.2s"}}>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder || "Start Typing..."}
          style={{...inter,width:"100%",border:"none",outline:"none",backgroundColor:"transparent",fontSize:"16px",color:"#040617"}}/>
      </div>
      {error && <span style={{...inter,fontSize:"14px",color:"#EF4444"}}>{error}</span>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder, error }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
      {label && <label style={{...inter,fontSize:"16px",color:"#414651",letterSpacing:"0.16px",lineHeight:"24px"}}>{label}</label>}
      <div className="field-wrapper-select" style={{position:"relative"}}>
        <select value={value} onChange={onChange} style={{...SELECT_STYLE, borderColor:error?"#EF4444":"#E5E6EB", color:value?"#040617":"#9CA3AF", transition:"background-color 0.2s,border-color 0.2s"}}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o => <option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
        </select>
        <div style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {error && <span style={{...inter,fontSize:"14px",color:"#EF4444"}}>{error}</span>}
    </div>
  );
}

function PersonalInfoStep({ form, setForm, errors, onBack, onNext, mobile }) {
  const selectedCountry = COUNTRIES.find(c => c.name === form.country);
  const cfg = getCountryCfg(selectedCountry?.code || "JM");
  const hasStates = selectedCountry && selectedCountry.states.length > 0;

  const upd = f => e => setForm({...form, [f]:e.target.value});

  const handleCountryChange = e => {
    // Reset state and zip when country changes since formats differ
    setForm({...form, country:e.target.value, state:"", zip:""});
  };

  const handlePhone = e => {
    const code = selectedCountry?.code || "JM";
    setForm({...form, phone: formatPhone(e.target.value, code)});
  };

  const handleZip = e => {
    const code = selectedCountry?.code || "JM";
    setForm({...form, zip: formatZip(e.target.value, code)});
  };

  return (
    <div style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"20px",overflow:"hidden"}}>
      <div style={{borderBottom:"1px solid #E5E6EB",padding:"20px 24px",textAlign:"center"}}>
        <h3 style={{...inter,fontSize:mobile?"28px":"40px",fontWeight:500,color:"#040617",margin:0}}>Personal Info</h3>
      </div>
      <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"20px"}}>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:"20px"}}>
          <InputField label="First Name" value={form.firstName} onChange={upd("firstName")} error={errors.firstName}/>
          <InputField label="Last Name" value={form.lastName} onChange={upd("lastName")} error={errors.lastName}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:"20px"}}>
          <InputField label="Email Address" placeholder="your.email@example.com" value={form.email} onChange={upd("email")} error={errors.email}/>
          <InputField label="Phone Number" placeholder={cfg.phonePh} value={form.phone} onChange={handlePhone} error={errors.phone}/>
        </div>
        <InputField label="Address Line 1" value={form.address1} onChange={upd("address1")} error={errors.address1}/>
        <InputField label="Address Line 2 (Optional)" value={form.address2} onChange={upd("address2")}/>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:"20px"}}>
          <SelectField label="Country" value={form.country}
            onChange={handleCountryChange}
            options={COUNTRIES.map(c => ({value:c.name, label:c.name}))}
            placeholder="Select country..." error={errors.country}/>
          <InputField label="City" value={form.city} onChange={upd("city")} error={errors.city}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:"20px"}}>
          {/* ZIP — hidden for countries without postal codes (e.g. Jamaica) */}
          {cfg.zipLabel ? (
            <InputField
              label={cfg.zipLabel}
              placeholder={selectedCountry?.code === "US" ? "e.g. 90210" : selectedCountry?.code === "CA" ? "e.g. K1A 0A6" : ""}
              value={form.zip}
              onChange={handleZip}
              error={errors.zip}/>
          ) : (
            <div/> /* spacer so state field stays in right column */
          )}
          {hasStates ? (
            <SelectField
              label={cfg.stateLabel}
              value={form.state}
              onChange={upd("state")}
              options={selectedCountry.states.map(s => ({value:s, label:s}))}
              placeholder={"Select " + cfg.stateLabel + "..."}
              error={errors.state}/>
          ) : (
            <InputField label={cfg.stateLabel} value={form.state} onChange={upd("state")} error={errors.state}/>
          )}
        </div>
        <div style={{display:"flex",gap:"16px",flexDirection:mobile?"column":"row"}}>
          <button onClick={onBack} style={{...inter,background:"none",border:"1px solid #E5E6EB",color:"#040617",fontSize:"16px",fontWeight:600,padding:"16px 24px",borderRadius:"18px",cursor:"pointer",flex:1}}>Go Back</button>
          <button onClick={onNext} style={{...inter,background:"#FFD900",border:"none",color:"#040617",fontSize:"16px",fontWeight:600,padding:"16px 24px",borderRadius:"18px",cursor:"pointer",flex:1}}>Continue to Donate Method</button>
        </div>
      </div>
    </div>
  );
}

function DonateMethodStep({ cardNumber, setCardNumber, cardExpiry, setCardExpiry, cardCvv, setCardCvv, error, loading, isProcessing, paymentSuccess, paymentResult, donationLabel, projectTitle, contributionPct, receiptUrl, onBack, onSubmit, mobile }) {
  const [tab, setTab] = useState("card");
  const expiryRef = useRef(null);
  const cvvRef = useRef(null);
  const [highlighted, setHighlighted] = useState(null);
  const cardType = detectCardType(cardNumber);

  const handleCardNumber = e => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    if (formatted.replace(/\s/g,"").length >= 16) {
      setTimeout(() => {
        if (expiryRef.current) expiryRef.current.focus();
        setHighlighted("expiry");
        setTimeout(() => setHighlighted(null), 1400);
      }, 50);
    }
  };

  const handleExpiry = e => {
    const formatted = formatExpiry(e.target.value);
    setCardExpiry(formatted);
    if (formatted.length >= 5) {
      setTimeout(() => {
        if (cvvRef.current) cvvRef.current.focus();
        setHighlighted("cvv");
        setTimeout(() => setHighlighted(null), 1400);
      }, 50);
    }
  };

  const fieldBg = hl => highlighted === hl ? "#FFFBE6" : "#FFFDF9";
  const fieldBorder = hl => "1px solid " + (highlighted === hl ? "#FFD900" : "#E5E6EB");

  if (paymentSuccess && paymentResult) return (
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
      style={{backgroundColor:"#FFFDF9",border:"2px solid #5EDA71",borderRadius:"20px",padding:"40px 32px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
      <div style={{width:"80px",height:"80px",borderRadius:"50%",backgroundColor:"#5EDA71",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div>
        <h3 style={{...inter,fontSize:mobile?"28px":"36px",fontWeight:700,color:"#040617",letterSpacing:"-0.04em",margin:"0 0 8px"}}>Payment Successful!</h3>
        <p style={{...inter,fontSize:"18px",color:"#6F7181",margin:0}}>Thank you for your generous donation of <strong style={{color:"#040617"}}>{donationLabel}</strong> to {projectTitle}.</p>
      </div>
      <div style={{backgroundColor:"#F5F3EE",borderRadius:"16px",padding:"20px",textAlign:"left",width:"100%",maxWidth:"360px"}}>
        {paymentResult.authorizationCode && (
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
            <span style={{...inter,fontSize:"15px",color:"#6F7181"}}>Authorization Code</span>
            <span style={{...inter,fontSize:"15px",fontWeight:600,color:"#040617"}}>{paymentResult.authorizationCode}</span>
          </div>
        )}
        {paymentResult.orderId && (
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
            <span style={{...inter,fontSize:"15px",color:"#6F7181"}}>Order ID</span>
            <span style={{...inter,fontSize:"15px",fontWeight:600,color:"#040617"}}>{paymentResult.orderId}</span>
          </div>
        )}
        {paymentResult.cardBrand && (
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{...inter,fontSize:"15px",color:"#6F7181"}}>Card</span>
            <span style={{...inter,fontSize:"15px",fontWeight:600,color:"#040617"}}>{paymentResult.cardBrand}</span>
          </div>
        )}
      </div>
      <p style={{...inter,fontSize:"14px",color:"#6F7181",margin:0}}>A confirmation has been sent to your email address.</p>
      <a href="/" style={{...inter,display:"inline-flex",alignItems:"center",padding:"14px 32px",borderRadius:"14px",background:"#FFD900",color:"#040617",fontSize:"16px",fontWeight:600,textDecoration:"none"}}>Return to Home</a>
      {receiptUrl && (
        <button onClick={() => downloadReceiptPDF(receiptUrl)}
          style={{...inter,display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"14px",background:"#F5F3EE",color:"#040617",fontSize:"16px",fontWeight:600,border:"2px solid #E5E6EB",cursor:"pointer"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 15V3M12 15L8 11M12 15L16 11" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 17V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V17" stroke="#040617" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Download Receipt
        </button>
      )}
    </motion.div>
  );

  if (isProcessing) return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"20px",padding:"60px 32px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
      <div style={{width:"60px",height:"60px",border:"4px solid #FFD900",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <p style={{...inter,fontSize:"20px",color:"#040617",fontWeight:600}}>Processing your donation...</p>
      <p style={{...inter,fontSize:"16px",color:"#6F7181"}}>Please do not close this window.</p>
    </motion.div>
  );

  return (
    <div style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"20px",overflow:"hidden"}}>
      <div style={{display:"flex",borderBottom:"1px solid #E5E6EB"}}>
        {[["card","Card"],["paypal","PayPal"],["inperson","In Person"]].map(([m,label]) => (
          <button key={m} onClick={() => setTab(m)}
            style={{...inter,flex:1,padding:"16px 10px",background:"none",border:"none",borderBottom:tab===m?"2px solid #FFD900":"2px solid transparent",fontSize:mobile?"18px":"22px",color:"#040617",cursor:"pointer",opacity:tab===m?1:0.6,fontWeight:tab===m?600:400,transition:"all 0.2s"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"24px"}}>
        <button onClick={onBack} style={{...inter,alignSelf:"flex-start",background:"none",border:"none",color:"#040617",fontSize:"20px",cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:"8px"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Go Back
        </button>

        {tab === "card" && (
          <div style={{display:"flex",flexDirection:"column",gap:"24px"}}>
            <div>
              <label style={{...inter,fontSize:"16px",color:"#414651",letterSpacing:"0.16px",lineHeight:"24px",display:"block",marginBottom:"6px"}}>Credit Card Number</label>
              <div style={{backgroundColor:"#FFFDF9",border:"1px solid #E5E6EB",borderRadius:"8px",padding:"10px 14px",boxShadow:"0px 1px 2px rgba(10,13,18,0.05)",display:"flex",alignItems:"center",gap:"10px"}}>
                <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={handleCardNumber} maxLength={19}
                  style={{...inter,flex:1,border:"none",outline:"none",backgroundColor:"transparent",fontSize:"16px",color:"#040617",letterSpacing:"0.12em"}}/>
                {cardType && <div style={{flexShrink:0}}><CardTypeIcon type={cardType}/></div>}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:"20px"}}>
              <div>
                <label style={{...inter,fontSize:"16px",color:"#414651",letterSpacing:"0.16px",lineHeight:"24px",display:"block",marginBottom:"6px"}}>Date of Expire</label>
                <div style={{backgroundColor:fieldBg("expiry"),border:fieldBorder("expiry"),borderRadius:"8px",padding:"10px 14px",boxShadow:"0px 1px 2px rgba(10,13,18,0.05)",transition:"background-color 0.4s,border-color 0.4s"}}>
                  <input ref={expiryRef} type="text" placeholder="MM/YY" value={cardExpiry} onChange={handleExpiry} maxLength={5}
                    style={{...inter,width:"100%",border:"none",outline:"none",backgroundColor:"transparent",fontSize:"16px",color:"#040617"}}/>
                </div>
              </div>
              <div>
                <label style={{...inter,fontSize:"16px",color:"#414651",letterSpacing:"0.16px",lineHeight:"24px",display:"block",marginBottom:"6px"}}>CVC / CVV</label>
                <div style={{backgroundColor:fieldBg("cvv"),border:fieldBorder("cvv"),borderRadius:"8px",padding:"10px 14px",boxShadow:"0px 1px 2px rgba(10,13,18,0.05)",transition:"background-color 0.4s,border-color 0.4s"}}>
                  <input ref={cvvRef} type="text" placeholder="123" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))} maxLength={4}
                    style={{...inter,width:"100%",border:"none",outline:"none",backgroundColor:"transparent",fontSize:"16px",color:"#040617"}}/>
                </div>
              </div>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:"16px",margin:"4px 0"}}>
              <div style={{height:"1px",background:"#E5E6EB",flex:1}}/>
              <span style={{...inter,color:"#6F7181",fontSize:"18px"}}>or</span>
              <div style={{height:"1px",background:"#E5E6EB",flex:1}}/>
            </div>

            <div>
              <h4 style={{...inter,fontSize:mobile?"26px":"30px",fontWeight:600,color:"#040617",margin:"0 0 10px"}}>Bank Deposit</h4>
              <p style={{...inter,fontSize:"18px",color:"#040617",margin:"0 0 16px"}}>Buxton Restoration Banking Details</p>
              {[
                ["Recipient / Beneficiary Name","Mico Heritage Enterprise, BNS New Kingston"],
                ["Account Number","10006017"],
                ["SWIFT/BIC Code","NOSCJMKN"],
                ["Bank Transit Number","50575"],
              ].map(([k,v]) => (
                <p key={k} style={{...inter,fontSize:"18px",color:"#040617",margin:"0 0 10px"}}><strong>{k}:</strong> {v}</p>
              ))}
            </div>

            {error && <p style={{...inter,fontSize:"16px",color:"#EF4444",textAlign:"center",margin:0}}>{error}</p>}

            <div style={{display:"flex",flexDirection:mobile?"column":"row",justifyContent:"space-between",alignItems:mobile?"stretch":"flex-end",gap:"20px",marginTop:"10px"}}>
              <div>
                <p style={{...inter,fontSize:"18px",color:"#6F7181",margin:"0 0 4px"}}>Your Donation to {projectTitle}:</p>
                <p style={{...inter,fontSize:mobile?"28px":"32px",color:"#040617",margin:0,display:"flex",alignItems:"baseline",gap:"10px",flexWrap:"wrap"}}>
                  {donationLabel}
                  {contributionPct > 0 && (
                    <span style={{...inter,color:"#2F8A45",fontSize:"16px",fontWeight:500}}>
                      +{contributionPct}% to project target
                    </span>
                  )}
                </p>
              </div>
              <button onClick={onSubmit} disabled={loading}
                style={{...inter,background:loading?"#E5E6EB":"#FFF0A8",border:"none",color:"#040617",fontSize:"16px",fontWeight:600,padding:"16px 24px",borderRadius:"18px",cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",minWidth:"160px",opacity:loading?0.7:1}}>
                {loading ? "Processing..." : "Donate Now"}
              </button>
            </div>
          </div>
        )}

        {tab === "paypal" && (
          <div style={{textAlign:"center",padding:"20px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
            <div style={{width:"72px",height:"72px",borderRadius:"50%",backgroundColor:"#EEF4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",fontWeight:700,color:"#003087",fontFamily:"Arial,sans-serif"}}>P</div>
            <div>
              <h4 style={{...inter,fontSize:mobile?"22px":"26px",fontWeight:600,color:"#040617",margin:"0 0 8px"}}>Donate via PayPal</h4>
              <p style={{...inter,fontSize:"16px",color:"#6F7181",margin:"0 0 24px",maxWidth:"360px"}}>
                Complete your donation of <strong style={{color:"#040617"}}>{donationLabel}</strong> to {projectTitle} securely via PayPal.
              </p>
            </div>
            <a href="https://www.paypal.com/donate" target="_blank" rel="noopener noreferrer"
              style={{...inter,background:"#003087",color:"white",fontSize:"16px",fontWeight:600,padding:"16px 32px",borderRadius:"18px",textDecoration:"none"}}>
              Continue with PayPal
            </a>
            <p style={{...inter,fontSize:"13px",color:"#9CA3AF",margin:0}}>You will be redirected to PayPal to complete your donation securely.</p>
          </div>
        )}

        {tab === "inperson" && (
          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            <div style={{backgroundColor:"#F5F3EE",borderRadius:"16px",padding:"24px"}}>
              <h4 style={{...inter,fontSize:mobile?"22px":"26px",fontWeight:600,color:"#040617",margin:"0 0 12px"}}>In Person Donation</h4>
              <p style={{...inter,fontSize:"16px",color:"#636473",lineHeight:"1.6",margin:"0 0 20px"}}>
                Contact our team to arrange an in-person donation handoff for <strong style={{color:"#040617"}}>{projectTitle}</strong>.
              </p>
              {[
                ["Location","The Mico University College, Kingston, Jamaica"],
                ["Office Hours","Monday - Friday, 8:00 AM - 4:00 PM"],
                ["Email","info@themicofoundationja.org"],
              ].map(([k,v]) => (
                <div key={k} style={{display:"flex",gap:"12px",alignItems:"flex-start",marginBottom:"10px"}}>
                  <span style={{...inter,fontSize:"14px",color:"#6F7181",minWidth:"100px",flexShrink:0}}>{k}</span>
                  <span style={{...inter,fontSize:"15px",color:"#040617",fontWeight:500}}>{v}</span>
                </div>
              ))}
            </div>
            <a href="/contact" style={{...inter,background:"#FFD900",border:"none",color:"#040617",fontSize:"16px",fontWeight:600,padding:"16px 24px",borderRadius:"18px",cursor:"pointer",textDecoration:"none",textAlign:"center"}}>
              Contact Our Team
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

function AuthStep({ redirectData, onCancel }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const isSlowLoad = elapsed >= 8;  // blank for 8+ seconds = likely frictionless
  const isTimedOut = elapsed >= 120; // 2 min hard timeout

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(4,6,23,0.75)",backdropFilter:"blur(4px)"}}>
      <div style={{width:"min(520px, 95vw)",backgroundColor:"white",borderRadius:"20px",overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.35)"}}>
        {/* Header */}
        <div style={{background:"#040617",padding:"16px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255,217,0,0.15)",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FFD900" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p style={{...inter,fontSize:"15px",fontWeight:700,color:"white",margin:0}}>The Mico Foundation</p>
            <p style={{...inter,fontSize:"12px",color:"#9CA3AF",margin:0}}>Secure 3DS Authentication</p>
          </div>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px",background:"rgba(255,217,0,0.1)",borderRadius:"20px",padding:"4px 10px"}}>
              <div style={{width:"7px",height:"7px",borderRadius:"50%",backgroundColor:"#FFD900",animation:"pulse 1.4s infinite"}}/>
              <span style={{...inter,fontSize:"11px",color:"#FFD900"}}>
                {isSlowLoad ? "Authenticating..." : "Waiting..."}
              </span>
            </div>
            {onCancel && (
              <button onClick={onCancel} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#9CA3AF",cursor:"pointer",borderRadius:"6px",padding:"4px 10px",...inter,fontSize:"12px",flexShrink:0}}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Timeout state — show message instead of blank iframe */}
        {isTimedOut ? (
          <div style={{padding:"48px 32px",textAlign:"center"}}>
            <p style={{...inter,fontSize:"17px",color:"#040617",fontWeight:600,margin:"0 0 8px"}}>Authentication timed out</p>
            <p style={{...inter,fontSize:"14px",color:"#6F7181",margin:"0 0 24px"}}>The bank&apos;s 3DS server did not respond. Please try again.</p>
            {onCancel && (
              <button onClick={onCancel} style={{...inter,padding:"12px 28px",borderRadius:"12px",background:"#FFD900",color:"#040617",fontSize:"15px",fontWeight:600,border:"none",cursor:"pointer"}}>
                Try Again
              </button>
            )}
          </div>
        ) : (
          /* srcDoc avoids cross-origin contentDocument access on subsequent navigations */
          <iframe
            srcDoc={redirectData}
            frameBorder="0"
            width="100%"
            height={isSlowLoad ? "0" : "640"}
            style={{display:"block",minHeight: isSlowLoad ? "0" : "640"}}
            title="3D Secure Authentication"
          />
        )}

        {/* Frictionless message — shown when iframe collapses to 0 height */}
        {isSlowLoad && !isTimedOut && (
          <div style={{padding:"48px 32px",textAlign:"center"}}>
            <div style={{width:"44px",height:"44px",border:"3px solid #FFD900",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 16px"}}/>
            <p style={{...inter,fontSize:"16px",color:"#040617",fontWeight:600,margin:"0 0 6px"}}>Authenticating with your bank...</p>
            <p style={{...inter,fontSize:"13px",color:"#6F7181",margin:0}}>This usually takes a few seconds.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DonationForm() {
  const [projectsData,   setProjectsData]    = useState(null);
  const [loadingProj,    setLoadingProj]      = useState(true);
  const [currentProject, setCurrentProject]  = useState(0);
  const [tab,            setTab]             = useState("monthly");
  const [selected,       setSelected]        = useState("$50/Month");
  const [custom,         setCustom]          = useState("");
  const [form,           setForm]            = useState({ firstName:"", lastName:"", email:"", phone:"", address1:"", address2:"", country:"Jamaica", city:"", zip:"", state:"" });
  const [errors,         setErrors]          = useState({});
  const [cardNumber,     setCardNumber]      = useState("");
  const [cardExpiry,     setCardExpiry]      = useState("");
  const [cardCvv,        setCardCvv]         = useState("");
  const [step,           setStep]            = useState(1);
  const [loading,        setLoading]         = useState(false);
  const [isProcessing,   setIsProcessing]    = useState(false);
  const [paymentSuccess, setPaymentSuccess]  = useState(false);
  const [paymentResult,  setPaymentResult]   = useState(null);
  const [payError,       setPayError]        = useState("");
  const [redirectData,    setRedirectData]    = useState(null);
  const [donationMeta,    setDonationMeta]    = useState(null);
  const [receiptUrl,      setReceiptUrl]      = useState(null);
  const [pendingSpiToken, setPendingSpiToken] = useState(null); // pre-3DS token for frictionless fallback
  const processingRef = useRef(false); // Guard against duplicate 3DS postMessages

  useEffect(() => {
    async function load() {
      try {
        const projects = await client.fetch(queries.projects);
        const active = projects.filter(p => p.status === "active").map(p => ({
          id:p._id, slug:p.slug, title:p.title, location:p.location,
          photo:urlFor(p.image).width(1200).url(),
          targetAmount:p.targetAmount, amountDonated:p.amountDonated,
          goal:formatCurrency(p.targetAmount), raised:formatCurrency(p.amountDonated),
        }));
        setProjectsData(active);
      } catch(e) { console.error(e); }
      finally { setLoadingProj(false); }
    }
    load();
  }, []);

  // Shared handler for both postMessage and localStorage-poll events
  const handle3dsResult = useRef(null);
  handle3dsResult.current = async (payload) => {
    let data = payload;
    if (typeof data === "string") { try { data = JSON.parse(data); } catch { return; } }
    if (!data || typeof data !== "object") return;

    if (data.status === "3ds_complete" && data.spiToken) {
      if (processingRef.current) return;
      processingRef.current = true;
      setPayError("");
      setRedirectData(null);
      setStep(3);
      setIsProcessing(true);
      const meta = donationMeta || {};
      try {
        const cr = await fetch("/api/complete", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ spiToken:data.spiToken, donationMeta:meta }) });
        const cd = await cr.json();
        setIsProcessing(false);
        if (cd.success && cd.approved) {
          setPaymentResult(cd);
          setPaymentSuccess(true);
          setReceiptUrl(buildClientReceiptUrl(cd, meta));
        } else {
          processingRef.current = false;
          setPayError(cd.error || "Payment was declined");
        }
      } catch {
        processingRef.current = false;
        setIsProcessing(false);
        setPayError("Failed to complete payment");
      }
    } else if (data.status === "declined" || data.status === "error") {
      if (processingRef.current) return;
      setPayError(data.message || "Authentication failed");
      setRedirectData(null);
      setStep(3);
    }
  };

  // postMessage listener (primary channel)
  useEffect(() => {
    const handler = e => handle3dsResult.current(e.data);
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // localStorage poller — backup when callback iframe DOES navigate (challenge flow)
  useEffect(() => {
    if (!redirectData) return;
    try { localStorage.removeItem("mf_3ds_result"); } catch {}
    const timer = setInterval(() => {
      try {
        const stored = localStorage.getItem("mf_3ds_result");
        if (!stored) return;
        localStorage.removeItem("mf_3ds_result");
        clearInterval(timer);
        handle3dsResult.current(stored);
      } catch {}
    }, 500);
    return () => clearInterval(timer);
  }, [redirectData]);

  // Frictionless 3DS fallback: after 8s of blank iframe, attempt payment with
  // the pre-3DS SpiToken. For frictionless cards PowerTranz marks the token
  // auth-complete server-side, so /api/spi/payment will succeed immediately.
  // For challenge cards this attempt returns an error — we silently ignore it
  // and let the challenge iframe flow complete normally.
  useEffect(() => {
    if (!redirectData || !pendingSpiToken) return;
    const timer = setTimeout(async () => {
      if (processingRef.current) return; // postMessage/localStorage already succeeded
      console.log('[3DS] Frictionless fallback: attempting completion with pre-3DS token');
      const meta = donationMeta || {};
      try {
        const cr = await fetch("/api/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spiToken: pendingSpiToken, donationMeta: meta }),
        });
        const cd = await cr.json();
        if (cd.success && cd.approved) {
          if (processingRef.current) return; // race: postMessage won
          processingRef.current = true;
          setPayError("");
          setRedirectData(null);
          setPendingSpiToken(null);
          setStep(3);
          setIsProcessing(false);
          setPaymentResult(cd);
          setPaymentSuccess(true);
          setReceiptUrl(buildClientReceiptUrl(cd, meta));
          console.log('[3DS] Frictionless auto-complete SUCCESS');
        } else {
          // Expected for challenge cards — they haven't authenticated yet
          console.log('[3DS] Frictionless attempt failed (likely challenge card):', cd.error || cd.isoResponseCode);
        }
      } catch (e) {
        console.log('[3DS] Frictionless attempt error:', e.message);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [redirectData, pendingSpiToken, donationMeta]);

  const prevProject = () => setCurrentProject(p => (p - 1 + (projectsData?.length||1)) % (projectsData?.length||1));
  const nextProject = () => setCurrentProject(p => (p + 1) % (projectsData?.length||1));

  const numericAmount = () => {
    if (selected === "custom") return parseFloat(custom) || 0;
    return parseFloat(selected.replace(/[^0-9.]/g,"")) || 0;
  };
  const donationLabel = selected === "custom" ? "$" + (custom||"0") : selected;

  const contributionPct = (() => {
    const target = projectsData?.[currentProject]?.targetAmount || 0;
    const amt = numericAmount();
    if (!target || !amt) return 0;
    const pct = (amt / target) * 100;
    return pct < 0.01 ? parseFloat(pct.toFixed(4)) : parseFloat(pct.toFixed(2));
  })();

  const handleStep1Next = () => {
    if (selected === "custom" && (!custom || parseFloat(custom) <= 0)) { setErrors({amount:"Please enter a valid amount"}); return; }
    setErrors({}); setStep(2);
  };

  const validateStep2 = () => {
    const e = {};
    const selCountry = COUNTRIES.find(c => c.name === form.country);
    const cfg = getCountryCfg(selCountry?.code || "JM");
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim())  e.lastName  = "Last name is required";
    if (!form.email.trim())     e.email     = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.phone.trim())    e.phone    = "Phone number is required";
    if (!form.address1.trim()) e.address1 = "Address is required";
    if (!form.country.trim())  e.country  = "Country is required";
    if (!form.city.trim())     e.city     = "City is required";
    if (cfg.zipRequired && !form.zip.trim()) e.zip = (cfg.zipLabel || "Postal code") + " is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePayment = async () => {
    if (!cardNumber || !cardExpiry || !cardCvv) { setPayError("Please fill in all card fields"); return; }
    processingRef.current = false; // Reset guard for fresh attempt
    setLoading(true); setPayError("");
    try {
      const parts = cardExpiry.split("/");
      const mm = parts[0]; const yy = parts[1];
      const res = await fetch("/api/donate", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          amount:        numericAmount(),
          currency:      "840",
          cardPan:       cardNumber.replace(/\s/g,""),
          cardCvv,
          cardExpiration: yy + mm,
          cardholderName: (form.firstName + " " + form.lastName).trim(),
          firstName:     form.firstName,
          lastName:      form.lastName,
          email:         form.email,
          phone:         form.phone,
          address:       form.address1,
          city:          form.city,
          state:         form.state,
          postalCode:    form.zip,
          countryCode:   getCountryNumericCode(form.country),
          country:       form.country,
          donationType:  tab,
          message:       "",
          projectId:     projectsData?.[currentProject]?.id,
          projectTitle:  projectsData?.[currentProject]?.title,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Donate API full response:', data);
        const code = data.isoResponseCode ? ` [${data.isoResponseCode}]` : '';
        setPayError((data.error || "Payment failed. Please try again.") + code);
        return;
      }
      const meta = data.donationMeta || {};
      setDonationMeta(meta);
      try { sessionStorage.setItem("donationMeta", JSON.stringify(meta)); } catch(_) {}
      if (data.requiresRedirect && data.redirectData) {
        setPendingSpiToken(data.spiToken); // stored for frictionless fallback
        setRedirectData(data.redirectData);
        setStep(4);
        return;
      }
      if (data.spiToken) {
        setIsProcessing(true);
        const cr = await fetch("/api/complete", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ spiToken:data.spiToken, donationMeta:meta }) });
        const cd = await cr.json();
        setIsProcessing(false);
        if (cd.success && cd.approved) { setPaymentResult(cd); setPaymentSuccess(true); setReceiptUrl(buildClientReceiptUrl(cd, meta)); }
        else setPayError(cd.error || "Payment was declined");
        return;
      }
      setPayError(data.error || "Payment initiation failed");
    } catch(_) { setPayError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  if (loadingProj) return (
    <section style={{backgroundColor:"#FFFDF9",padding:"80px 0",minHeight:"600px",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <p style={{...inter,color:"#040617",fontSize:"24px"}}>Loading donation form...</p>
    </section>
  );

  const selectedProject = projectsData?.[currentProject];

  const renderStep = (mobile) => {
    if (step === 1) return <AmountStep tab={tab} setTab={setTab} selected={selected} setSelected={setSelected} custom={custom} setCustom={setCustom} error={errors.amount} onNext={handleStep1Next} mobile={mobile}/>;
    if (step === 2) return <PersonalInfoStep form={form} setForm={setForm} errors={errors} onBack={() => { setStep(1); setErrors({}); }} onNext={() => { if (validateStep2()) setStep(3); }} mobile={mobile}/>;
    if (step === 3) return <DonateMethodStep cardNumber={cardNumber} setCardNumber={setCardNumber} cardExpiry={cardExpiry} setCardExpiry={setCardExpiry} cardCvv={cardCvv} setCardCvv={setCardCvv} error={payError} loading={loading} isProcessing={isProcessing} paymentSuccess={paymentSuccess} paymentResult={paymentResult} donationLabel={donationLabel} projectTitle={selectedProject?.title||"this project"} contributionPct={contributionPct} receiptUrl={receiptUrl} onBack={() => { setStep(2); setPayError(""); processingRef.current = false; }} onSubmit={handlePayment} mobile={mobile}/>;
    if (step === 4 && redirectData) return <AuthStep redirectData={redirectData} onCancel={() => { setRedirectData(null); setPendingSpiToken(null); setStep(3); setPayError(""); processingRef.current = false; }}/>;
    return null;
  };

  return (
    <section style={{backgroundColor:"#FFFDF9",position:"relative",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .don-desktop { display: block; padding: 80px 165px; }
        .don-mobile  { display: none; }
        .don-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 1590px; margin: 0 auto; }
        .amt-btn     { cursor:pointer; border:1px solid #E5E6EB; background:#FFFDF9; border-radius:20px; padding:10px 32px; font-family:'Inter',sans-serif; font-size:24px; line-height:38px; letter-spacing:0.24px; color:#040617; text-align:center; transition:all 0.2s; width:100%; }
        .amt-btn:hover { border-color:#FFD900; }
        .amt-btn.active { background:#FFD900; border-color:#FFD900; }
        .tab-btn     { flex:1; padding:16px 10px; background:none; border:none; font-family:'Inter',sans-serif; font-size:24px; line-height:38px; letter-spacing:0.24px; color:#040617; cursor:pointer; transition:all 0.2s; border-bottom:2px solid transparent; opacity:0.8; }
        .tab-btn.active { border-bottom:2px solid #FFD900; opacity:1; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.8)} }
        @keyframes spin  { to { transform: rotate(360deg); } }
        @media (max-width: 768px)  { .don-desktop { display: none !important; } .don-mobile { display: flex !important; } }
        @media (max-width: 1024px) { .don-grid { grid-template-columns: 1fr !important; } }
        .field-wrapper:focus-within { background-color: #FFFBE6 !important; border-color: #FFD900 !important; }
        .field-wrapper-select:focus-within select { background-color: #FFFBE6 !important; border-color: #FFD900 !important; }
      `}</style>

      <div className="don-desktop">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}
          style={{textAlign:"center",margin:"0 0 42px"}}>
          <p style={{...inter,fontSize:"15px",fontWeight:600,color:"#FFD900",backgroundColor:"#040617",display:"inline-block",padding:"4px 18px",borderRadius:"100px",margin:"0 0 18px",letterSpacing:"0.05em"}}>
            Make an Impact
          </p>
          <h2 style={{...inter,fontSize:"75px",fontWeight:800,color:"#040617",letterSpacing:"-1.5px",lineHeight:"90%",margin:"0 0 20px"}}>
            Your Gift Changes Lives
          </h2>
          <p style={{...inter,fontSize:"20px",color:"#6F7181",lineHeight:"1.7",maxWidth:"640px",margin:"0 auto"}}>
            Every donation directly supports scholarships, heritage restoration, and community programs across Jamaica and the Caribbean. Choose your amount, tell us about yourself, and complete your gift in minutes.
          </p>
        </motion.div>
        <StepIndicator currentStep={step}/>
        <div className="don-grid">
          <ProjectCard projects={projectsData} currentProject={currentProject} onPrev={prevProject} onNext={nextProject}/>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>
              {renderStep(false)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="don-mobile" style={{flexDirection:"column",gap:"24px",padding:"48px 24px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",width:"100%"}}>
          <p style={{...inter,fontSize:"13px",fontWeight:600,color:"#FFD900",backgroundColor:"#040617",display:"inline-block",padding:"4px 16px",borderRadius:"100px",margin:"0 0 14px",letterSpacing:"0.05em"}}>
            Make an Impact
          </p>
          <h2 style={{...inter,fontSize:"56px",fontWeight:800,color:"#040617",letterSpacing:"-1px",lineHeight:"90%",margin:"0 0 14px"}}>Your Gift Changes Lives</h2>
          <p style={{...inter,fontSize:"17px",color:"#6F7181",lineHeight:"1.65",margin:0}}>
            Support scholarships, heritage restoration, and community programs across Jamaica and the Caribbean.
          </p>
        </div>
        <StepIndicator currentStep={step} mobile={true}/>
        <ProjectCard projects={projectsData} currentProject={currentProject} onPrev={prevProject} onNext={nextProject} mobile={true}/>
        <AnimatePresence mode="wait">
          <motion.div key={"m"+step} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}} style={{width:"100%"}}>
            {renderStep(true)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}