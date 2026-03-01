import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import { useViewMode } from '../context/viewMode'

// Group colour palette — each group gets one from the 8-colour system
const GROUP_COLOURS = [
  'var(--group-sage)',
  'var(--group-lavender)',
  'var(--group-peach)',
  'var(--group-sky)',
  'var(--group-butter)',
  'var(--group-rose)',
  'var(--group-slate)',
  'var(--group-marigold)',
]

const MOCK_GROUPS = [
  {
    id: 1,
    name: 'The Crew',
    members: ['Sarah', 'Tom', 'Jess', 'Mike'],
    nextNudge: '12 days',
    lastHangout: '6 weeks ago',
    status: 'idle',
    colorIdx: 0,
  },
  {
    id: 2,
    name: 'Friday Fam',
    members: ['Anna', 'Dev'],
    nextNudge: null,
    lastHangout: 'Never',
    status: 'respond',
    colorIdx: 2,
  },
  {
    id: 3,
    name: 'Weekend Warriors',
    members: ['Chris', 'Lily', 'Ravi', 'Sam', 'Priya'],
    nextNudge: '34 days',
    lastHangout: '3 months ago',
    status: 'waiting',
    colorIdx: 3,
  },
]

function StatusBadge({ status }) {
  if (status === 'respond') {
    return <span className="badge badge-respond">Respond now!</span>
  }
  if (status === 'waiting') {
    return <span className="badge badge-waiting">Waiting on others</span>
  }
  return <span className="badge badge-idle">Next nudge soon</span>
}

export default function Home() {
  const navigate = useNavigate()
  const mode = useViewMode()
  const [groups] = useState(MOCK_GROUPS)
  const hasGroups = groups.length > 0

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
            Y
          </div>
        </div>
      )}

      <div style={{ marginTop: 28 }}>
        <h1>Your groups</h1>
        <p style={{ marginTop: 4, fontSize: 14, color: 'var(--ink-secondary)' }}>
          Staying in touch, automatically.
        </p>
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
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '2px dashed var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              color: 'var(--ink-faint)',
            }}
          >
            👥
          </div>
          <div>
            <h2>No groups yet</h2>
            <p style={{ marginTop: 8, maxWidth: 260, margin: '8px auto 0', fontSize: 14, color: 'var(--ink-secondary)' }}>
              Create a group and invite your friends to start planning hangouts together.
            </p>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', maxWidth: 240, lineHeight: 1.6 }}>
            Nudge sends automatic reminders every 6 weeks — so you actually hang out.
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
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {groups.map(g => {
            const groupColour = GROUP_COLOURS[g.colorIdx % GROUP_COLOURS.length]
            return (
              <div
                key={g.id}
                onClick={() => g.status === 'respond' ? navigate('/respond') : navigate('/group-detail')}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-default)',
                  borderLeft: `3px solid ${groupColour}`,
                  boxShadow: 'var(--shadow-sm)',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'box-shadow var(--duration-fast) var(--ease-out)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-primary)' }}>{g.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 3 }}>
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
            )
          })}
        </div>
      )}

      {hasGroups && (
        <div style={{ marginTop: 16 }}>
          <Button variant="ghost" onClick={() => navigate('/create-group')}>
            + Create new group
          </Button>
        </div>
      )}
    </Screen>
  )
}
