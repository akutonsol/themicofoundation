"use client";

const imgLogo = "/images/home/mico-logo.svg";

const badges = [
  { img: "/images/home-static/comodo_secure.png", alt: "Comodo Secure" },
  { img: "/images/home-static/visa.png", alt: "Visa" },
  { img: "/images/home-static/mastercard.png", alt: "Mastercard" },
  { img: "/images/home-static/keycard.png", alt: "KeyCard" },
  { img: "/images/home-static/3dsecure.png", alt: "3D Secure" },
];

const socials = [
  { img: "/images/home-static/twitter.svg", href: "https://twitter.com" },
  { img: "/images/home-static/facebook.svg", href: "https://facebook.com" },
  { img: "/images/home-static/youtube.svg", href: "https://youtube.com" },
  { img: "/images/home-static/ins.svg", href: "https://instagram.com" },
  { img: "/images/home-static/in.svg", href: "https://linkedin.com" },
];

const inter = { fontFamily: "'Inter', sans-serif" };

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Endowments', href: '/endowments' },
  { label: 'Projects', href: '/projects' },
  { label: 'Donate', href: '/donate' },
  { label: 'History', href: '/about/history' },
  { label: 'Messages', href: '/about/messages' },
  { label: 'Team', href: '/about/team' },
  { label: 'Trustees', href: '/about/trustees' },
  { label: 'Work With Us', href: '/about/careers' },
  { label: 'Sponsorship', href: '/about/sponsorship' },
  { label: 'Resource Center', href: '/resources' },
];
 
const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms & Conditions", href: "/terms" },
];
 
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#1A1600]">
      {/* TOP BADGES WITH DONATE BUTTON */}
      <div className="border-b border-black/5 bg-[#EEF2F2] py-10">
        <div className="mx-auto flex max-w-[2000px] flex-wrap items-center justify-center gap-10 px-6 lg:px-10">
          {/* DONATE BUTTON - FIRST ITEM */}
          <a
            href="/donate"
            className="inline-flex items-center justify-center gap-3 rounded-[18px] bg-[#FFD900] px-8 py-5 text-[17px] font-semibold text-[#040617] transition hover:scale-[1.02] shadow-lg"
            style={inter}
          >
            Donate Now
          </a>

          {/* PAYMENT BADGES */}
          {badges.map((badge, i) => (
            <img
              key={i}
              src={badge.img}
              alt={badge.alt}
              className="w-auto object-contain transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              style={{ filter: "grayscale(100%)", opacity: 0.7 }}
            />
          ))}
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 opacity-[0.08]">
          <img
            src="/images/home-static/mico-frontgate.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[1450px] px-6 py-20 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            {/* ABOUT */}
            <div>
              <h3
                className="mb-8 text-[44px] font-semibold leading-[0.95] tracking-[-0.05em] text-white"
                style={inter}
              >
                About
              </h3>

              <p
                className="max-w-[520px] text-[18px] leading-[1.8] text-white/75"
                style={inter}
              >
                The Mico Foundation supports educational advancement, restoration
                initiatives, scholarships, and community-centered development
                projects across Jamaica and the wider Caribbean.
              </p>

              <div className="mt-10">
                <img
                  src="/images/home-static/legacy.png"
                  alt="The Mico Foundation Legacy"
                  className="w-[180px]"
                />
              </div>
            </div>

            {/* EXPLORE */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3
                  className="mb-8 text-[44px] font-semibold leading-[0.95] tracking-[-0.05em] text-white"
                  style={inter}
                >
                  Explore
                </h3>

                <div className="space-y-4">
                  {exploreLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-[18px] text-white/75 no-underline transition hover:text-[#FFD900]"
                      style={inter}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-[74px]">
                <div className="space-y-4">
                  {legalLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-[18px] text-white/75 no-underline transition hover:text-[#FFD900]"
                      style={inter}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3
                className="mb-8 text-[44px] font-semibold leading-[0.95] tracking-[-0.05em] text-white"
                style={inter}
              >
                Contact
              </h3>

              <div className="space-y-10">
                {/* PHONE */}
                <div className="flex gap-5 border-b border-white/10 pb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD900]/25 bg-[#FFD900]/10">
                    <span className="text-[22px] text-[#FFD900]">✆</span>
                  </div>

                  <div>
                    <p
                      className="mb-2 text-[14px] uppercase tracking-[0.12em] text-white/45"
                      style={inter}
                    >
                      Call Anytime
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      +1-876-984-5005
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      +1-876-618-0141
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      +1-876-907-3656
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-5 border-b border-white/10 pb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD900]/25 bg-[#FFD900]/10">
                    <span className="text-[22px] text-[#FFD900]">✉</span>
                  </div>

                  <div>
                    <p
                      className="mb-2 text-[14px] uppercase tracking-[0.12em] text-white/45"
                      style={inter}
                    >
                      Send Email
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      info@micofoundation.org
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      support@micofoundation.org
                    </p>
                  </div>
                </div>

                {/* OFFICE */}
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD900]/25 bg-[#FFD900]/10">
                    <span className="text-[22px] text-[#FFD900]">⌖</span>
                  </div>

                  <div>
                    <p
                      className="mb-2 text-[14px] uppercase tracking-[0.12em] text-white/45"
                      style={inter}
                    >
                      Main Office
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      1A Marescaux Road
                    </p>

                    <p
                      className="text-[18px] font-medium text-white"
                      style={inter}
                    >
                      Kingston, Jamaica
                    </p>

                    <div className="mt-5">
                      <p
                        className="mb-2 text-[14px] uppercase tracking-[0.12em] text-white/45"
                        style={inter}
                      >
                        Opening Hours
                      </p>

                      <p className="text-[17px] text-white" style={inter}>
                        Monday - Friday: 8:00 am - 4:00 pm
                      </p>

                      <p className="text-[17px] text-white" style={inter}>
                        Saturday, Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER SECTION */}
          <div className="mt-20 flex flex-col gap-10 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
            {/* LOGO + SOCIAL */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <img
                src={imgLogo}
                alt="Mico Foundation"
                className="h-[72px] w-auto"
              />

              <div className="flex items-center gap-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1600] text-black transition hover:scale-[1.08]"
                  >
                    <img src={social.img} alt="" className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="text-left lg:text-right">
              <p className="text-[16px] text-white/70" style={inter}>
                © Copyright {new Date().getFullYear()} by The Mico Foundation
              </p>

              <p className="mt-3 text-[15px] text-white/45" style={inter}>
                Website Designed & Developed by{" "}
                <a
                  href="https://akutonsolutions.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFD900] hover:underline"
                >
                  Akuton Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-[1000] flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD900] text-[#040617] shadow-xl transition hover:-translate-y-1"
      >
        <span className="text-[26px]">↑</span>
      </button>
    </footer>
  );
}