'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function DonateCallbackContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const spiToken = searchParams.get('SpiToken') || searchParams.get('spiToken')
    if (spiToken) {
      window.parent.location = `/donate-result?spiToken=${encodeURIComponent(spiToken)}&status=3ds_complete`
    } else {
      window.parent.location = '/donate-result?status=error'
    }
  }, [searchParams])

  return <div style={{ display: 'none' }} />
}

export default function DonateCallbackPage() {
  return (
    <Suspense fallback={<div />}>
      <DonateCallbackContent />
    </Suspense>
  )
}