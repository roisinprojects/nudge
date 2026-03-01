import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const GROUP_COLOUR = 'var(--group-lavender)'

const MOCK_GROUP = {
  name: 'Uni Friends',
}

const MOCK_MEMBERS = [
  { name: 'Alex',   initial: 'A' },
  { name: 'Jordan', initial: 'J' },
  { name: 'Priya',  initial: 'P' },
  { name: 'Róisín', initial: 'R', isYou: true },
]

const MOCK_STATS = {
  lastHangout: '28 Jan 2026',
  cycle:       'Every 6 weeks',
  status:      'Respond now',
}

const STAT_ROWS = [
  { label: 'Last hangout', value: MOCK_STATS.lastHangout },
  { label: 'Cycle',        value: MOCK_STATS.cycle       },
  { label: 'Status',       value: MOCK_STATS.status      },
]

export default function GroupDetail() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {/* Top bar */}
      <div style={{ paddingTop: 48, display: 'flex', alignItems: 'center', position: 'relative' }}>
        <BackButton to="/home" />
        <p style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: 15, fontWeight: 700, color: 'var(--ink-primary)',
          whiteSpace: 'nowrap',
        }}>
          {MOCK_GROUP.name}
        </p>
      </div>

      {/* Group name with colour dot */}
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: GROUP_COLOUR, flexShrink: 0,
        }} />
        <h1>{MOCK_GROUP.name}</h1>
      </div>

      {/* Avatar row */}
      <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {MOCK_MEMBERS.map(m => (
          <div key={m.name} className="avatar" title={m.isYou ? `${m.name} (You)` : m.name}>
            {m.initial}
          </div>
        ))}
      </div>

      {/* Stats card */}
      <div
        className="card"
        style={{ marginTop: 20, borderLeft: `3px solid ${GROUP_COLOUR}`, padding: 0 }}
      >
        {STAT_ROWS.map((row, i) => (
          <div key={row.label}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px',
            }}>
              <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{row.label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-primary)' }}>{row.value}</p>
            </div>
            {i < STAT_ROWS.length - 1 && (
              <div style={{ height: 1, background: 'var(--border-default)' }} />
            )}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button
          variant="group"
          style={{ '--group-color': GROUP_COLOUR }}
          onClick={() => navigate('/respond')}
        >
          Respond to nudge →
        </Button>
        <Button variant="ghost" onClick={() => navigate('/group-settings')}>
          Group settings
        </Button>
      </div>
    </Screen>
  )
}
