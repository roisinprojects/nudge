import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const TIME_LABELS    = { lunch: 'Lunch', evening: 'Evening', late: 'Late' }
const ACTIVITY_LABELS = { food: 'Food', food_drinks: 'Food + Drinks', drinks: 'Drinks', suggest: 'Flexible' }

export default function ResponseLocked() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  // Build display rows from real state, or fall back to plausible mock data
  const slots = state?.dates
    ? state.dates.map(d => `${d.fmtDate} · ${TIME_LABELS[state.times?.[d.date]] ?? ''}`)
    : ['Sat 1 Mar · Evening', 'Fri 7 Mar · Late', 'Sun 9 Mar · Lunch']

  const activityDisplay = state?.activities?.length
    ? state.activities.map(id => ACTIVITY_LABELS[id] ?? id).join(' · ')
    : 'Drinks · Food + Drinks'

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 40 }}>
        <div
          style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'var(--semantic-success-bg)',
            border: '2px solid var(--semantic-success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36,
            marginBottom: 24,
          }}
        >
          ✓
        </div>

        <h1 style={{ color: 'var(--semantic-success)' }}>You're locked in!</h1>
        <p className="text-muted mt-16">
          All saved. We'll match everyone up as responses come in and send you results within 48 hours.
        </p>

        <div
          className="card"
          style={{ marginTop: 32, width: '100%', textAlign: 'left' }}
        >
          {/* Dates section */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Your dates
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {slots.map((slot, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>📅</span>
                <span className="text-sm">{slot}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border-default)', margin: '14px 0' }} />

          {/* Vibe section */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Your vibe
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🍸</span>
            <span className="text-sm">{activityDisplay}</span>
          </div>
        </div>

        <div className="alert alert-success" style={{ marginTop: 24, width: '100%' }}>
          <span>🔒</span>
          <p className="text-sm">Responses are locked to keep it fair — no one can backtrack based on seeing others' picks.</p>
        </div>
      </div>

      <div style={{ paddingBottom: 40 }}>
        <Button onClick={() => navigate('/waiting')}>
          See who's responded
        </Button>
      </div>
    </Screen>
  )
}
