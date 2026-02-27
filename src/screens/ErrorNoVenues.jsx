import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MATCH = {
  date: 'Saturday, 1 March',
  time: '7pm',
  activity: 'Food & Drinks',
  people: 5,
  group: 'The Crew',
}

export default function ErrorNoVenues() {
  const navigate = useNavigate()
  const [showManual, setShowManual] = useState(false)

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 56 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52 }}>🔍</div>
          <h1 style={{ marginTop: 16 }}>We found a time but…</h1>
          <p className="text-muted mt-8">
            No restaurants are available on OpenTable for your matched slot.
          </p>
        </div>

        {/* Error box */}
        <div
          style={{
            background: 'rgba(200,92,60,0.1)',
            border: '1px solid rgba(200,92,60,0.3)',
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
          }}
        >
          <p className="text-sm bold" style={{ color: 'var(--error)' }}>No availability found</p>
          <p className="text-sm mt-8" style={{ color: 'var(--text-muted)' }}>
            {MATCH.date} · {MATCH.time} · {MATCH.activity} — nothing on OpenTable within 2 miles.
          </p>
        </div>

        {/* Options card */}
        <div className="card" style={{ border: '1.5px solid #2a2a2a' }}>
          <p className="text-sm text-muted mb-12">What you can do</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span>🔄</span>
              <p className="text-sm">Try a <span className="bold">second matched time</span> if one exists.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <span>📍</span>
              <p className="text-sm">Expand search radius to <span className="bold">5 miles</span>.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <span>✍️</span>
              <p className="text-sm">Book <span className="bold">manually</span> using the details below.</p>
            </div>
          </div>
        </div>

        {/* Manual booking panel */}
        {showManual ? (
          <div
            style={{
              background: 'rgba(107,182,160,0.08)',
              border: '1px solid rgba(107,182,160,0.3)',
              borderRadius: 'var(--radius)',
              padding: '16px',
            }}
          >
            <p className="text-sm bold" style={{ color: 'var(--success)' }}>Manual booking details</p>
            <p className="text-sm text-muted mt-8 mb-12">
              Share this with your booker, or search OpenTable directly:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 14 }}>📅</span>
                <span className="text-sm">{MATCH.date}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 14 }}>⏰</span>
                <span className="text-sm">{MATCH.time} (Evening)</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 14 }}>🍽️</span>
                <span className="text-sm">{MATCH.activity}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 14 }}>👥</span>
                <span className="text-sm">{MATCH.people} people · {MATCH.group}</span>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button onClick={() => navigate('/booking-confirm')}>
                I've found a venue →
              </Button>
            </div>
          </div>
        ) : null}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => navigate('/results')}>
            Try a different time
          </Button>
          <Button variant="secondary" onClick={() => setShowManual(v => !v)}>
            {showManual ? 'Hide manual booking' : 'Book manually'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Try next cycle
          </Button>
        </div>

        <p className="text-center text-xs text-muted" style={{ marginTop: -8 }}>
          Next nudge: in 6 weeks
        </p>
      </div>
    </Screen>
  )
}
