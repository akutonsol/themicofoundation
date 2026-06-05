{receiptUrl && (
  <a href={receiptUrl} target="_blank" rel="noopener noreferrer"
    style={{...inter, display:"inline-flex", alignItems:"center", gap:"8px",
      padding:"14px 32px", borderRadius:"14px", background:"#F5F3EE",
      color:"#040617", fontSize:"16px", fontWeight:600,
      border:"2px solid #E5E6EB", textDecoration:"none"}}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 15V3M12 15L8 11M12 15L16 11" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V17" stroke="#040617" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    Download Receipt
  </a>
)}