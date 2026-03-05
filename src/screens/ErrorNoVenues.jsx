import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MATCH = {
  date:     'Saturday, 1 March',
  time:     '7pm',
  activity: 'Food & Drinks',
  people:   5,
  group:    'The Crew',
}

export default function ErrorNoVenues() {
  const navigate = useNavigate()
  const [showManual, setShowManual] = useState(false)

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 24 }}>
        <div className="alert alert-error">
          <span>✕</span>
          <span>No venues available for your matched slot</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1>We found a time but…</h1>
          <p className="text-muted mt-8">
            No restaurants are available on OpenTable for your matched slot.
          </p>
        </div>

        {/* Error summary */}
        <div className="alert alert-error" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <p className="text-sm bold">No availability found</p>
          <p className="text-sm mt-8">
            {MATCH.date} · {MATCH.time} · {MATCH.activity} — nothing on OpenTable within 2 miles.
          </p>
        </div>

        {/* Manual booking panel */}
        {showManual && (
          <div className="alert alert-success" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <p className="text-sm bold">Manual booking details</p>
            <p className="text-sm text-muted mt-8 mb-12">
              Share this with your booker, or search OpenTable directly:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <Icon name="event" size={14} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm">{MATCH.date}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Icon name="schedule" size={14} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm">{MATCH.time} (Evening)</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Icon name="restaurant" size={14} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm">{MATCH.activity}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Icon name="group" size={14} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm">{MATCH.people} people · {MATCH.group}</span>
              </div>
            </div>
            <div style={{ marginTop: 16, width: '100%' }}>
              <Button onClick={() => navigate('/booking-confirm')}>
                I've found a venue
              </Button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => navigate('/results')}>
            Try a different time
          </Button>
          <Button variant="secondary" onClick={() => navigate('/results')}>
            Expand search radius to 5 miles
          </Button>
          <Button variant="ghost" onClick={() => setShowManual(v => !v)}>
            {showManual ? 'Hide manual booking' : 'Book manually'}
          </Button>
        </div>
      </div>
    </Screen>
  )
}
