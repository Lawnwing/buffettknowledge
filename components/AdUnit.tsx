'use client'

import { useEffect, useRef } from 'react'

// AdSense ad slot configuration
interface AdUnitProps {
  /** Your AdSense publisher ID (e.g. ca-pub-XXXXXXXX) */
  client?: string
  /** AdSense ad slot ID (e.g. XXXXXXXXXX) */
  slot?: string
  /** Ad format */
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'auto'
  /** Display variant */
  variant?: 'header' | 'sidebar' | 'inline' | 'footer'
  className?: string
}

const VARIANT_STYLES: Record<string, React.CSSProperties> = {
  header: {
    display: 'block',
    minHeight: '90px',
    textAlign: 'center',
  },
  sidebar: {
    display: 'block',
    minHeight: '250px',
    textAlign: 'center',
  },
  inline: {
    display: 'block',
    minHeight: '250px',
    textAlign: 'center',
  },
  footer: {
    display: 'block',
    minHeight: '90px',
    textAlign: 'center',
  },
}

const PLACEHOLDER_MESSAGES: Record<string, string> = {
  header: 'Advertisement (Header)',
  sidebar: 'Advertisement (Sidebar)',
  inline: 'Sponsored Content',
  footer: 'Advertisement (Footer)',
}

export function AdUnit({
  client = 'ca-pub-XXXXXXXX',
  slot = 'XXXXXXXX',
  format = 'auto',
  variant = 'inline',
  className,
}: AdUnitProps) {
  const insRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Push ad request when component mounts
    try {
      // @ts-ignore
      if (window.adsbygoogle) {
        // @ts-ignore
        window.adsbygoogle.push({})
      }
    } catch {
      // AdSense not loaded yet — ignore
    }
  }, [])

  const style = VARIANT_STYLES[variant] ?? VARIANT_STYLES.inline

  // Show placeholder when client is still the placeholder value
  const isPlaceholder = client === 'ca-pub-XXXXXXXX' || !client

  if (isPlaceholder) {
    return (
      <div
        ref={insRef}
        className={`ad-unit-placeholder ${className ?? ''}`}
        style={{
          ...style,
          backgroundColor: '#F1F5F9',
          border: '1px dashed #CBD5E1',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: variant === 'inline' ? '1.5rem 0' : '0.75rem 0',
        }}
      >
        <span style={{ color: '#94A3B8', fontSize: '12px', fontFamily: 'var(--font-inter, sans-serif)' }}>
          {PLACEHOLDER_MESSAGES[variant]}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={insRef}
      className={`ad-unit ${className ?? ''}`}
      style={{
        margin: variant === 'inline' ? '1.5rem 0' : '0.75rem 0',
        lineHeight: '0',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
