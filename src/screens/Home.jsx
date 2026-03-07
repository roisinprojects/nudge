import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import { useViewMode } from '../context/viewMode'

// Sorted by urgency: respond → book → waiting → booked → idle
const MOCK_GROUPS = [
  {
    id: 1,
    name:        'Friday Fam',
    colour:      'var(--group-peach)',
    members:     ['Anna', 'Dev', 'Kezia'],
    status:      'respond',
    deadline:    'Friday',
  },
  {
    id: 4,
    name:        'Uni Friends',
    colour:      'var(--group-sage)',
    members:     ['Ben', 'Chloe', 'Marcus', 'Zoe'],
    matchedDate: 'Sat 15 Mar',
    isBooker:    true,
    status:      'book',
  },
  {
    id: 3,
    name:        'Weekend Warriors',
    colour:      'var(--group-lavender)',
    members:     ['Chris', 'Lily', 'Ravi', 'Sam', 'Priya'],
    responded:   3,
    total:       5,
    closes:      'Friday',
    status:      'waiting',
  },
  {
    id: 5,
    name:        'Book Club',
    colour:      'var(--group-rose)',
    members:     ['Diana', 'Felix', 'Ingrid'],
    bookedDate:  'Sat 8 Mar',
    bookedTime:  '7:30 pm',
    venueName:   'The Ivy',
    status:      'booked',
  },
  {
    id: 2,
    name:           'The Crew',
    colour:         'var(--group-sky)',
    members:        ['Sarah', 'Tom', 'Jess', 'Mike'],
    daysUntilNudge: 12,
    status:         'idle',
  },
]

const UP_NEXT_STATUSES = ['respond', 'book', 'waiting', 'booked']

function StatusBadge({ g }) {
  if (g.status === 'respond') return (
    <span className="badge badge-respond">
      <span className="badge-dot" />
      Respond now!
    </span>
  )
  if (g.status === 'book') return (
    <span className="badge badge-book">
      <span className="badge-dot" />
      Book now
    </span>
  )
  if (g.status === 'waiting') return (
    <span className="badge badge-waiting">
      <span className="badge-dot" />
      Waiting
    </span>
  )
  if (g.status === 'booked') return (
    <span className="badge badge-booked">
      <span className="badge-dot" />
      Booked ✓
    </span>
  )
  // idle
  return (
    <span className="badge badge-idle">
      <span className="badge-dot" />
      Nudge in {g.daysUntilNudge} days
    </span>
  )
}

function groupCardStyle(g) {
  const actionBorder = { border: `1.5px solid ${g.colour}`, borderLeftWidth: '3px' }
  return {
    borderLeft: `3px solid ${g.colour}`,
    ...(g.status === 'respond' || g.status === 'book' ? actionBorder : {}),
    ...(g.status === 'idle' ? { opacity: 0.65 } : {}),
  }
}

function CardBottomRow({ g }) {
  if (g.status === 'respond') {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Deadline</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-primary)' }}>{g.deadline}</p>
      </div>
    )
  }
  if (g.status === 'book') {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Match found</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-primary)' }}>{g.matchedDate}</p>
      </div>
    )
  }
  if (g.status === 'waiting') {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{g.responded} of {g.total} responded</p>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Closes {g.closes}</p>
      </div>
    )
  }
  if (g.status === 'booked') {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Details</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-primary)' }}>
          {g.venueName} · {g.bookedDate} · {g.bookedTime}
        </p>
      </div>
    )
  }
  return null
}

function GroupCard({ g, navigate }) {
  const hasBottomRow = g.status !== 'idle'

  return (
    <div
      className="card card-interactive"
      style={groupCardStyle(g)}
      onClick={() => navigate('/group-detail', { state: { groupId: g.id } })}
    >
      {/* Row 1: name + pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h3 style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--ink-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0,
          flex: 1,
        }}>
          {g.name}
        </h3>
        <div style={{ flexShrink: 0 }}>
          <StatusBadge g={g} />
        </div>
      </div>

      {/* Row 2: members */}
      <p className="text-sm text-muted" style={{ marginTop: 3 }}>
        {g.members.slice(0, 3).join(', ')}
        {g.members.length > 3 && ` +${g.members.length - 3} more`}
      </p>

      {/* Divider + Row 3 */}
      {hasBottomRow && (
        <>
          <div style={{ height: 1, background: 'var(--border-default)', margin: '10px 0' }} />
          <CardBottomRow g={g} />
        </>
      )}
    </div>
  )
}

const sectionHeading = (isFirst) => ({
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: 8,
  marginTop: isFirst ? 4 : 20,
})

export default function Home() {
  const navigate   = useNavigate()
  const mode       = useViewMode()
  const upNext     = MOCK_GROUPS.filter(g => UP_NEXT_STATUSES.includes(g.status))
  const idleGroups = MOCK_GROUPS.filter(g => g.status === 'idle')

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {mode === 'mobile' && (
        <div style={{ paddingTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="logo">nudge</span>
          <div
            className="avatar"
            style={{ cursor: 'pointer', background: 'var(--ink-primary)', color: 'var(--bg-primary)' }}
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

      <div style={{ marginTop: 20 }}>
        {upNext.length > 0 && (
          <>
            <p style={sectionHeading(true)}>Up next</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {upNext.map(g => <GroupCard key={g.id} g={g} navigate={navigate} />)}
            </div>
          </>
        )}

        {idleGroups.length > 0 && (
          <>
            <p style={sectionHeading(upNext.length === 0)}>Your groups</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {idleGroups.map(g => <GroupCard key={g.id} g={g} navigate={navigate} />)}
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <Button variant="ghost" onClick={() => navigate('/create-group')}>Create new group</Button>
      </div>
    </Screen>
  )
}
