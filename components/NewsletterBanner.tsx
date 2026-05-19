'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <section
      className="rounded-2xl p-8 sm:p-10"
      style={{ backgroundColor: '#2D6A4F' }}
    >
      <div className="max-w-xl mx-auto text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Get Buffett Insights Monthly
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
          One key insight from Buffett&apos;s letters, delivered to your inbox every month.
          No spam. Unsubscribe anytime.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-white">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">You&apos;re subscribed! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                placeholder="your@email.com"
                className={`w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all ${
                  status === 'error'
                    ? 'border-2 border-red-300 bg-white/5 text-white placeholder:text-red-300 focus:ring-2 focus:ring-red-400'
                    : 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/40'
                }`}
              />
              {status === 'error' && (
                <div className="flex items-center gap-1 mt-1.5 text-red-300 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  Please enter a valid email address.
                </div>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors"
              style={{ backgroundColor: '#F9F7F3', color: '#1B4332' }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Join <span className="font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>2,400+</span> value investors
        </p>
      </div>
    </section>
  )
}
