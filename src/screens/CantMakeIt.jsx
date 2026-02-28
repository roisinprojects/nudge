import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const MOCK_EVENT = {
  day:      'Saturday, 15 March',
  time:     '7pm',
  venue:    'The Ivy',
  cuisine:  'Modern European',
  partySize: 4,
}

export default function CantMakeIt() {
  const navigate = useNavigate()
  const [cancelled, setCancelled] = useState(false)

  const handleCancel = () => {
    setCancelled(true)
  }

  if (cancelled) {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton to="/group-detail" />
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 16,
          paddingBottom: 40,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32,
          }}>
            😔
          </div>
          <div>
            <h2>Got it, we'll let them know</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              The booker has been notified. Hopefully we can catch you next time!
            </p>
          </div>
          <div className="alert alert-warning" style={{ marginTop: 8, textAlign: 'left' }}>
            <span>💡</span>
            <p style={{ fontSize: 13 }}>
              If there's a venue cancellation fee, remind the booker to contact The Ivy with your confirmation number.
            </p>
          </div>
          <Button onClick={() => navigate('/home')} style={{ marginTop: 8 }}>
            Back to home
          </Button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/group-detail" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Can't make it?</h1>
      </div>

      {/* Event summary */}
      <div style={{
        marginTop: 24,
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <p style={{ fontSize: 13, color: 'var(--taupe)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
          You're cancelling
        </p>
        <p style={{ fontWeight: 600, fontSize: 16 }}>{MOCK_EVENT.day}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
          {MOCK_EVENT.time} · {MOCK_EVENT.venue}
        </p>
        <p style={{ fontSize: 13, color: 'var(--taupe)', marginTop: 2 }}>
          {MOCK_EVENT.cuisine} · {MOCK_EVENT.partySize} people
        </p>
      </div>

      {/* Empathetic message */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)' }}>
          Let the booker know so they can adjust the reservation. Some venues charge for no-shows, so it's important to tell us!
        </p>
      </div>

      <div className="alert alert-warning" style={{ marginTop: 20 }}>
        <span>⚠️</span>
        <p style={{ fontSize: 13 }}>
          No reason needed — just one tap. The group will be notified.
        </p>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button variant="primary" onClick={handleCancel}>
          Cancel attendance
        </Button>
        <Button variant="ghost" onClick={() => navigate('/group-detail')}>
          Go back
        </Button>
      </div>
    </Screen>
  )
}
