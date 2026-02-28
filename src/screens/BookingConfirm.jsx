import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const MOCK_MATCH = {
  date:     'Saturday, 1 March',
  time:     'Evening · 7pm onwards',
  activity: 'Food & Drinks',
  group:    'Uni Friends',
}

const NEXT_BOOKER = 'Sarah'

export default function BookingConfirm() {
  const navigate  = useNavigate()
  const { state } = useLocation()
  const venue     = state?.venue ?? { name: 'The Botanist' }

  const [toast, setToast] = useState(false)

  const handleConfirm = () => {
    // Stub: schedule a follow-up notification in 30 mins to capture venue name async
    setTimeout(() => {
      console.log('[Nudge] +30 min notification: "Hey! Quick one — where did you end up booking? Drop the venue name so the group knows where to go."')
    }, 30 * 60 * 1000)
    navigate('/calendar-invite', { state: { venueName: venue.name } })
  }

  const handleCantBook = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  const openTableUrl = `https://www.opentable.com/s/?term=${encodeURIComponent(venue.name || '')}`

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/results" />
      </div>

      {/* Auto-dismiss toast */}
      {toast && (
        <div style={{
          position: 'absolute', top: 16, left: 16, right: 16,
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 16px',
          display: 'flex', gap: 10, alignItems: 'center',
          zIndex: 50,
          boxShadow: 'var(--shadow-md)',
        }}>
          <span style={{ color: 'var(--color-success-icon)', fontSize: 16 }}>✓</span>
          <p style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
            We've asked {NEXT_BOOKER} to book instead.
          </p>
        </div>
      )}

      {/* Header */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 56, lineHeight: 1 }}>🎯</div>
        <h1 style={{ marginTop: 16 }}>You're the booker this round!</h1>
        <p className="text-muted mt-8">
          Randomly assigned — next time it's someone else's turn.
        </p>
      </div>

      {/* Hangout summary card */}
      <div className="card" style={{ marginTop: 24, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <p className="text-sm text-muted mb-12">Your hangout</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <div>
              <p className="bold">{MOCK_MATCH.date}</p>
              <p className="text-sm text-muted">{MOCK_MATCH.time}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>🍹</span>
            <p className="bold">{MOCK_MATCH.activity}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>👥</span>
            <p className="bold">{MOCK_MATCH.group}</p>
          </div>
        </div>
      </div>

      {/* Info callout */}
      <div className="alert alert-warning" style={{ marginTop: 16 }}>
        <span>💡</span>
        <p style={{ fontSize: 13 }}>
          The group is waiting on you. Once you've booked, tap confirm below — no details needed right now.
        </p>
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button
          variant="secondary"
          onClick={() => window.open(openTableUrl, '_blank', 'noopener,noreferrer')}
        >
          Open OpenTable →
        </Button>

        <Button onClick={handleConfirm}>
          ✓ I've booked it
        </Button>

        <button
          onClick={handleCantBook}
          style={{
            background: 'none', border: 'none',
            color: 'var(--color-text-secondary)', fontSize: 13,
            cursor: 'pointer', textAlign: 'center',
            padding: '4px 0',
          }}
        >
          I can't book right now
        </button>
      </div>
    </Screen>
  )
}
