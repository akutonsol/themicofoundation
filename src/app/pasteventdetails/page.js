import { Suspense } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import EventDetailPage from "@/components/news/EventDetailPage"
 
export default function PastEventPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <EventDetailPage />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
 