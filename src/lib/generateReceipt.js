import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Strip characters outside WinAnsi range (0x20–0xFF)
function sanitizeText(text) {
  if (text === null || text === undefined) return '';
  return String(text).replace(/[^\x20-\xFF]/g, '');
}

export async function generateDonationReceipt(donationData) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([612, 792])

  const boldFont    = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const yellow  = rgb(1, 0.85, 0)
  const darkText = rgb(0.016, 0.024, 0.09)
  const grayText = rgb(0.435, 0.443, 0.506)
  const green   = rgb(0.369, 0.855, 0.443)
  const lightBg = rgb(1, 0.992, 0.976)
  const border  = rgb(0.898, 0.902, 0.922)

  // ── Header ──
  page.drawRectangle({ x: 0, y: 672, width: 612, height: 120, color: yellow })

  page.drawText('The Mico Foundation', {
    x: 306 - boldFont.widthOfTextAtSize('The Mico Foundation', 28) / 2,
    y: 732, size: 28, font: boldFont, color: darkText,
  })

  page.drawText('Official Donation Receipt', {
    x: 306 - regularFont.widthOfTextAtSize('Official Donation Receipt', 14) / 2,
    y: 702, size: 14, font: regularFont, color: darkText,
  })

  page.drawText('Tax-Deductible Donation Receipt', {
    x: 306 - boldFont.widthOfTextAtSize('Tax-Deductible Donation Receipt', 20) / 2,
    y: 630, size: 20, font: boldFont, color: darkText,
  })

  page.drawCircle({ x: 306, y: 595, size: 20, color: green, borderColor: green, borderWidth: 2 })
  page.drawText('OK', { x: 296, y: 586, size: 14, font: boldFont, color: rgb(1, 1, 1) })

  // ── Amount box ──
  page.drawRectangle({ x: 50, y: 370, width: 512, height: 200, color: lightBg, borderColor: border, borderWidth: 1 })

  const amountText = sanitizeText(`$${donationData.amount}`)
  page.drawText(amountText, {
    x: 306 - boldFont.widthOfTextAtSize(amountText, 36) / 2,
    y: 520, size: 36, font: boldFont, color: green,
  })

  const donationType = sanitizeText(donationData.donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation')
  page.drawText(donationType, {
    x: 306 - regularFont.widthOfTextAtSize(donationType, 14) / 2,
    y: 480, size: 14, font: regularFont, color: grayText,
  })

  // ── Donor Information ──
  let yPos = 330

  page.drawText('Donor Information', { x: 70, y: yPos, size: 14, font: boldFont, color: darkText })
  yPos -= 25

  const donorDetails = [
    sanitizeText(`Name: ${donationData.firstName} ${donationData.lastName}`),
    sanitizeText(`Email: ${donationData.email}`),
    sanitizeText(`Address: ${donationData.address1}`),
  ]

  if (donationData.address2) {
    donorDetails.push(sanitizeText(`         ${donationData.address2}`))
  }

  donorDetails.push(sanitizeText(`         ${donationData.city}, ${donationData.state} ${donationData.zip}`))
  donorDetails.push(sanitizeText(`         ${donationData.country}`))

  donorDetails.forEach(line => {
    page.drawText(line, { x: 70, y: yPos, size: 11, font: regularFont, color: darkText })
    yPos -= 18
  })

  // ── Donation Details ──
  yPos = 330

  page.drawText('Donation Details', { x: 320, y: yPos, size: 14, font: boldFont, color: darkText })
  yPos -= 25

  const formattedDate = sanitizeText(new Date(donationData.donationDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }))

  const paymentMethod = sanitizeText(
    donationData.paymentMethod.charAt(0).toUpperCase() + donationData.paymentMethod.slice(1)
  )

  const donationDetails = [
    sanitizeText(`Project: ${donationData.projectTitle}`),
    sanitizeText(`Payment: ${paymentMethod}`),
    `Transaction ID:`,
    sanitizeText(`${donationData.transactionId}`),
    sanitizeText(`Date: ${formattedDate}`),
  ]

  donationDetails.forEach((line, i) => {
    const size = i === 3 ? 9 : 11
    page.drawText(line, { x: 320, y: yPos, size, font: regularFont, color: darkText })
    yPos -= i === 2 ? 12 : 18
  })

  // ── Tax box ──
  page.drawRectangle({
    x: 50, y: 120, width: 512, height: 80,
    color: rgb(1, 0.976, 0.902), borderColor: yellow, borderWidth: 1,
  })

  page.drawText('Tax Deductible', { x: 70, y: 175, size: 12, font: boldFont, color: darkText })

  page.drawText('All donations over $2 are tax deductible. Please keep this receipt for', {
    x: 70, y: 155, size: 10, font: regularFont, color: darkText,
  })

  page.drawText('your tax records. Our Tax ID: XX-XXXXXXX', {
    x: 70, y: 142, size: 10, font: regularFont, color: darkText,
  })

  // ── Footer ──
  const footerLines = [
    { text: 'The Mico Foundation', size: 10, font: boldFont },
    { text: '1A Marescaux Road, Kingston 5, Jamaica', size: 9, font: regularFont },
    { text: 'Email: donations@themicofoundation.org', size: 9, font: regularFont },
    { text: 'Website: themicofoundation.org', size: 9, font: regularFont },
    { text: 'This is an official tax receipt. For questions, please contact us at the email above.', size: 8, font: regularFont },
  ]

  let footerY = 80
  footerLines.forEach(({ text, size, font }, i) => {
    page.drawText(text, {
      x: 306 - font.widthOfTextAtSize(text, size) / 2,
      y: footerY, size, font, color: grayText,
    })
    footerY -= i === 3 ? 18 : 13
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}