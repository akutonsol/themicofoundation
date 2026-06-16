import { Suspense } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import DonateResultPage from "@/components/shared/DonateResultPage"

export const dynamic = 'force-dynamic'

export default function ResultPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
          <DonateResultPage />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
