'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const inter = { fontFamily: "'Inter', sans-serif" }
const GOLD = '#f3af19'

const TITLE = 'The Management of the Mico Endowment Funds through the Mico Foundation Board of Directors'

const BODY = `The Mico Endowment Funds represent an important long-term financial resource established to support the sustainability, growth, and continued advancement of Mico University College and its educational mission. Given the significance of these funds, their management should be guided by principles of accountability, transparency, prudent investment, and intergenerational stewardship.

It is proposed that the Mico Foundation Board of Directors, through the Finance Management Committee, serve as the principal oversight body for managing the Mico Endowment Funds, subject to the authority and policies of the appropriate governing bodies of the Mico Foundation and Mico University College.

The Finance Management Committee will provide strategic oversight of the endowment funds, ensuring that the funds are invested and administered in accordance with an approved endowment investment policy.

The endowment investment policy will establish clear objectives for investment performance, risk management, asset allocation, liquidity, ethical investment considerations, and preserving the endowment's real value over the long term.

The endowment investment oversight committee's responsibilities will include:

Review and recommend investment strategies designed to achieve sustainable long-term returns while maintaining an appropriate level of risk.

Professional, qualified investment managers, financial advisors, and custodians appointed by the board's governance procedures committee.

Ensure that accurate financial records are maintained and that regular reports on the performance, value, income, and expenditure of the Endowment Funds are presented to the appropriate governing authorities. Monitor investment, operational, liquidity, market, and reputational risks associated with the Endowment and ensure that appropriate safeguards are in place.

Ensure that the endowment funds are managed in accordance with applicable laws, regulations, donor restrictions, Foundation policies, and accepted accounting and governance standards. The funds will also be subject to regular independent audit.

Ensure that any endowment established for a specific purpose is managed and applied in accordance with the conditions attached to the gift or bequest.

Maintain a clear distinction between the preservation of the endowment's principal and the use of investment income or approved distributions. The objective should be to ensure that the Endowment remains a dependable source of support for future generations of Mico students and the wider institution's developmental goals.

The Finance Committee should report regularly to the Mico Foundation Board of Directors and, where appropriate, to the Mico University College. Such reporting should provide a clear picture of the endowment's financial position, investment performance, distributions, fees, risks, and compliance with the investment policy.

The management of the Mico Endowment Funds should be guided by the principle that the Endowment is a permanent institutional asset and not simply a source of short-term financing. Any decision to utilize Endowment resources should therefore be carefully assessed against the institution's long-term strategic objectives.

Through a properly constituted and professionally governed Mico Foundation Finance Management Committee, the Endowment Funds will be protected, prudently invested, and strategically utilized to strengthen Mico's financial sustainability. This arrangement would also give donors, alumni, stakeholders, and the wider Mico community confidence that the resources entrusted to the Foundation are managed to the highest standards of fiduciary responsibility and in keeping with Mico's historic mission of service and educational excellence.`

export default function FundManagementPage() {
  const paragraphs = BODY.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)

  return (
    <main style={{ background: '#FFFDF9', minHeight: '70vh' }}>
      <style>{`
        .fm-wrap { max-width: 900px; margin: 0 auto; padding: clamp(56px,8vw,110px) clamp(24px,6vw,64px); }
        .fm-body p { font-family: 'Inter', sans-serif; font-size: clamp(16px,1.4vw,18px); line-height: 1.85; color: #3F3F46; margin: 0 0 24px; }
      `}</style>

      <div className="fm-wrap">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/endowments" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#6F7181', textDecoration: 'none', marginBottom: 32 }}>
            &larr; Back to Endowments
          </Link>

          <p style={{ ...inter, fontSize: 13, fontWeight: 700, color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Fund Management
          </p>

          <h1 style={{ ...inter, fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#040617', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            {TITLE}
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="fm-body">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </motion.div>
      </div>
    </main>
  )
}
