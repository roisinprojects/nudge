import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Icon from '../components/Icon'

const MOCK_EVENT = {
  day:        'Saturday, 15 March',
  time:       '7pm',
  venue:      'The Ivy',
  cuisine:    'Modern European',
  confirmNum: '12345',
  totalSize:  4,
  venuePhone: 'tel:+44207123456',
}

const MOCK_CANCELLATIONS = ['Alex', 'Jordan']

export default function MultipleCancellations() {
  const navigate = useNavigate()

  const remaining = MOCK_EVENT.totalSize - MOCK_CANCELLATIONS.length

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/home" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Heads up</h1>
        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
          {MOCK_CANCELLATIONS.length} people can't make it — you're now a party of {remaining}.
        </p>
      </div>

      {/* Event summary */}
      <div className="card" style={{ marginTop: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Your booking
        </p>
        <p style={{ fontWeight: 600 }}>{MOCK_EVENT.venue}</p>
        <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginTop: 4 }}>
          {MOCK_EVENT.day} · {MOCK_EVENT.time}
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4 }}>
          Confirmation: #{MOCK_EVENT.confirmNum}
        </p>
      </div>

      {/* Who cancelled */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MOCK_CANCELLATIONS.map(name => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="person_off" size={16} style={{ color: 'var(--semantic-error)', flexShrink: 0 }} />
            <p className="text-sm"><strong>{name}</strong> can't attend</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => window.open(MOCK_EVENT.venuePhone, '_self')}>
          Contact the venue
        </Button>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Got it
        </Button>
      </div>
    </Screen>
  )
}
