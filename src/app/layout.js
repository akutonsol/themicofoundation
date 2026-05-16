import './globals.css'

export const metadata = {
  title: 'Mico Foundation',
  description: 'Together For Better Education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, sans-serif" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}