"use client"

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'

// Dynamic imports
const DynamicChatInterface = dynamic(() => import('./chat-interface').then(mod => mod.ChatInterface), {
  loading: () => <div className="loading-placeholder">Loading chat...</div>,
  ssr: false
})

const DynamicGlassHeader = dynamic(() => import('./GlassHeader'), {
  loading: () => <div className="loading-placeholder">Loading header...</div>,
  ssr: false
})

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Suspense fallback={<div className="loading-placeholder">Loading header...</div>}>
        <DynamicGlassHeader />
      </Suspense>
      {children}
      <Suspense fallback={<div className="loading-placeholder">Loading chat...</div>}>
        <DynamicChatInterface />
      </Suspense>
    </>
  )
} 