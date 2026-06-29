'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const imgLogo    = '/images/home/the_mico_foundation.png'   // same logo as the hero
const imgChevron = '/images/home-static/nav-corner-right-up.png'
const imgStar    = '/images/home-static/corner-2.svg'
const imgSparkle = '/images/home-static/nav-sparkle.png'

const GOLD = '#f3af19'
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
    { label: 'Contact Us', href: '/contact' },
  ],
]

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About Us',      href: '/about', dropdown: true },
  { label: 'Endowments',    href: '/endowments' },
  { label: 'Projects',      href: '/projects' },
  { label: 'News & Events', href: '/news' },
  { label: 'Pledge',        href: '/pledge' },
]

function DropdownItem({ label, href }) {
  return (
    <a href={href} className="dropdown-item"
      style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', cursor:'pointer' }}>
      <img src={imgStar} alt="" style={{ width:'20px', height:'20px', flexShrink:0 }} />
      <p style={{
        ...inter, fontSize:'18px', fontWeight:400, color:'#040617',
        letterSpacing:'-0.2px', lineHeight:'26px', margin:0, whiteSpace:'nowrap', transition:'color 0.2s',
      }}>
        {label}
      </p>
    </a>
  )
}

export default function Navbar() {
  const pathname = usePathname() || '/'
  const [menuOpen,       setMenuOpen]        = useState(false)
  const [dropdownOpen,   setDropdownOpen]    = useState(false)
  const [mobileAboutOpen,setMobileAboutOpen] = useState(false)

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

  // Active when the path matches (exact for Home, prefix for the rest)
  const isActive = href => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <style>{`
        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 0;
          line-height: normal;
          letter-spacing: -0.1px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 3px; border-radius: 3px;
          background: ${GOLD};
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.22s ease;
        }
        .nav-link:hover { color: ${GOLD}; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.active { color: ${GOLD}; }
        .nav-link.active::after { transform: scaleX(1); }

        .donate-btn {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #040617;
          background-color: #FFF7CC;
          border-radius: 12px;
          height: 44px;
          padding: 0 24px;
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
          background: rgba(255,253,249,0.98);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(225,225,225,0.1);
          overflow: hidden;
          transition: opacity 0.2s, transform 0.2s;
          transform-origin: top;
        }
        .dropdown-panel.open   { opacity:1; transform:scaleY(1);    pointer-events:all;  }
        .dropdown-panel.closed { opacity:0; transform:scaleY(0.97); pointer-events:none; }
        .dropdown-item:hover p { color: ${GOLD} !important; }

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

        /* Black pill bar holding the links + donate button */
        .mico-bar {
          flex: 1;
          background: #050608;
          border-radius: 16px;
          height: 68px;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 0 14px 0 36px;
          box-shadow: 0 10px 30px rgba(4,6,23,0.18);
        }

        /* Logo — floats above and below the bar */
        .logo-float-wrapper {
          position: relative;
          width: 150px;
          flex-shrink: 0;
          height: 80px;
          display: flex;
          align-items: center;
        }
        .logo-float {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 150px;
          height: 150px;
          object-fit: contain;
          object-position: center;
          z-index: 60;
          transition: transform 0.25s ease;
        }
        .logo-float:hover { transform: translateY(-50%) scale(1.04); }

        @media (max-width: 1200px) {
          .desktop-nav, .desktop-donate, .mico-bar { display: none !important; }
          .mobile-btn { display: flex !important; }
          .navbar-inner { padding: 0 24px !important; height: 72px !important; }
          .logo-float-wrapper { width: 110px; height: 72px; }
          .logo-float { width: 110px; height: 110px; }
        }
        @media (min-width: 1201px) {
          .mobile-btn { display: none !important; }
          .mobile-menu-panel { display: none !important; }
        }
      `}</style>

      <nav ref={dropdownRef} style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(4,6,23,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        overflow: 'visible',
      }}>
        <div className="navbar-inner" style={{
          maxWidth: '1920px',
          margin: '0 auto',
          padding: '14px 48px',
          minHeight: '96px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          gap: '28px',
          overflow: 'visible',
        }}>

          {/* Floating logo (same as hero) */}
          <a href="/" className="logo-float-wrapper" style={{ textDecoration:'none' }} aria-label="The Mico Foundation">
            <img src={imgLogo} alt="The Mico Foundation" className="logo-float" />
          </a>

          {/* Black bar — desktop links + donate */}
          <div className="mico-bar">
            <div className="desktop-nav" style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
              {navLinks.map(link =>
                link.dropdown ? (
                  <button key={link.label} type="button"
                    className={`nav-link${isActive(link.href) ? ' active' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {link.label}
                    <img src={imgChevron} alt="" style={{
                      width: '12px', height: '12px',
                      transform: dropdownOpen ? 'scaleY(1)' : 'scaleY(-1)',
                      opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s',
                      filter: 'brightness(0) invert(1)',
                    }} />
                  </button>
                ) : (
                  <a key={link.label} href={link.href}
                    className={`nav-link${isActive(link.href) ? ' active' : ''}`}>
                    {link.label}
                  </a>
                )
              )}
            </div>

            <a href="/donate" className="donate-btn desktop-donate">Donate Now</a>
          </div>

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
                        fontSize:'18px', fontWeight: isActive(link.href) ? 700 : 500,
                        color: isActive(link.href) ? GOLD : '#6F7181',
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
                      fontWeight: isActive(link.href) ? 700 : 500,
                      color: isActive(link.href) ? GOLD : '#6F7181',
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
