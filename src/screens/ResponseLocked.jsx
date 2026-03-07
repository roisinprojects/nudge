import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Icon from '../components/Icon'

const TIME_LABELS    = { lunch: '11am – 3pm', evening: '5pm – 9pm', late: '9pm+' }
const ACTIVITY_LABELS = { food: 'Food', food_drinks: 'Food + Drinks', drinks: 'Drinks', suggest: 'Flexible' }

const GROUP_COLOUR = 'var(--group-lavender)'

export default function ResponseLocked() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  // Build display rows from real state, or fall back to mock data
  const slots = state?.dates
    ? state.dates.map(d => {
        const timeId = state.times?.[d.date]
        const timeRange = timeId ? TIME_LABELS[timeId] : ''
        return { label: d.fmtDate, time: timeRange }
      })
    : [
        { label: 'Saturday, 1 March', time: '5pm – 9pm' },
        { label: 'Friday, 7 March',   time: '9pm+' },
        { label: 'Sunday, 9 March',   time: '11am – 3pm' },
      ]

  const activityDisplay = state?.activities?.length
    ? state.activities.map(id => ACTIVITY_LABELS[id] ?? id).join(' · ')
    : 'Drinks · Food + Drinks'

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 24 }}>
        <h1>You're locked in!</h1>
        <p className="text-muted mt-16">
          All saved. We'll match everyone up as responses come in and send you results within 48 hours.
        </p>

        <div
          className="card"
          style={{ marginTop: 32, width: '100%', textAlign: 'left' }}
        >
          {/* Group name */}
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-muted)', marginBottom: 10 }}>
            Uni Friends
          </p>

          {/* Dates section */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Your dates
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {slots.map((slot, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-primary)' }}>{slot.label}</p>
                  <p style={{ fontSize: 16, color: 'var(--ink-secondary)', marginTop: 2 }}>{slot.time}</p>
                </div>
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
            <span className="text-sm">{activityDisplay}</span>
          </div>
        </div>

        <div className="alert alert-success" style={{ marginTop: 24, width: '100%' }}>
          <Icon name="lock" size={16} style={{ color: 'var(--semantic-success)', flexShrink: 0 }} />
          <p className="text-sm">Responses are locked to keep it fair — no one can backtrack based on seeing others' picks.</p>
        </div>
      </div>

      {/* ── Sticky footer ── */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'var(--bg-primary)',
        padding: '16px 16px 32px',
        margin: '0 -16px',
        borderTop: '1px solid var(--border-default)',
        marginTop: 16,
      }}>
        <Button onClick={() => navigate('/home')}>
          Back to home
        </Button>
      </div>
    </Screen>
  )
}
