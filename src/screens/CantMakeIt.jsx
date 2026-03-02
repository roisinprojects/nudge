import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Icon from '../components/Icon'

const MOCK_EVENT = {
  day:      'Saturday, 15 March',
  time:     '7pm',
  venue:    'The Ivy',
  cuisine:  'Modern European',
  partySize: 4,
  venuePhone: 'tel:+44207123456',
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
            background: 'var(--semantic-warning-bg)',
            border: '1px solid var(--semantic-warning-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="sentiment_dissatisfied" size={40} style={{ color: 'var(--semantic-warning)' }} />
          </div>
          <div>
            <h2>Got it, we'll let them know</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              The booker has been notified. Hopefully we can catch you next time!
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
        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
          Let the booker know so they can adjust the reservation.
        </p>
      </div>

      {/* Event summary */}
      <div className="card" style={{ marginTop: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          You're cancelling
        </p>
        <p style={{ fontWeight: 600, fontSize: 16 }}>{MOCK_EVENT.day}</p>
        <p style={{ color: 'var(--ink-secondary)', fontSize: 14, marginTop: 4 }}>
          {MOCK_EVENT.time} · {MOCK_EVENT.venue}
        </p>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => window.open(MOCK_EVENT.venuePhone, '_self')}>
          Contact {MOCK_EVENT.venue}
        </Button>
        <Button variant="ghost" onClick={handleCancel}>
          Got it
        </Button>
      </div>
    </Screen>
  )
}
