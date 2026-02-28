import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Input from '../components/Input'

const MATCH = {
  date: 'Saturday, 1 March',
  time: 'Evening (7pm onwards)',
  activity: 'Food & Drinks',
  people: 5,
}

export default function BookingConfirm() {
  const navigate  = useNavigate()
  const { state } = useLocation()
  const venue     = state?.venue ?? null

  const [venueName,      setVenueName]      = useState(venue?.name ?? '')
  const [confirmationNum, setConfirmationNum] = useState('')
  const [submitError,    setSubmitError]    = useState(false)

  const handleConfirm = () => {
    setSubmitError(false)
    navigate('/calendar-invite', { state: { venueName: venueName.trim() } })
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/results" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Confirm the booking</h1>
        <p className="text-muted mt-8">
          Did you complete the reservation on OpenTable? Fill in the details below.
        </p>
      </div>

      {/* Selected venue preview */}
      {venue && (
        <div className="card" style={{ marginTop: 24, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 44,
                height: 44,
                background: 'var(--surface2)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {venue.img}
            </div>
            <div>
              <p className="bold">{venue.name}</p>
              <p className="text-sm text-muted">{venue.type}</p>
              <p className="text-xs mt-8">⭐ {venue.rating} · {venue.price} · {venue.distance}</p>
            </div>
          </div>

          <div className="divider" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 14 }}>📅</span>
              <span className="text-sm">{MATCH.date} · {MATCH.time}</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 14 }}>🍽️</span>
              <span className="text-sm">{MATCH.activity}</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 14 }}>👥</span>
              <span className="text-sm">{MATCH.people} people</span>
            </div>
          </div>
        </div>
      )}

      {/* Open OpenTable prompt */}
      <div style={{ marginTop: 24 }}>
        <div className="alert alert-warning">
          <span>🔗</span>
          <div>
            <p className="text-sm bold" style={{ color: 'var(--warning)' }}>
              Haven't booked yet?
            </p>
            <p className="text-sm" style={{ color: 'var(--warning)' }}>
              Head to OpenTable first, then come back here to confirm.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <Button
            variant="secondary"
            onClick={() => window.open('https://www.opentable.com', '_blank', 'noopener,noreferrer')}
          >
            Open OpenTable →
          </Button>
        </div>
      </div>

      {/* Confirmation inputs */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="divider" style={{ margin: 0 }} />
        <p className="text-sm text-muted">Once you've completed the reservation:</p>

        <Input
          label="What venue did you book?"
          placeholder="e.g. The Botanist"
          value={venueName}
          onChange={e => setVenueName(e.target.value)}
        />

        <Input
          label="OpenTable confirmation # (optional)"
          placeholder="e.g. 12345"
          value={confirmationNum}
          onChange={e => setConfirmationNum(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button disabled={!venueName.trim()} onClick={handleConfirm}>
          Yes, I've booked ✓
        </Button>
        {submitError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--color-error-icon)', fontSize: 14 }}>⚠</span>
            <p style={{ fontSize: 13, color: 'var(--color-error-text)' }}>
              Something went wrong — try again
            </p>
          </div>
        )}
      </div>
    </Screen>
  )
}
