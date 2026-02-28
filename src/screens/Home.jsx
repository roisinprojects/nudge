import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import { useViewMode } from '../context/viewMode'

// Toggle to false to preview the empty state (new user with no groups)
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
  const mode = useViewMode()
  // Flip this to simulate a new user with no groups
  const [groups] = useState(MOCK_GROUPS)

  const hasGroups = groups.length > 0

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {mode === 'mobile' && (
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
      )}

      <div style={{ marginTop: 32 }}>
        <h1>Your groups</h1>
        <p className="text-muted mt-8">Staying in touch, automatically.</p>
      </div>

      {/* Empty state */}
      {!hasGroups && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 16,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              border: '2px dashed #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              color: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            👥
          </div>
          <div>
            <h2>No groups yet</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 260, margin: '8px auto 0' }}>
              Create a group and invite your friends to start planning hangouts together.
            </p>
          </div>
          <p className="text-xs text-muted" style={{ maxWidth: 240, lineHeight: 1.6 }}>
            Nudge sends automatic reminders every 6 weeks — so you actually hang out. No more "when are we free?" texts.
          </p>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            <Button onClick={() => navigate('/create-group')}>
              + Create new group
            </Button>
            <Button variant="ghost" onClick={() => navigate('/invite-landing')}>
              Join with an invite link
            </Button>
          </div>
        </div>
      )}

      {/* Groups list */}
      {hasGroups && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {groups.map(g => {
          const badge = statusBadge[g.status]
          return (
            <div
              key={g.id}
              className="card"
              style={{ cursor: 'pointer', border: g.status === 'respond' ? '1px solid var(--coral)' : '1px solid transparent' }}
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
      )}

      {hasGroups && (
        <div style={{ marginTop: 24 }}>
          <Button variant="ghost" onClick={() => navigate('/create-group')}>
            + Create new group
          </Button>
        </div>
      )}
    </Screen>
  )
}
