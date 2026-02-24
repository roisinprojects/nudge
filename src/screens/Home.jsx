import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MOCK_GROUPS = [
  {
    id: 1,
    name: 'The Crew',
    members: ['Sarah', 'Tom', 'Jess', 'Mike'],
    nextNudge: '12 days',
    lastHangout: '6 weeks ago',
    status: 'idle',
  },
  {
    id: 2,
    name: 'Friday Fam',
    members: ['Anna', 'Dev'],
    nextNudge: null,
    lastHangout: 'Never',
    status: 'respond',
  },
  {
    id: 3,
    name: 'Weekend Warriors',
    members: ['Chris', 'Lily', 'Ravi', 'Sam', 'Priya'],
    nextNudge: '34 days',
    lastHangout: '3 months ago',
    status: 'waiting',
  },
]

const statusBadge = {
  idle:    { label: 'Upcoming nudge', color: 'var(--taupe)' },
  respond: { label: 'Respond now!',   color: 'var(--coral)' },
  waiting: { label: 'Waiting on others', color: 'var(--warning)' },
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="logo" style={{ fontSize: 28 }}>nudge</span>
        <div
          className="avatar"
          style={{ cursor: 'pointer', fontSize: 16 }}
          onClick={() => navigate('/profile')}
        >
          Y
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <h1>Your groups</h1>
        <p className="text-muted mt-8">Staying in touch, automatically.</p>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MOCK_GROUPS.map(g => {
          const badge = statusBadge[g.status]
          return (
            <div
              key={g.id}
              className="card"
              style={{ cursor: 'pointer', border: g.status === 'respond' ? '1.5px solid var(--coral)' : '1.5px solid transparent' }}
              onClick={() => g.status === 'respond' ? navigate('/respond') : navigate('/group-detail')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p className="bold">{g.name}</p>
                  <p className="text-sm text-muted mt-8">
                    {g.members.slice(0, 3).join(', ')}
                    {g.members.length > 3 && ` +${g.members.length - 3} more`}
                  </p>
                </div>
                <span
                  className="text-xs bold"
                  style={{ color: badge.color, whiteSpace: 'nowrap', marginLeft: 8, paddingTop: 2 }}
                >
                  {badge.label}
                </span>
              </div>

              <div className="divider" style={{ margin: '12px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p className="text-xs text-muted">Last hangout</p>
                  <p className="text-sm mt-8">{g.lastHangout}</p>
                </div>
                {g.nextNudge && (
                  <div style={{ textAlign: 'right' }}>
                    <p className="text-xs text-muted">Next nudge in</p>
                    <p className="text-sm mt-8">{g.nextNudge}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <Button variant="ghost" onClick={() => navigate('/create-group')}>
          + Create new group
        </Button>
      </div>
    </Screen>
  )
}
