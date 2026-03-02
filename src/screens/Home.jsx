import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { useViewMode } from '../context/viewMode'

const MOCK_GROUPS = [
  {
    id: 1,
    name:        'Friday Fam',
    colour:      'var(--group-peach)',
    members:     ['Anna', 'Dev', 'Kezia'],
    lastHangout: 'Never',
    status:      'respond',
    deadline:    'Friday',
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
    responded:   3,
    total:       5,
    closes:      'Friday',
    status:      'waiting',
  },
  {
    id: 4,
    name:        'Uni Friends',
    colour:      'var(--group-sage)',
    members:     ['Ben', 'Chloe', 'Marcus', 'Zoe'],
    lastHangout: '2 months ago',
    matchedDate: 'Saturday, 15 March',
    matchedTime: '7pm',
    status:      'matched',
  },
  {
    id: 5,
    name:        'Book Club',
    colour:      'var(--group-rose)',
    members:     ['Diana', 'Felix', 'Ingrid'],
    lastHangout: '6 weeks ago',
    bookedDate:  'Saturday, 8 March',
    venueName:   'The Ivy',
    status:      'booked',
  },
]

function StatusBadge({ status }) {
  if (status === 'respond')  return <span className="badge badge-respond">Respond now</span>
  if (status === 'waiting')  return <span className="badge badge-waiting">Waiting on others</span>
  if (status === 'matched')  return <span className="badge badge-matched">Matched</span>
  if (status === 'booked')   return <span className="badge badge-booked">Booked</span>
  return <span className="badge badge-idle">Nudge soon</span>
}

function groupCardStyle(g) {
  return {
    borderLeft: `3px solid ${g.colour}`,
    ...(g.status === 'respond' ? { border: `1.5px solid ${g.colour}`, borderLeftWidth: '3px' } : {}),
  }
}

function CardBody({ g, navigate }) {
  if (g.status === 'respond') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        <Icon name="schedule" size={14} style={{ color: 'var(--ink-muted)' }} />
        <p className="text-xs text-muted">Respond by {g.deadline}</p>
      </div>
    )
  }

  if (g.status === 'waiting') {
    return (
      <>
        <div style={{ height: 1, background: 'var(--border-default)', margin: '12px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="group" size={14} style={{ color: 'var(--ink-muted)' }} />
          <p className="text-xs text-muted">{g.responded} of {g.total} responded · Closes {g.closes}</p>
        </div>
      </>
    )
  }

  if (g.status === 'matched') {
    return (
      <>
        <div style={{ height: 1, background: 'var(--border-default)', margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="text-xs text-muted">Matched slot</p>
            <p className="text-sm" style={{ marginTop: 2, fontWeight: 600 }}>{g.matchedDate} · {g.matchedTime}</p>
          </div>
          <button
            className="btn btn-primary"
            style={{ height: 36, padding: '0 16px', fontSize: 13 }}
            onClick={e => { e.stopPropagation(); navigate('/booking-confirm') }}
          >
            Book now
          </button>
        </div>
      </>
    )
  }

  if (g.status === 'booked') {
    return (
      <>
        <div style={{ height: 1, background: 'var(--border-default)', margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="text-xs text-muted">{g.bookedDate}</p>
            <p className="text-sm" style={{ marginTop: 2, fontWeight: 600 }}>{g.venueName}</p>
          </div>
          <button
            className="btn btn-secondary"
            style={{ height: 36, padding: '0 16px', fontSize: 13 }}
            onClick={e => { e.stopPropagation(); navigate('/booked-details') }}
          >
            View details
          </button>
        </div>
      </>
    )
  }

  // idle
  return (
    <>
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
    </>
  )
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
          Your crew, on repeat.
        </p>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MOCK_GROUPS.map(g => (
          <div
            key={g.id}
            className="card card-interactive"
            style={groupCardStyle(g)}
            onClick={() => g.status === 'respond' ? navigate('/respond') : navigate('/group-detail')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: g.colour }}>{g.name}</h3>
                <p className="text-sm text-muted" style={{ marginTop: 3 }}>
                  {g.members.slice(0, 3).join(', ')}
                  {g.members.length > 3 && ` +${g.members.length - 3} more`}
                </p>
              </div>
              <div style={{ marginLeft: 10, flexShrink: 0 }}>
                <StatusBadge status={g.status} />
              </div>
            </div>

            <CardBody g={g} navigate={navigate} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <Button variant="ghost" onClick={() => navigate('/create-group')}>Create new group</Button>
      </div>
    </Screen>
  )
}
