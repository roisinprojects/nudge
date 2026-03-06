import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MEMBERS = ['Sarah', 'Tom', 'Jess', 'Mike', 'You']

const CONFETTI_COLOURS = ['#E85D4D', '#A88FA0', '#6BB6A0', '#D4A574', '#8B8680']

function ConfettiBurst() {
  const fired = useRef(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const container = containerRef.current
    if (!container) return

    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div')
      piece.className = 'confetti-piece'

      const colour = CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)]
      const left   = Math.random() * 100
      const delay  = Math.random() * 0.6
      const dur    = 1.8 + Math.random() * 0.7
      const width  = 6 + Math.random() * 6
      const height = 8 + Math.random() * 6

      piece.style.cssText = `
        left: ${left}%;
        width: ${width}px;
        height: ${height}px;
        background: ${colour};
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `
      container.appendChild(piece)

      // Clean up after animation
      setTimeout(() => piece.remove(), (dur + delay) * 1000 + 200)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  )
}

export default function CalendarInvite() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  const venueName     = state?.venueName     || 'The Botanist'
  const confirmedTime = state?.confirmedTime || '7pm'
  const date          = state?.match?.date     || 'Saturday, 1 March 2026'

  return (
    <Screen style={{ paddingBottom: 40, position: 'relative' }}>
      <ConfettiBurst />

      {/* Heading block — centred */}
      <div style={{ marginTop: 32, textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ color: 'var(--ink-primary)' }}>It's happening! 🎉</h1>
        <p className="text-muted mt-8">Calendar invites are on their way to everyone.</p>
      </div>

      {/* Hangout summary card */}
      <div className="card">
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Your hangout
        </p>

        <div style={{ height: 1, background: 'var(--border-default)', margin: '10px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: 13 }}>
          <span style={{ color: 'var(--ink-muted)' }}>Date</span>
          <span style={{ fontWeight: 600 }}>{date} · {confirmedTime}</span>
        </div>

        <div style={{ height: 1, background: 'var(--border-default)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: 13 }}>
          <span style={{ color: 'var(--ink-muted)' }}>Venue</span>
          <span style={{ fontWeight: 600 }}>{venueName}</span>
        </div>

        <div style={{ height: 1, background: 'var(--border-default)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: 13 }}>
          <span style={{ color: 'var(--ink-muted)' }}>Guests</span>
          <span style={{ fontWeight: 600 }}>{MEMBERS.join(' · ')}</span>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button onClick={() => {}}>Add to calendar</Button>
        <Button variant="ghost" onClick={() => navigate('/home')}>Back to home</Button>
      </div>
    </Screen>
  )
}
