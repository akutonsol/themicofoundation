import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// ── Helpers ───────────────────────────────────────────────────────────────────
const hex2rgb = hex => {
  const r = parseInt(hex.slice(1,3),16)/255
  const g = parseInt(hex.slice(3,5),16)/255
  const b = parseInt(hex.slice(5,7),16)/255
  return rgb(r,g,b)
}

const DARK  = hex2rgb('#040617')
const GOLD  = hex2rgb('#FFD900')
const GRAY  = hex2rgb('#6F7181')
const LIGHT = hex2rgb('#F5F3EE')
const GREEN = hex2rgb('#2F8A45')
const WHITE = rgb(1,1,1)
const LGRAY = hex2rgb('#E5E6EB')

const fmtDate = iso => {
  try { return new Date(iso||Date.now()).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) }
  catch(_){ return new Date().toLocaleDateString() }
}

// ── Generate PDF using pdf-lib ────────────────────────────────────────────────
async function generateReceiptPDF(data) {
  const {
    donorName='', donorEmail='', amount=0, orderId='', transactionId='',
    authCode='', cardBrand='', projectTitle='', donationType='general',
    address='', city='', state='', zip='', country='Jamaica', processedAt,
  } = data

  const displayAmount = typeof amount === 'number' ? '$' + amount.toFixed(2) : String(amount||'0')
  const receiptId = transactionId || ('TXN-'+Date.now()+'-'+(orderId||'').replace('MICO-',''))
  const dtype = (donationType||'General').charAt(0).toUpperCase()+(donationType||'general').slice(1)
  const locationLine = [city, state ? state+' '+(zip||'') : zip, country].filter(Boolean).join(', ')

  const pdfDoc = await PDFDocument.create()
  const page   = pdfDoc.addPage([595, 842]) // A4
  const { width: W, height: H } = page.getSize()

  const bold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const reg    = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // ── Header block ─────────────────────────────────────────────────────────
  page.drawRectangle({ x:0, y:H-110, width:W, height:110, color:DARK })

  // Foundation name
  const fnSize = 20
  const fnText = 'The Mico Foundation'
  const fnW    = bold.widthOfTextAtSize(fnText, fnSize)
  page.drawText(fnText, { x:(W-fnW)/2, y:H-42, size:fnSize, font:bold, color:GOLD })

  // Subtitle
  const sub1 = 'Official Donation Receipt'
  const sub1W = reg.widthOfTextAtSize(sub1, 12)
  page.drawText(sub1, { x:(W-sub1W)/2, y:H-64, size:12, font:reg, color:hex2rgb('#CCCCCC') })

  const sub2 = 'Tax-Deductible Donation Receipt'
  const sub2W = bold.widthOfTextAtSize(sub2, 10)
  page.drawText(sub2, { x:(W-sub2W)/2, y:H-84, size:10, font:bold, color:GOLD })

  // ── Amount box ────────────────────────────────────────────────────────────
  const amtY = H - 192
  page.drawRectangle({ x:50, y:amtY, width:W-100, height:72, color:LIGHT })

  const amtSize = 34
  const amtW    = bold.widthOfTextAtSize(displayAmount, amtSize)
  page.drawText(displayAmount, { x:(W-amtW)/2, y:amtY+28, size:amtSize, font:bold, color:DARK })

  const dtW = reg.widthOfTextAtSize(dtype+' Donation', 11)
  page.drawText(dtype+' Donation', { x:(W-dtW)/2, y:amtY+10, size:11, font:reg, color:GRAY })

  // OK badge
  page.drawRectangle({ x:(W/2)-52, y:H-228, width:104, height:22, color:hex2rgb('#E8F5E9') })
  const ok = 'OK  Confirmed'
  const okW = bold.widthOfTextAtSize(ok, 9)
  page.drawText(ok, { x:(W-okW)/2, y:H-222, size:9, font:bold, color:GREEN })

  // ── Section renderer ──────────────────────────────────────────────────────
  let curY = H - 256

  const drawSection = (title) => {
    page.drawRectangle({ x:50, y:curY-24, width:W-100, height:24, color:DARK })
    page.drawText(title, { x:62, y:curY-16, size:9, font:bold, color:GOLD })
    curY -= 24
  }

  const drawRow = (label, value, shade) => {
    if (shade) page.drawRectangle({ x:50, y:curY-20, width:W-100, height:20, color:hex2rgb('#F9F9F9') })
    page.drawText(String(label||''), { x:62,      y:curY-13, size:8.5, font:reg,  color:GRAY })
    page.drawText(String(value||'-'), { x:W/2+10, y:curY-13, size:8.5, font:bold, color:DARK })
    curY -= 20
  }

  // ── Donor Information ─────────────────────────────────────────────────────
  drawSection('DONOR INFORMATION')
  drawRow('Name',    donorName,    false)
  drawRow('Email',   donorEmail,   true)
  if (address) drawRow('Address', address, false)
  if (locationLine) drawRow('Location', locationLine, !address)

  // ── Donation Details ──────────────────────────────────────────────────────
  curY -= 8
  drawSection('DONATION DETAILS')
  drawRow('Project',          projectTitle||'General Donation', false)
  drawRow('Payment',          cardBrand ? 'Card ('+cardBrand+')' : 'Card', true)
  drawRow('Transaction ID',   receiptId,  false)
  drawRow('Date',             fmtDate(processedAt), true)
  if (authCode) drawRow('Authorization Code', authCode, false)
  if (orderId)  drawRow('Order ID', orderId, !authCode)

  // ── Tax notice ────────────────────────────────────────────────────────────
  curY -= 12
  page.drawRectangle({ x:50, y:curY-56, width:W-100, height:56, color:LIGHT })
  page.drawRectangle({ x:52, y:curY-54, width:100, height:52, color:DARK })
  page.drawText('TAX DEDUCTIBLE', { x:56, y:curY-22, size:8, font:bold, color:GOLD })
  page.drawText('All donations',  { x:60, y:curY-36, size:7, font:reg,  color:hex2rgb('#AAAAAA') })
  page.drawText('over $2 qualify',{ x:58, y:curY-47, size:7, font:reg,  color:hex2rgb('#AAAAAA') })
  page.drawText(
    'All donations over $2 are tax deductible. Please keep this receipt for your tax records.',
    { x:160, y:curY-22, size:7.5, font:reg, color:GRAY, maxWidth:W-220 }
  )
  page.drawText('Our Tax ID: XX-XXXXXXX', { x:160, y:curY-36, size:7.5, font:reg, color:GRAY })

  // ── Footer ────────────────────────────────────────────────────────────────
  const footerY = 72
  page.drawLine({ start:{x:50,y:footerY+42}, end:{x:W-50,y:footerY+42}, thickness:0.5, color:LGRAY })

  const fnText2 = 'The Mico Foundation'
  const fnW2 = bold.widthOfTextAtSize(fnText2, 10)
  page.drawText(fnText2, { x:(W-fnW2)/2, y:footerY+26, size:10, font:bold, color:DARK })

  const addr = '1A Marescaux Road, Kingston 5, Jamaica'
  const addrW = reg.widthOfTextAtSize(addr, 8)
  page.drawText(addr, { x:(W-addrW)/2, y:footerY+13, size:8, font:reg, color:GRAY })

  const contact = 'Email: donations@themicofoundation.org    |    Website: themicofoundation.org'
  const contactW = reg.widthOfTextAtSize(contact, 7.5)
  page.drawText(contact, { x:(W-contactW)/2, y:footerY+1, size:7.5, font:reg, color:GRAY })

  const disclaimer = 'This is an official tax receipt. For questions please contact us at the email above.'
  const discW = reg.widthOfTextAtSize(disclaimer, 7)
  page.drawText(disclaimer, { x:(W-discW)/2, y:footerY-12, size:7, font:reg, color:hex2rgb('#9CA3AF') })

  return Buffer.from(await pdfDoc.save())
}

// ── GET /api/receipt?data=<base64url-json> ────────────────────────────────────
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const encoded = searchParams.get('data')

    if (!encoded) return new Response('Missing data', { status:400 })

    let receiptData
    try {
      receiptData = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'))
    } catch(_) {
      return new Response('Invalid data', { status:400 })
    }

    const pdfBuffer = await generateReceiptPDF(receiptData)
    const filename  = 'Mico-Foundation-Receipt-'+(receiptData.transactionId||receiptData.orderId||'donation')+'.pdf'

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type':        'application/pdf',
        'Content-Disposition': 'attachment; filename="'+filename+'"',
        'Content-Length':      String(pdfBuffer.length),
        'Cache-Control':       'no-store',
      },
    })
  } catch (err) {
    console.error('Receipt error:', err)
    return new Response('Failed: '+err.message, { status:500 })
  }
}