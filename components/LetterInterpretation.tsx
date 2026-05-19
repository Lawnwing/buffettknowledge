import type { Interpretation } from '@/data/types'

interface LetterInterpretationProps {
  interpretation: Interpretation
}

const typeIcons: Record<string, string> = {
  'key-point': '📌',
  'background': '📖',
  'principle': '💡',
  'insight': '🎯',
  'quote': '💬',
}

const typeLabels: Record<string, string> = {
  'key-point': 'Key Point',
  'background': 'Background',
  'principle': 'Principle',
  'insight': 'Insight',
  'quote': 'Quote',
}

const marketPhaseLabels: Record<string, string> = {
  'bull': 'Bull Market',
  'bear': 'Bear Market',
  'recession': 'Recession',
  'stagflation': 'Stagflation',
  'recovery': 'Recovery',
}

export default function LetterInterpretation({
  interpretation,
}: LetterInterpretationProps) {
  return (
    <div className="letter-interpretation" style={{
      marginTop: '3rem',
      paddingTop: '2rem',
      borderTop: '2px solid #E6E2D9',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>
          📚
        </div>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#18181B',
            margin: 0,
            lineHeight: 1.2,
          }}>
            Letter Interpretation
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#71717A',
            margin: 0,
            marginTop: '0.25rem',
          }}>
            Analysis & Key Insights
          </p>
        </div>
      </div>

      {/* ── Market Context ─────────────────────────────── */}
      {interpretation.marketContext && (
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #E6E2D9',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
          }}>
            <span style={{ fontSize: '1rem' }}>📈</span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#2D6A4F',
            }}>Market Context</span>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.75rem',
            }}>
              {interpretation.marketContext.marketPhase && (
                <div style={{
                  background: 'rgba(45, 106, 79, 0.06)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: '#71717A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Market Phase</div>
                  <div style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#2D6A4F',
                    marginTop: '0.25rem',
                  }}>
                    {marketPhaseLabels[interpretation.marketContext.marketPhase] || interpretation.marketContext.marketPhase}
                  </div>
                </div>
              )}
              {interpretation.marketContext.sp500Return && (
                <div style={{
                  background: 'rgba(45, 106, 79, 0.06)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: '#71717A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>S&P 500</div>
                  <div style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#2D6A4F',
                    marginTop: '0.25rem',
                  }}>{interpretation.marketContext.sp500Return}</div>
                </div>
              )}
              {interpretation.marketContext.fedFundsRate && (
                <div style={{
                  background: 'rgba(45, 106, 79, 0.06)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: '#71717A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Fed Funds</div>
                  <div style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#2D6A4F',
                    marginTop: '0.25rem',
                  }}>{interpretation.marketContext.fedFundsRate}</div>
                </div>
              )}
              {interpretation.marketContext.inflation && (
                <div style={{
                  background: 'rgba(45, 106, 79, 0.06)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: '#71717A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Inflation</div>
                  <div style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#2D6A4F',
                    marginTop: '0.25rem',
                  }}>{interpretation.marketContext.inflation}</div>
                </div>
              )}
            </div>

            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.75,
              color: '#3F3F46',
              margin: 0,
              textAlign: 'justify',
              hyphens: 'auto',
            }}>
              {interpretation.marketContext.description}
            </p>
          </div>
        </div>
      )}

      {/* ── Key Numbers ────────────────────────────────── */}
      {interpretation.keyNumbers && interpretation.keyNumbers.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#18181B',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span>🔢</span> Key Numbers
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.75rem',
          }}>
            {interpretation.keyNumbers.map((num, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  border: '1px solid #E6E2D9',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#71717A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}>{num.label}</div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#2D6A4F',
                  lineHeight: 1.2,
                }}>
                  {num.value}
                  {num.unit && (
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#71717A',
                      marginLeft: '0.25rem',
                    }}>{num.unit}</span>
                  )}
                </div>
                {num.context && (
                  <div style={{
                    fontSize: '0.8125rem',
                    color: '#71717A',
                    marginTop: '0.5rem',
                    lineHeight: 1.5,
                  }}>{num.context}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Then vs Now ────────────────────────────────── */}
      {interpretation.thenVsNow && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#18181B',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span>⏳</span> Then vs Now
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {/* Then */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #E6E2D9',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#B45309',
                marginBottom: '0.75rem',
              }}>📅 Then</div>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                color: '#3F3F46',
                margin: 0,
                textAlign: 'justify',
                hyphens: 'auto',
              }}>
                {interpretation.thenVsNow.then}
              </p>
            </div>
            {/* Now */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #E6E2D9',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#2D6A4F',
                marginBottom: '0.75rem',
              }}>🌐 Now</div>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                color: '#3F3F46',
                margin: 0,
                textAlign: 'justify',
                hyphens: 'auto',
              }}>
                {interpretation.thenVsNow.now}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Overview ───────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.10) 0%, rgba(64, 145, 108, 0.06) 100%)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid rgba(45, 106, 79, 0.20)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}>
          <span style={{ fontSize: '1rem' }}>📝</span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#2D6A4F',
          }}>Overview</span>
        </div>
        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.8,
          color: '#3F3F46',
          margin: 0,
          textAlign: 'justify',
          hyphens: 'auto',
        }}>
          {interpretation.overview}
        </p>
      </div>

      {/* ── Key Takeaways ──────────────────────────────── */}
      {(interpretation.keyTakeaways || []).length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#18181B',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span>📌</span> Key Takeaways
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '0.75rem',
          }}>
            {(interpretation.keyTakeaways || []).map((takeaway, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  border: '1px solid #E6E2D9',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: '#3F3F46',
                }}
              >
                <span style={{
                  flexShrink: 0,
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#2D6A4F',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {index + 1}
                </span>
                <span style={{ textAlign: 'justify', hyphens: 'auto' }}>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Sections ───────────────────────────────────── */}
      {(interpretation.sections || []).length > 0 && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {(interpretation.sections || []).map((section, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #E6E2D9',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                {section.type && (
                  <span style={{ fontSize: '1.125rem' }}>
                    {typeIcons[section.type] || '📝'}
                  </span>
                )}
                <h4 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#18181B',
                  margin: 0,
                }}>
                  {section.title}
                </h4>
                {section.type && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'rgba(45, 106, 79, 0.1)',
                    color: '#2D6A4F',
                    borderRadius: '4px',
                    fontWeight: 500,
                  }}>
                    {typeLabels[section.type]}
                  </span>
                )}
              </div>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                color: '#3F3F46',
                margin: 0,
                textAlign: 'justify',
                hyphens: 'auto',
              }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
