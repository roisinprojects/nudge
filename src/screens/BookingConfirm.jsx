import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

export default function BookingConfirm() {
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    return (
      <Screen>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 24 }}>
          <div
            style={{
              width: 80, height: 80,
              borderRadius: '50%',
              background: 'rgba(107,182,160,0.15)',
              border: '2px solid var(--success)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36,
            }}
          >
            🎉
          </div>
          <div>
            <h1 style={{ color: 'var(--success)' }}>It's booked!</h1>
            <p className="text-muted mt-8">
              The Botanist is locked in. Calendar invites are on their way to everyone now.
            </p>
          </div>
          <div className="card" style={{ width: '100%', textAlign: 'left', border: '1.5px solid #2a2a2a' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <span>📅</span>
                <span className="text-sm">Saturday 1 March · Evening</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span>📍</span>
                <span className="text-sm">The Botanist, 7 Exchange Square, London</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span>👥</span>
                <span className="text-sm">5 people · The Crew</span>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate('/calendar-invite')}>
            View calendar invite
          </Button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/results" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Confirm your booking</h1>
        <p className="text-muted mt-8">
          You've been randomly assigned as booker for this round. Head to OpenTable, complete the reservation, then come back here.
        </p>
      </div>

      <div className="card" style={{ marginTop: 24, border: '1.5px solid #2a2a2a' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div
            style={{
              width: 52, height: 52,
              background: 'var(--surface2)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, flexShrink: 0,
            }}
          >
            🌿
          </div>
          <div>
            <p className="bold">The Botanist</p>
            <p className="text-sm text-muted">Cocktail Bar & Restaurant</p>
            <p className="text-sm mt-8">⭐ 4.6 · ££ · 0.3 miles</p>
          </div>
        </div>

        <div className="divider" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>📅</span>
            <span className="text-sm">Saturday 1 March · Evening (7pm+)</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>👥</span>
            <span className="text-sm">5 people</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button variant="secondary" onClick={() => {}}>
          Open OpenTable →
        </Button>

        <div className="divider" />

        <p className="text-sm text-muted text-center">Once you've completed the reservation on OpenTable:</p>

        <Button onClick={() => setConfirmed(true)}>
          I've booked it ✓
        </Button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="alert alert-warning">
          <span>⏰</span>
          <p className="text-sm">Please confirm within 24 hours — otherwise the group will be notified to pick again.</p>
        </div>
      </div>
    </Screen>
  )
}
