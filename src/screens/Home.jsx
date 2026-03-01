import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import { useViewMode } from '../context/viewMode'

const MOCK_GROUPS = [
  {
    id: 1,
    name:        'Friday Fam',
    colour:      'var(--group-peach)',
    members:     ['Anna', 'Dev', 'Kezia'],
    lastHangout: 'Never',
    nextNudge:   null,
    status:      'respond',
  },
  {
    id: 2,
    name:        'The Crew',
    colour:      'var(--group-sky)',
    members:     ['Sarah', 'Tom', 'Jess', 'Mike'],
    lastHangout: '6 weeks ago',
    nextNudge:   '12 days',
    status:      'idle',
  },
  {
    id: 3,
    name:        'Weekend Warriors',
    colour:      'var(--group-lavender)',
    members:     ['Chris', 'Lily', 'Ravi', 'Sam', 'Priya'],
    lastHangout: '3 months ago',
    nextNudge:   '34 days',
    status:      'waiting',
  },
]

function StatusBadge({ status }) {
  if (status === 'respond')  return <span className="badge badge-respond">Respond now!</span>
  if (status === 'waiting')  return <span className="badge badge-waiting">Waiting on others</span>
  return <span className="badge badge-idle">Next nudge soon</span>
}

function groupCardStyle(g) {
  if (g.status === 'respond') {
    return {
      border:          `1.5px solid ${g.colour}`,
      borderLeftWidth: '3px',
    }
  }
  return {
    borderLeft: `3px solid ${g.colour}`,
  }
}

export default function Home() {
  const navigate = useNavigate()
  const mode     = useViewMode()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {mode === 'mobile' && (
        <div style={{ paddingTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="logo">nudge</span>
          <div
            className="avatar"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
          >
            R
          </div>
        </div>
      )}

      <div style={{ marginTop: 28 }}>
        <h1>Your groups</h1>
        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
          Staying in touch, automatically.
        </p>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MOCK_GROUPS.map(g => (
          <div
            key={g.id}
            className="card"
            style={groupCardStyle(g)}
            onClick={() => g.status === 'respond' ? navigate('/respond') : navigate('/group-detail')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{g.name}</h3>
                <p className="text-sm text-muted" style={{ marginTop: 3 }}>
                  {g.members.slice(0, 3).join(', ')}
                  {g.members.length > 3 && ` +${g.members.length - 3} more`}
                </p>
              </div>
              <div style={{ marginLeft: 10, flexShrink: 0 }}>
                <StatusBadge status={g.status} />
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border-default)', margin: '12px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                  Last hangout
                </p>
                <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4 }}>{g.lastHangout}</p>
              </div>
              {g.nextNudge && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                    Next nudge in
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4 }}>{g.nextNudge}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <Button onClick={() => navigate('/create-group')}>+ Create new group</Button>
      </div>
    </Screen>
  )
}
