import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const fmtDate = iso => {
  try { return new Date(iso || Date.now()).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) }
  catch(_) { return new Date().toLocaleDateString() }
}

async function generateReceiptPDF(data) {
  const {
    donorName = '', donorEmail = '', amount = 0, orderId = '',
    transactionId = '', authCode = '', cardBrand = '',
    projectTitle = '', donationType = 'general',
    address = '', city = '', state = '', zip = '',
    country = 'Jamaica', processedAt,
  } = data

  const displayAmount = typeof amount === 'number' ? '$' + amount.toFixed(2) : String(amount || '0')
  const receiptId     = transactionId || ('TXN-' + Date.now() + '-' + (orderId || '').replace('MICO-', ''))
  const dtype         = (donationType || 'General').charAt(0).toUpperCase() + (donationType || 'general').slice(1)
  const locationLine  = [city, state ? (state + ' ' + (zip || '')).trim() : zip, country].filter(Boolean).join(', ')

  const pdfDoc = await PDFDocument.create()
  const page   = pdfDoc.addPage([595, 842])
  const W = page.getWidth()
  const H = page.getHeight()

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const reg  = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const DARK  = rgb(0.016, 0.024, 0.090)
  const GOLD  = rgb(1.000, 0.851, 0.000)
  const GRAY  = rgb(0.435, 0.443, 0.506)
  const LIGHT = rgb(0.961, 0.953, 0.937)
  const GREEN = rgb(0.184, 0.541, 0.271)
  const WHITE = rgb(1, 1, 1)
  const LGRAY = rgb(0.898, 0.902, 0.922)
  const CREAM = rgb(0.976, 0.976, 0.961)

  // Header
  page.drawRectangle({ x:0, y:H-110, width:W, height:110, color:DARK })

  const fn = 'The Mico Foundation'
  const fnW = bold.widthOfTextAtSize(fn, 20)
  page.drawText(fn, { x:(W-fnW)/2, y:H-40, size:20, font:bold, color:GOLD })

  const s1 = 'Official Donation Receipt'
  const s1W = reg.widthOfTextAtSize(s1, 12)
  page.drawText(s1, { x:(W-s1W)/2, y:H-62, size:12, font:reg, color:rgb(0.8,0.8,0.8) })

  const s2 = 'Tax-Deductible Donation Receipt'
  const s2W = bold.widthOfTextAtSize(s2, 10)
  page.drawText(s2, { x:(W-s2W)/2, y:H-82, size:10, font:bold, color:GOLD })

  // Amount box
  page.drawRectangle({ x:50, y:H-192, width:W-100, height:72, color:LIGHT })
  const amtW = bold.widthOfTextAtSize(displayAmount, 34)
  page.drawText(displayAmount, { x:(W-amtW)/2, y:H-164, size:34, font:bold, color:DARK })
  const dtW = reg.widthOfTextAtSize(dtype + ' Donation', 11)
  page.drawText(dtype + ' Donation', { x:(W-dtW)/2, y:H-182, size:11, font:reg, color:GRAY })

  // OK badge
  page.drawRectangle({ x:(W/2)-52, y:H-228, width:104, height:22, color:rgb(0.878,0.969,0.878) })
  const ok = 'OK  Confirmed'
  const okW = bold.widthOfTextAtSize(ok, 9)
  page.drawText(ok, { x:(W-okW)/2, y:H-221, size:9, font:bold, color:GREEN })

  let curY = H - 252

  const drawSection = title => {
    page.drawRectangle({ x:50, y:curY-24, width:W-100, height:24, color:DARK })
    page.drawText(title, { x:62, y:curY-16, size:9, font:bold, color:GOLD })
    curY -= 24
  }

  const drawRow = (label, value, shade) => {
    if (shade) page.drawRectangle({ x:50, y:curY-20, width:W-100, height:20, color:CREAM })
    page.drawText(String(label || ''), { x:62,      y:curY-13, size:8.5, font:reg,  color:GRAY, maxWidth:(W/2)-70 })
    page.drawText(String(value || '-'), { x:W/2+10, y:curY-13, size:8.5, font:bold, color:DARK, maxWidth:(W/2)-70 })
    curY -= 20
  }

  // Donor Information
  drawSection('DONOR INFORMATION')
  drawRow('Name',     donorName,    false)
  drawRow('Email',    donorEmail,   true)
  if (address)      drawRow('Address',  address,      false)
  if (locationLine) drawRow('Location', locationLine, !!address)

  // Donation Details
  curY -= 8
  drawSection('DONATION DETAILS')
  drawRow('Project',        projectTitle || 'General Donation',           false)
  drawRow('Payment',        cardBrand ? 'Card (' + cardBrand + ')' : 'Card', true)
  drawRow('Transaction ID', receiptId,                                    false)
  drawRow('Date',           fmtDate(processedAt),                         true)
  if (authCode) drawRow('Authorization Code', authCode, false)
  if (orderId)  drawRow('Order ID',           orderId,  !authCode)

  // Tax notice
  curY -= 12
  page.drawRectangle({ x:50, y:curY-54, width:W-100, height:54, color:LIGHT })
  page.drawRectangle({ x:52, y:curY-52, width:100,   height:50, color:DARK })
  page.drawText('TAX DEDUCTIBLE', { x:56, y:curY-20, size:8, font:bold, color:GOLD })
  page.drawText('All donations',  { x:60, y:curY-33, size:7, font:reg,  color:rgb(0.7,0.7,0.7) })
  page.drawText('over $2 qualify',{ x:57, y:curY-44, size:7, font:reg,  color:rgb(0.7,0.7,0.7) })
  page.drawText('All donations over $2 are tax deductible. Please keep this receipt', { x:160, y:curY-20, size:7.5, font:reg, color:GRAY, maxWidth:W-220 })
  page.drawText('for your tax records. Our Tax ID: XX-XXXXXXX', { x:160, y:curY-31, size:7.5, font:reg, color:GRAY })

  // Footer
  const footerY = 68
  page.drawLine({ start:{x:50,y:footerY+40}, end:{x:W-50,y:footerY+40}, thickness:0.5, color:LGRAY })
  const fn2 = 'The Mico Foundation'
  const fn2W = bold.widthOfTextAtSize(fn2, 10)
  page.drawText(fn2, { x:(W-fn2W)/2, y:footerY+24, size:10, font:bold, color:DARK })
  const addr = '1A Marescaux Road, Kingston 5, Jamaica'
  const addrW = reg.widthOfTextAtSize(addr, 8)
  page.drawText(addr, { x:(W-addrW)/2, y:footerY+12, size:8, font:reg, color:GRAY })
  const contact = 'Email: donations@themicofoundation.org  |  Website: themicofoundation.org'
  const contactW = reg.widthOfTextAtSize(contact, 7.5)
  page.drawText(contact, { x:(W-contactW)/2, y:footerY+1, size:7.5, font:reg, color:GRAY })
  const disc = 'This is an official tax receipt. For questions please contact us at the email above.'
  const discW = reg.widthOfTextAtSize(disc, 7)
  page.drawText(disc, { x:(W-discW)/2, y:footerY-11, size:7, font:reg, color:rgb(0.6,0.6,0.6) })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}

// ── GET /api/receipt?data=<base64-json> ───────────────────────────────────────
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const encoded = searchParams.get('data')
    if (!encoded) return new Response('Missing data', { status: 400 })

    // Decode — handle both base64url and standard base64
    let receiptData
    try {
      const decoded = Buffer.from(encoded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
      receiptData = JSON.parse(decoded)
    } catch (e) {
      console.error('Decode error:', e)
      return new Response('Invalid data parameter', { status: 400 })
    }

    console.log('Generating receipt for:', receiptData.orderId)
    const pdfBuffer = await generateReceiptPDF(receiptData)
    console.log('PDF generated, size:', pdfBuffer.length)

    const filename = 'Mico-Foundation-Receipt-' + (receiptData.transactionId || receiptData.orderId || 'donation') + '.pdf'

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': 'attachment; filename="' + filename + '"',
        'Cache-Control':       'no-store',
      },
    })
  } catch (err) {
    console.error('Receipt generation error:', err.message, err.stack)
    return new Response('Failed to generate receipt: ' + err.message, { status: 500 })
  }
}