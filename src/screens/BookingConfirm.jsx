import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Input from '../components/Input'

const MOCK_MATCH = {
  date:        'Saturday, 1 March',
  time:        'Evening · 7pm onwards',
  matchedTime: '19:00',
  timePeriod:  'Evening (5pm–9pm)',
  activity:    'Food & Drinks',
  group:       'Uni Friends',
}

const NEXT_BOOKER = 'Sarah'

export default function BookingConfirm() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  const provisionalVenue = state?.provisionalVenue ?? null
  const match            = state?.match            ?? MOCK_MATCH

  // true when provisional exists but booker tapped "did you book somewhere else?"
  const [overrideVenue,   setOverrideVenue]   = useState(false)
  const [manualVenueName, setManualVenueName] = useState('')
  const [toast,           setToast]           = useState(false)

  // Which venue is currently "active" for the flow
  const usingProvisional = !!(provisionalVenue && !overrideVenue)
  const currentVenueName = usingProvisional ? provisionalVenue.name : manualVenueName.trim()
  const canProceed       = !!currentVenueName

  const openTableUrl = usingProvisional
    ? provisionalVenue.url
    : manualVenueName.trim()
      ? `https://www.opentable.com/s/?term=${encodeURIComponent(manualVenueName.trim())}`
      : 'https://www.opentable.com'

  const handleBooked = () => {
    navigate('/time-confirm', {
      state: {
        venue: {
          name:    currentVenueName,
          address: usingProvisional ? provisionalVenue.address : '',
        },
        match,
      },
    })
  }

  const handleCantBook = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/results" />
      </div>

      {/* Auto-dismiss reassignment toast */}
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
              <p className="bold">{match.date}</p>
              <p className="text-sm text-muted">{match.time}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>🍹</span>
            <p className="bold">{match.activity}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>👥</span>
            <p className="bold">{match.group}</p>
          </div>
          {/* Venue line */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>📍</span>
            {usingProvisional ? (
              <p className="bold">{provisionalVenue.name}</p>
            ) : (
              <p className="text-muted" style={{ fontStyle: 'italic' }}>Venue TBC</p>
            )}
          </div>
        </div>
      </div>

      {/* Venue context — shown when provisional venue is set and not overriding */}
      {usingProvisional && (
        <p style={{ marginTop: 10, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          We'll use {provisionalVenue.name} for the calendar invite —{' '}
          <span
            style={{ color: 'var(--color-primary-500)', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => { setOverrideVenue(true); setManualVenueName('') }}
          >
            did you book somewhere else?
          </span>
        </p>
      )}

      {/* Manual venue input — shown when no provisional, or after override */}
      {(!provisionalVenue || overrideVenue) && (
        <div style={{ marginTop: 16 }}>
          <Input
            label="Where did you book?"
            placeholder="e.g. The Ivy"
            value={manualVenueName}
            onChange={e => setManualVenueName(e.target.value)}
          />
        </div>
      )}

      {/* Info callout */}
      <div className="alert alert-warning" style={{ marginTop: 16 }}>
        <span>💡</span>
        <p style={{ fontSize: 13 }}>
          The group is waiting on you. Once you've booked, tap confirm below.
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

        <Button disabled={!canProceed} onClick={handleBooked}>
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
