'use client'

import { useState } from 'react'
import { syncLedenToMailerLite, type SyncResult } from './syncActions'

export default function SyncButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<SyncResult | null>(null)

  async function handleSync() {
    setStatus('loading')
    setResult(null)
    try {
      const res = await syncLedenToMailerLite()
      setStatus(res.success ? 'success' : 'error')
      setResult(res)
    } catch {
      setStatus('error')
      setResult({
        success: false,
        synced: 0,
        skipped: 0,
        errors: 0,
        message: 'Er ging iets mis. Probeer het opnieuw.',
      })
    }
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        onClick={handleSync}
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-body3 bg-forest text-white hover:bg-[#6a8822] active:scale-95 rounded-full font-dm-sans font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {status === 'loading' ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Bezig met syncen…
          </>
        ) : (
          'Sync naar MailerLite'
        )}
      </button>

      {result && (
        <p className={`text-body3 font-dm-sans ${result.success ? 'text-forest' : 'text-sienna'}`}>
          {result.success ? '✓ ' : '✗ '}{result.message}
        </p>
      )}
    </div>
  )
}
