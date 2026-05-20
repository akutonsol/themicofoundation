import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function generateDonationReceipt(donationData) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()
  
  // Add a page
  const page = pdfDoc.addPage([612, 792]) // Letter size (8.5" x 11")
  
  // Get fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
  // Brand colors
  const yellow = rgb(1, 0.85, 0) // #FFD900
  const darkText = rgb(0.016, 0.024, 0.09) // #040617
  const grayText = rgb(0.435, 0.443, 0.506) // #6F7181
  const green = rgb(0.369, 0.855, 0.443) // #5EDA71
  const lightBg = rgb(1, 0.992, 0.976) // #FFFDF9
  const border = rgb(0.898, 0.902, 0.922) // #E5E6EB
  
  // Header - Yellow background
  page.drawRectangle({
    x: 0,
    y: 672,
    width: 612,
    height: 120,
    color: yellow,
  })
  
  // Foundation name
  page.drawText('The Mico Foundation', {
    x: 306 - boldFont.widthOfTextAtSize('The Mico Foundation', 28) / 2,
    y: 732,
    size: 28,
    font: boldFont,
    color: darkText,
  })
  
  // Subtitle
  page.drawText('Official Donation Receipt', {
    x: 306 - regularFont.widthOfTextAtSize('Official Donation Receipt', 14) / 2,
    y: 702,
    size: 14,
    font: regularFont,
    color: darkText,
  })
  
  // Receipt title
  page.drawText('Tax-Deductible Donation Receipt', {
    x: 306 - boldFont.widthOfTextAtSize('Tax-Deductible Donation Receipt', 20) / 2,
    y: 630,
    size: 20,
    font: boldFont,
    color: darkText,
  })
  
// Success indicator circle
page.drawCircle({
  x: 306,
  y: 595,
  size: 20,
  color: green,
  borderColor: green,
  borderWidth: 2,
})

// Success text
page.drawText('OK', {
  x: 296,
  y: 586,
  size: 14,
  font: boldFont,
  color: rgb(1, 1, 1),
})


  // Donation amount box
  page.drawRectangle({
    x: 50,
    y: 370,
    width: 512,
    height: 200,
    color: lightBg,
    borderColor: border,
    borderWidth: 1,
  })
  
  // Large amount
  const amountText = `$${donationData.amount}`
  page.drawText(amountText, {
    x: 306 - boldFont.widthOfTextAtSize(amountText, 36) / 2,
    y: 520,
    size: 36,
    font: boldFont,
    color: green,
  })
  
  // Donation type
  const donationType = donationData.donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation'
  page.drawText(donationType, {
    x: 306 - regularFont.widthOfTextAtSize(donationType, 14) / 2,
    y: 480,
    size: 14,
    font: regularFont,
    color: grayText,
  })
  
  // Donor Information section
  let yPos = 330
  
  page.drawText('Donor Information', {
    x: 70,
    y: yPos,
    size: 14,
    font: boldFont,
    color: darkText,
  })
  
  yPos -= 25
  
  // Donor details
  const donorDetails = [
    `Name: ${donationData.firstName} ${donationData.lastName}`,
    `Email: ${donationData.email}`,
    `Address: ${donationData.address1}`,
  ]
  
  if (donationData.address2) {
    donorDetails.push(`         ${donationData.address2}`)
  }
  
  donorDetails.push(`         ${donationData.city}, ${donationData.state} ${donationData.zip}`)
  donorDetails.push(`         ${donationData.country}`)
  
  donorDetails.forEach(line => {
    page.drawText(line, {
      x: 70,
      y: yPos,
      size: 11,
      font: regularFont,
      color: darkText,
    })
    yPos -= 18
  })
  
  // Donation Details section (right column)
  yPos = 330
  
  page.drawText('Donation Details', {
    x: 320,
    y: yPos,
    size: 14,
    font: boldFont,
    color: darkText,
  })
  
  yPos -= 25
  
  const donationDetails = [
    `Project: ${donationData.projectTitle}`,
    `Payment: ${donationData.paymentMethod.charAt(0).toUpperCase() + donationData.paymentMethod.slice(1)}`,
    `Transaction ID:`,
    `${donationData.transactionId}`,
    `Date: ${new Date(donationData.donationDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`,
  ]
  
  donationDetails.forEach((line, i) => {
    const size = line.startsWith(donationData.transactionId) ? 9 : 11
    page.drawText(line, {
      x: 320,
      y: yPos,
      size: size,
      font: regularFont,
      color: darkText,
    })
    yPos -= i === 2 ? 12 : 18 // Less space after "Transaction ID:" label
  })
  
  // Tax deductible box
  page.drawRectangle({
    x: 50,
    y: 120,
    width: 512,
    height: 80,
    color: rgb(1, 0.976, 0.902), // #FFF9E6
    borderColor: yellow,
    borderWidth: 1,
  })
  
  page.drawText('Tax Deductible', {
    x: 70,
    y: 175,
    size: 12,
    font: boldFont,
    color: darkText,
  })
  
  const taxText = 'All donations over $2 are tax deductible. Please keep this receipt for'
  const taxText2 = 'your tax records. Our Tax ID: XX-XXXXXXX'
  
  page.drawText(taxText, {
    x: 70,
    y: 155,
    size: 10,
    font: regularFont,
    color: darkText,
  })
  
  page.drawText(taxText2, {
    x: 70,
    y: 142,
    size: 10,
    font: regularFont,
    color: darkText,
  })
  
  // Footer
  const footerLines = [
    'The Mico Foundation',
    '1A Marescaux Road, Kingston 5, Jamaica',
    'Email: donations@themicofoundation.org',
    'Website: themicofoundation.org',
    'This is an official tax receipt. For questions, please contact us at the email above.',
  ]
  
  let footerY = 80
  footerLines.forEach((line, i) => {
    const size = i === 4 ? 8 : i === 0 ? 10 : 9
    const font = i === 0 ? boldFont : regularFont
    page.drawText(line, {
      x: 306 - font.widthOfTextAtSize(line, size) / 2,
      y: footerY,
      size: size,
      font: font,
      color: grayText,
    })
    footerY -= i === 3 ? 18 : 13
  })
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}