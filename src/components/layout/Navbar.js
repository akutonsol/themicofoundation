'use client'

import { useState, useRef, useEffect } from 'react'

const imgLogo    = '/images/home/themicofoundation-logo.png'
const imgChevron = '/images/home-static/nav-corner-right-up.png'
const imgStar    = '/images/home-static/corner-2.svg'
const imgSparkle = '/images/home-static/nav-sparkle.png'

const inter = { fontFamily: "'Inter', sans-serif" }

const dropdownCols = [
  [
    { label: 'Team',     href: '/team' },
    { label: 'Trustees', href: '/trustees' },
  ],
  [
    { label: 'Messages', href: '/messages' },
    { label: 'About Us', href: '/about' },
  ],
  [
    { label: 'Resource Center', href: '/resourcecenter' },
    { label: 'Work With Us',    href: '/workwithus' },
  ],
  [
    { label: 'History',    href: '/history' },
    { label: 'Contact Us', href: '/contact' },
  ],
]

const navLinks = [
  { label: 'Home',         href: '/',           active: true },
  { label: 'About Us',     href: '/about',      dropdown: true },
  { label: 'Endowments',   href: '/endowments' },
  { label: 'Projects',     href: '/projects' },
  { label: 'News & Events',href: '/news' },
  { label: 'Pledge',       href: '/pledge' },
]

function DropdownItem({ label, href }) {
  return (
    <a href={href} className="dropdown-item"
      style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', cursor:'pointer' }}>
      <img src={imgStar} alt="" style={{ width:'26px', height:'26px', flexShrink:0 }} />
      <p style={{
        ...inter, fontSize:'25px', fontWeight:400, color:'#040617',
        letterSpacing:'-0.28px', lineHeight:'34px', margin:0, whiteSpace:'nowrap', transition:'color 0.2s',
      }}>
        {label}
      </p>
    </a>
  )
}

export default function Navbar() {
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [dropdownOpen,   setDropdownOpen]   = useState(false)
  const [mobileAboutOpen,setMobileAboutOpen]= useState(false)

  const dropdownRef = useRef(null)
  const timerRef    = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleMouseEnter = () => { clearTimeout(timerRef.current); setDropdownOpen(true) }
  const handleMouseLeave = () => { timerRef.current = setTimeout(() => setDropdownOpen(false), 150) }

  return (
    <>
      <style>{`
        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: #6F7181;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          line-height: normal;
          letter-spacing: -0.1px;
        }
        .nav-link:hover  { color: #040617; }
        .nav-link.active { font-weight: 700; color: #040617; }

        .donate-btn {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #040617;
          background-color: #FFF7CC;
          border-radius: 14px;
          height: 48px;
          padding: 0 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          flex-shrink: 0;
          letter-spacing: -0.1px;
        }
        .donate-btn:hover { background-color: #FFD900; }

        .dropdown-panel {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255,253,249,0.97);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(225,225,225,0.1);
          overflow: hidden;
          transition: opacity 0.2s, transform 0.2s;
          transform-origin: top;
        }
        .dropdown-panel.open   { opacity:1; transform:scaleY(1);    pointer-events:all;  }
        .dropdown-panel.closed { opacity:0; transform:scaleY(0.97); pointer-events:none; }
        .dropdown-item:hover p { color: #FFD900 !important; }

        .hamburger {
          background: none; border: none; cursor: pointer;
          padding: 8px; display: flex; flex-direction: column; gap: 5px;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: #040617; border-radius: 2px; transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg)  translate(5px, 5px);  }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        /* Logo — floats above and below the navbar bar */
        .logo-float-wrapper {
          position: relative;
          width: 140px;
          flex-shrink: 0;
          height: 105px;
          display: flex;
          align-items: flex-end;
        }
        .logo-float {
          position: absolute;
          bottom: -16px;
          left: 0;
          width: 140px;
          height: 148px;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 4px 20px rgba(0,0,0,0.15));
          z-index: 60;
          transition: transform 0.25s ease;
        }
        .logo-float:hover { transform: translateY(-4px); }

        @media (max-width: 1200px) {
          .desktop-nav, .desktop-donate { display: none !important; }
          .mobile-btn { display: flex !important; }
          .navbar-inner { padding: 0 24px !important; height: 72px !important; }
          .logo-float-wrapper { width: 100px; height: 72px; }
          .logo-float { width: 100px; height: 96px; bottom: -12px; }
        }
        @media (min-width: 1201px) {
          .mobile-btn { display: none !important; }
          .mobile-menu-panel { display: none !important; }
        }
      `}</style>

      <nav ref={dropdownRef} style={{
        backgroundColor: 'rgba(255,253,249,0.97)',
        backdropFilter: 'blur(12.5px)',
        WebkitBackdropFilter: 'blur(12.5px)',
        borderBottom: '1px solid rgba(225,225,225,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        overflow: 'visible',
      }}>
        <div className="navbar-inner" style={{
          maxWidth: '1920px',
          margin: '0 auto',
          padding: '0 90px',
          height: '105px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          gap: '48px',
          overflow: 'visible',
        }}>

          {/* Floating logo */}
          <a href="/" className="logo-float-wrapper" style={{ textDecoration:'none' }} aria-label="The Mico Foundation">
            <img src={imgLogo} alt="The Mico Foundation" className="logo-float" />
          </a>

          {/* Desktop nav links */}
          <div className="desktop-nav" style={{
            flex: 1,
            maxWidth: '900px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            {navLinks.map(link =>
              link.dropdown ? (
                <button key={link.label} type="button"
                  className={`nav-link${link.active ? ' active' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {link.label}
                  <img src={imgChevron} alt="" style={{
                    width: '12px', height: '12px',
                    transform: dropdownOpen ? 'scaleY(1)' : 'scaleY(-1)',
                    opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s',
                  }} />
                </button>
              ) : (
                <a key={link.label} href={link.href}
                  className={`nav-link${link.active ? ' active' : ''}`}>
                  {link.label}
                </a>
              )
            )}
          </div>

          <a href="/donate" className="donate-btn desktop-donate">Donate Now</a>

          <button type="button"
            className={`hamburger mobile-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Dropdown */}
        <div className={`dropdown-panel ${dropdownOpen ? 'open' : 'closed'} desktop-nav`}
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          style={{ display:'block' }}>
          <img src={imgSparkle} alt="" style={{
            position:'absolute', top:'10px', left:'40%',
            width:'1503px', height:'109px', objectFit:'cover',
            pointerEvents:'none', opacity:0.25,
          }} />
          <div style={{
            maxWidth: '1920px', margin: '0 auto', padding: '47px 120px',
            display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
            gap: '60px', position: 'relative', zIndex: 1,
          }}>
            {dropdownCols.map((col, ci) => (
              <div key={ci} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                {col.map(item => <DropdownItem key={item.label} label={item.label} href={item.href} />)}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu-panel" style={{
            backgroundColor: 'rgba(255,253,249,0.98)',
            borderTop: '1px solid rgba(225,225,225,0.1)',
            padding: '8px 0',
          }}>
            {navLinks.map((link, i) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button type="button"
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      style={{
                        ...inter, width:'100%', textAlign:'left',
                        display:'flex', alignItems:'center', justifyContent:'space-between',
                        padding:'16px 24px', background:'none', border:'none', cursor:'pointer',
                        fontSize:'18px', fontWeight:500, color:'#6F7181',
                        borderBottom:'1px solid rgba(225,225,225,0.2)',
                      }}>
                      {link.label}
                      <img src={imgChevron} alt="" style={{
                        width:'12px', height:'12px',
                        transform: mobileAboutOpen ? 'scaleY(1)' : 'scaleY(-1)',
                        transition:'transform 0.2s',
                      }} />
                    </button>
                    <div style={{
                      maxHeight: mobileAboutOpen ? '600px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                      backgroundColor: 'rgba(255,247,204,0.3)',
                    }}>
                      {dropdownCols.flat().map(item => (
                        <a key={item.label} href={item.href}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            ...inter, display:'flex', alignItems:'center', gap:'10px',
                            padding:'12px 32px', fontSize:'16px', color:'#040617',
                            textDecoration:'none', borderBottom:'1px solid rgba(225,225,225,0.15)',
                          }}>
                          <img src={imgStar} alt="" style={{ width:'18px', height:'18px', flexShrink:0 }} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a href={link.href} onClick={() => setMenuOpen(false)}
                    style={{
                      ...inter, display:'flex', alignItems:'center',
                      padding:'16px 24px', fontSize:'18px',
                      fontWeight: link.active ? 700 : 500,
                      color: link.active ? '#040617' : '#6F7181',
                      textDecoration:'none',
                      borderBottom: i < navLinks.length - 1 ? '1px solid rgba(225,225,225,0.2)' : 'none',
                    }}>
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            <div style={{ padding:'20px 24px' }}>
              <a href="/donate" className="donate-btn" style={{ width:'100%', justifyContent:'center' }}>
                Donate Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}