import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

// ── Mock data ────────────────────────────────────────────────────────────────
// One group per state, sorted by urgency (mirrors Home order)
const MOCK_GROUPS = [
  {
    id:          1,
    name:        'Friday Fam',
    colour:      'var(--group-peach)',
    members:     ['Anna', 'Dev', 'Kezia'],
    status:      'respond',
    lastHangout: 'Never',
    cycle:       6,
    deadline:    'Friday',
  },
  {
    id:          4,
    name:        'Uni Friends',
    colour:      'var(--group-sage)',
    members:     ['Ben', 'Chloe', 'Marcus', 'Zoe'],
    status:      'book',
    matchedDate: 'Sat 15 Mar',
    matchedTime: 'Evening · 7pm onwards',
  },
  {
    id:          3,
    name:        'Weekend Warriors',
    colour:      'var(--group-lavender)',
    members:     ['Chris', 'Lily', 'Ravi', 'Sam', 'Priya'],
    status:      'waiting',
    lastHangout: '3 months ago',
    responded:   3,
    total:       5,
    closes:      'Friday',
  },
  {
    id:         5,
    name:       'Book Club',
    colour:     'var(--group-rose)',
    members:    ['Diana', 'Felix', 'Ingrid'],
    status:     'booked',
    bookedDate: 'Sat 22 Mar 2026',
    bookedTime: '7:00pm',
    venueName:  'The Ivy',
  },
  {
    id:             2,
    name:           'The Crew',
    colour:         'var(--group-sky)',
    members:        ['Sarah', 'Tom', 'Jess', 'Mike'],
    status:         'idle',
    lastHangout:    '6 weeks ago',
    daysUntilNudge: 12,
    cycle:          6,
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────
function StatsRow({ label, value, isLast }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: isLast ? 'none' : '1px solid var(--border-default)',
    }}>
      <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontWeight: 400 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--ink-primary)', fontWeight: 600 }}>{value}</span>
    </div>
  )
}

function StatsCard({ g }) {
  let rows = []
  if (g.status === 'respond') {
    rows = [
      { label: 'Last hangout',  value: g.lastHangout },
      { label: 'Cycle',         value: `Every ${g.cycle} weeks` },
      { label: 'Status',        value: 'Nudge active' },
    ]
  } else if (g.status === 'book') {
    rows = [
      { label: 'Match found',  value: g.matchedDate },
      { label: 'Time',         value: g.matchedTime },
      { label: 'Assigned to',  value: 'You' },
    ]
  } else if (g.status === 'waiting') {
    rows = [
      { label: 'Last hangout', value: g.lastHangout },
      { label: 'Responded',    value: `${g.responded} of ${g.total} members` },
      { label: 'Closes',       value: g.closes },
    ]
  } else if (g.status === 'booked') {
    rows = [
      { label: 'Date',  value: g.bookedDate },
      { label: 'Venue', value: g.venueName },
      { label: 'Time',  value: g.bookedTime },
    ]
  } else {
    // idle
    rows = [
      { label: 'Last hangout', value: g.lastHangout },
      { label: 'Next nudge',   value: `In ${g.daysUntilNudge} days` },
      { label: 'Cycle',        value: `Every ${g.cycle} weeks` },
    ]
  }

  return (
    <div
      className="card"
      style={{ borderLeft: `3px solid ${g.colour}`, padding: '0 16px' }}
    >
      {rows.map((row, i) => (
        <StatsRow key={row.label} label={row.label} value={row.value} isLast={i === rows.length - 1} />
      ))}
    </div>
  )
}

const ghostOutlined = { border: '1.5px solid var(--border-default)', color: 'var(--ink-muted)' }

function CtaBlock({ g, navigate }) {
  if (g.status === 'respond') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button
          variant="group"
          style={{ '--group-color': g.colour }}
          onClick={() => navigate('/respond')}
        >
          Respond to nudge →
        </Button>
        <Button variant="ghost" style={ghostOutlined} onClick={() => navigate('/group-settings')}>
          Group settings
        </Button>
      </div>
    )
  }

  if (g.status === 'book') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button
          variant="group"
          style={{ '--group-color': g.colour }}
          onClick={() => navigate('/booking-confirm')}
        >
          Book now →
        </Button>
        <Button variant="ghost" style={ghostOutlined} onClick={() => navigate('/group-settings')}>
          Group settings
        </Button>
      </div>
    )
  }

  if (g.status === 'waiting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center', marginBottom: 10 }}>
          We'll notify you when everyone's responded.
        </p>
        <Button variant="ghost" style={ghostOutlined} onClick={() => navigate('/group-settings')}>
          Group settings
        </Button>
      </div>
    )
  }

  if (g.status === 'booked') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button variant="secondary" onClick={() => navigate('/booked-details')}>
          View booking
        </Button>
        <Button variant="ghost" style={ghostOutlined} onClick={() => navigate('/group-settings')}>
          Group settings
        </Button>
      </div>
    )
  }

  // idle
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center', marginBottom: 10 }}>
        Your next nudge will go out in {g.daysUntilNudge} days.
      </p>
      <Button variant="ghost" style={ghostOutlined} onClick={() => navigate('/group-settings')}>
        Group settings
      </Button>
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function GroupDetail() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(MOCK_GROUPS[0].id)
  const g = MOCK_GROUPS.find(grp => grp.id === selectedId)

  return (
    <Screen style={{ paddingBottom: 40, padding: '0 16px 40px' }}>

      {/* [1] Top navigation bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
        paddingTop: 16,
      }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ink-primary)',
            fontSize: 20,
            cursor: 'pointer',
            padding: 0,
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexShrink: 0,
          }}
          aria-label="Back"
        >
          ←
        </button>

        <span style={{
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--ink-secondary)',
          letterSpacing: '-0.01em',
          flex: 1,
          textAlign: 'center',
        }}>
          {g.name}
        </span>

        {/* Balancing spacer — same width as back arrow */}
        <div style={{ width: 44, flexShrink: 0 }} />
      </div>

      {/* [2] Group identity block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: g.colour,
          flexShrink: 0,
        }} />
        <h1 style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: 'var(--ink-primary)',
          margin: 0,
        }}>
          {g.name}
        </h1>
      </div>

      {/* [3] Member avatars */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {g.members.map(name => (
          <div
            key={name}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--ink-primary)',
              color: 'var(--bg-primary)',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-xs)',
              flexShrink: 0,
            }}
          >
            {name.charAt(0)}
          </div>
        ))}
      </div>

      {/* [4] Stats card */}
      <StatsCard g={g} />

      {/* [5] CTA block */}
      <div style={{ marginTop: 28 }}>
        <CtaBlock g={g} navigate={navigate} />
      </div>

    </Screen>
  )
}
