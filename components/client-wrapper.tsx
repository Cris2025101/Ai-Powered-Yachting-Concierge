"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports
const DynamicChatInterface = dynamic(() => import('./chat-interface').then(mod => mod.ChatInterface), {
  loading: () => <div className="loading-placeholder">Loading chat...</div>
})

const DynamicGlassHeader = dynamic(() => import('./GlassHeader'), {
  loading: () => <div className="loading-placeholder">Loading header...</div>
})

export function ClientWrapper({ children }: { children: React.ReactNode }) {
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