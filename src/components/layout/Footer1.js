'use client'

const imgLogo = '/images/home/mico-logo.svg'
const imgTwitter = "/images/home-static/twitter.svg"
const imgLinkedin = "/images/home-static/in.svg"
const imgInstagram = "/images/home-static/ins.svg"
const imgYoutube = "/images/home-static/youtube.svg"
const imgArrowUp = "/images/home-static/arrow-up.svg"

const inter = { fontFamily: "'Inter', sans-serif" }

const footerLinks = [
  {
    title: 'Sitemap',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Endowments', href: '/endowments' },
      { label: 'Projects', href: '/projects' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'History', href: '/about/history' },
      { label: 'Messages', href: '/about/messages' },
      { label: 'Team', href: '/about/team' },
      { label: 'Trustees', href: '/about/trustees' },
      { label: 'Work With Us', href: '/about/careers' },
      { label: 'Sponsorship', href: '/about/sponsorship' },
      { label: 'Resource Center', href: '/resources' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

const socials = [
  { img: imgTwitter, label: 'X / Twitter', href: 'https://twitter.com' },
  { img: imgLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { img: imgInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { img: imgYoutube, label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer-section relative bg-[#1A1600] px-6 py-12 md:px-[clamp(24px, 8vw, 165px)] md:py-[60px]">

      <style>{`
        .footer-link {
          color: #FFFDF9;
          text-decoration: none;
          transition: color 0.2s;
          display: block;
          font-family: 'Inter', sans-serif;
        }

        .footer-link:hover {
          color: #FFD900;
        }

        .social-icon {
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .social-icon:hover {
          opacity: 1;
        }
      `}</style>

      <div className="footer-grid mb-12 flex flex-col md:flex-row md:gap-[229px] md:mb-[52px]">

        <div className="mb-12 flex flex-col items-center gap-7 text-center md:mb-0 md:items-start md:text-left">
          <a href="/" className="flex items-center gap-2 no-underline">
            <img 
              src={imgLogo} 
              alt="The MICO Foundation" 
              className="h-[80px] w-auto md:h-[100px]"
            />
          </a>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={s.label}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="h-8 w-8"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="links-grid grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-[30px]">

            {footerLinks.map((col) => (
              <div
                key={col.title}
                className="flex flex-col items-center gap-4 text-center md:items-start md:text-left"
              >
                <p
                  style={inter}
                  className="m-0 text-2xl font-semibold uppercase leading-relaxed tracking-tight text-white md:text-[32px] md:capitalize"
                >
                  {col.title}
                </p>

                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="footer-link text-lg font-normal tracking-wide leading-relaxed md:text-2xl"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="go-top-btn mt-12 flex w-full flex-col items-center gap-3 border-none bg-none text-white transition-opacity hover:opacity-70 md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-auto"
            onClick={scrollToTop}
          >
            <img
              src={imgArrowUp}
              alt=""
              className="h-10 w-10 md:h-12 md:w-12"
            />

            <span
              style={inter}
              className="whitespace-nowrap text-lg font-normal md:text-2xl"
            >
              Go to Top
            </span>
          </button>
        </div>
      </div>

      <div className="footer-bottom flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 text-center md:flex-row md:text-left">

        <p
          style={inter}
          className="m-0 text-sm font-normal text-white md:text-base"
        >
          Copyright © The Mico Foundation. All Rights Reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-[30px]">
          {['Privacy Policy', 'Terms of Use', 'Return Policy'].map((item) => (
            <a
              key={item}
              href="#"
              style={inter}
              className="whitespace-nowrap text-sm font-normal text-white no-underline transition-colors hover:text-[#FFD900] md:text-base"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}