import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Icon from '../components/Icon'

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
  const venueAddress  = state?.venueAddress  || ''
  const confirmedTime = state?.confirmedTime || '7pm'
  const date          = state?.match?.date     || 'Saturday, 1 March 2026'
  const activity      = state?.match?.activity || 'Food & Drinks'
  const group         = state?.match?.group    || 'The Crew'

  const locationLine  = venueAddress || venueName

  return (
    <Screen style={{ paddingBottom: 40, position: 'relative' }}>
      <ConfettiBurst />

      {/* Success header */}
      <div style={{ paddingTop: 56, textAlign: 'center' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--semantic-success-bg)',
            border: '2px solid var(--semantic-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <Icon name="check_circle" size={40} style={{ color: 'var(--semantic-success)' }} />
        </div>
        <h1 style={{ color: 'var(--semantic-success)', marginTop: 16 }}>It's happening! 🎉</h1>
        <p className="text-muted mt-8">
          Calendar invites are on their way to everyone.
        </p>
      </div>

      {/* Calendar invite card */}
      <div className="card" style={{ marginTop: 32, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'var(--ink-primary)', padding: '16px' }}>
          <p className="text-xs" style={{ color: 'var(--btn-primary-fg)', opacity: 0.7, marginBottom: 4 }}>
            CALENDAR INVITE
          </p>
          <p className="bold" style={{ fontSize: 18, color: 'var(--btn-primary-fg)' }}>
            {group} hangout 🎉
          </p>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Icon name="event" size={18} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
            <div>
              <p className="bold text-sm">{date}</p>
              <p className="text-xs text-muted">{confirmedTime}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Icon name="location_on" size={18} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
            <div>
              <p className="bold text-sm">{venueName}</p>
              {venueAddress
                ? <p className="text-xs text-muted">{venueAddress}</p>
                : <p className="text-xs text-muted">{activity}</p>
              }
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Icon name="group" size={18} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="bold text-sm">Guests</p>
              <p className="text-xs text-muted mt-8">{MEMBERS.join(' · ')}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => navigate('/home')}>
          Back to home
        </Button>
        <p className="text-center text-xs text-muted">
          Your next nudge will be sent in 6 weeks.
        </p>
      </div>
    </Screen>
  )
}
