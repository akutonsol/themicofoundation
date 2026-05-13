const imgArrow = "/images/home-static/button-icon.png"

export default function DonateButton({ text = 'Donate Now', href = '/donate', width = '240px', style = {} }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: '16px',
        fontWeight: 600,
        color: '#040617',
        backgroundColor: '#FFD900',
        borderRadius: '18px',
        padding: '16px 24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        border: 'none',
        cursor: 'pointer',
        width: width,
        transition: 'background-color 0.2s',
        ...style,
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6c200'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFD900'}
    >
      {text}
      {/* Icon container is 24px but arrow sits in inner 33% inset — render at true size */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        flexShrink: 0,
      }}>
        <img
          src={imgArrow}
          alt=""
          style={{
            width: '14px',
            height: '14px',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </span>
    </a>
  )
}
