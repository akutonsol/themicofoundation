'use client'

const imgImage5  ="/images/home/spons-logo1.png"
const imgImage8  = "/images/home/spons-logo1.png"
const imgImage10 = "/images/home/spons-logo1.png"

const logos = [
  { src: imgImage5,  w: 150, h: 52  },
  { src: imgImage8,  w: 150, h: 36  },
  { src: imgImage5,  w: 150, h: 52  },
  { src: imgImage10, w: 150, h: 22  },
  { src: imgImage10, w: 150, h: 22  },
  { src: imgImage5,  w: 150, h: 52  },
  { src: imgImage8,  w: 150, h: 36  },
  { src: imgImage10, w: 150, h: 22  },
  { src: imgImage5,  w: 150, h: 52  },
  { src: imgImage10, w: 150, h: 22  },
  { src: imgImage8,  w: 150, h: 36  },
  { src: imgImage8,  w: 150, h: 36  },
]

export default function TrustedBy() {
  return (
    <section style={{ backgroundColor: '#FFFDF9', overflow: 'hidden', position: 'relative', padding: '0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600&display=swap');

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .trusted-track {
          display: flex;
          align-items: center;
          gap: 60px;
          white-space: nowrap;
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
        }
        .trusted-track:hover { animation-play-state: paused; }

        /* Desktop — no heading, just marquee strip */
        .trusted-heading { display: none; }
        .trusted-wrap    { padding: 40px 0; }

        /* Mobile — show heading above marquee */
        @media (max-width: 768px) {
          .trusted-heading {
            display: block;
            font-family: 'Sora', sans-serif;
            font-size: 32px;
            font-weight: 600;
            color: #040617;
            letter-spacing: -0.32px;
            line-height: 46px;
            text-align: center;
            padding: 16px 0 0;
            margin: 0;
          }
          .trusted-wrap { padding: 16px 0 24px; }
          .trusted-track { gap: 20px; }
          .trusted-logo  { transform: scale(0.75); transform-origin: center; }
        }
      `}</style>

      {/* Mobile heading */}
      <p className="trusted-heading">Trusted By</p>

      <div className="trusted-wrap" style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #FFFDF9 0%, rgba(255,253,249,0) 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #FFFDF9 0%, rgba(255,253,249,0) 100%)', zIndex: 2, pointerEvents: 'none' }} />

        {/* Marquee — doubled for seamless loop */}
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div className="trusted-track">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="trusted-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mixBlendMode: 'luminosity', width: `${logo.w}px`, height: `${logo.h}px` }}>
                <img src={logo.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}