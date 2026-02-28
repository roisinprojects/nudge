import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const MOCK_GROUP = {
  name:       'Uni Friends',
  isCreator:  true, // toggle to false to preview member view
  memberCount: 4,
}

const MOCK_MEMBERS = [
  { name: 'Alex',   initial: 'A', role: 'Creator' },
  { name: 'Jordan', initial: 'J', role: 'Member'  },
  { name: 'Priya',  initial: 'P', role: 'Member'  },
  { name: 'Róisín', initial: 'R', role: 'Member', isYou: true },
]

const MOCK_EVENT = {
  scheduled: true,
  day:  'Saturday, 15 March',
  time: '7pm',
  venue: 'The Ivy',
  cuisine: 'Modern European',
}

const MOCK_HISTORY = [
  { date: '28 Jan 2026', venue: 'The Botanist',  cuisine: 'Modern British' },
  { date: '13 Dec 2025', venue: 'Dishoom',        cuisine: 'Indian'        },
  { date: '4 Oct 2025',  venue: 'Hawksmoor',      cuisine: 'Steakhouse'    },
]

export default function GroupDetail() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton to="/home" />
        {MOCK_GROUP.isCreator && (
          <button
            onClick={() => navigate('/group-settings')}
            style={{
              background: 'var(--surface)', border: '1.5px solid #2a2a2a',
              borderRadius: 'var(--radius)', padding: '7px 14px',
              color: 'var(--text-muted)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ⚙️ Settings
          </button>
        )}
      </div>

      {/* Header */}
      <div style={{ marginTop: 20 }}>
        <h1>{MOCK_GROUP.name}</h1>
        <p className="text-muted mt-8">
          {MOCK_GROUP.memberCount} members
          {MOCK_GROUP.isCreator && (
            <span style={{ color: 'var(--coral)', marginLeft: 8, fontSize: 12, fontWeight: 600 }}>
              · Creator
            </span>
          )}
        </p>
      </div>

      {/* Section: Current/Next Event */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
          Upcoming hangout
        </p>

        {MOCK_EVENT.scheduled ? (
          <div style={{
            background: 'var(--surface)', borderRadius: 'var(--radius)',
            padding: '16px', border: '1.5px solid rgba(232,93,77,0.25)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600 }}>{MOCK_EVENT.venue}</p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
                  {MOCK_EVENT.day} · {MOCK_EVENT.time}
                </p>
                <p style={{ fontSize: 13, color: 'var(--taupe)', marginTop: 2 }}>{MOCK_EVENT.cuisine}</p>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: 'var(--success)',
                background: 'rgba(107,182,160,0.15)', border: '1px solid rgba(107,182,160,0.3)',
                borderRadius: 20, padding: '3px 10px',
              }}>Confirmed</span>
            </div>
            <div className="divider" style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigate('/cant-make-it')}
                style={{
                  flex: 1, height: 36, borderRadius: 6,
                  background: 'transparent', border: '1.5px solid #333',
                  color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Can't make it
              </button>
              <button
                onClick={() => navigate('/calendar-invite')}
                style={{
                  flex: 1, height: 36, borderRadius: 6,
                  background: 'transparent', border: '1.5px solid var(--coral)',
                  color: 'var(--coral)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Add to calendar
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(139,134,128,0.08)', border: '1px solid rgba(139,134,128,0.2)',
            borderRadius: 'var(--radius)', padding: '14px 16px',
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--taupe)' }}>No upcoming hangout yet</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Next nudge on March 11 — we'll send everyone a reminder!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section: Members */}
      <div className="divider" />

      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Members
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOCK_MEMBERS.map(m => (
            <div
              key={m.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', background: 'var(--surface)',
                borderRadius: 'var(--radius)', border: '1.5px solid #2a2a2a',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--surface2)', border: `2px solid ${m.isYou ? 'var(--coral)' : '#333'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600,
                color: m.isYou ? 'var(--coral)' : 'var(--text-muted)',
                flexShrink: 0,
              }}>
                {m.initial}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>
                  {m.name}{m.isYou && <span style={{ color: 'var(--taupe)', fontWeight: 400 }}> (You)</span>}
                </p>
                <p style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 2 }}>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Past Hangouts */}
      <div className="divider" />

      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Past hangouts
        </p>
        {MOCK_HISTORY.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MOCK_HISTORY.map((h, i) => (
              <div
                key={i}
                className="card"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{h.venue}</p>
                  <p style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 4 }}>{h.date}</p>
                </div>
                <span className="tag">{h.cuisine}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'rgba(139,134,128,0.08)', border: '1px solid rgba(139,134,128,0.15)',
            borderRadius: 'var(--radius)', padding: '14px 16px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 14, color: 'var(--taupe)' }}>No past hangouts yet</p>
            <p style={{ fontSize: 13, color: '#555', marginTop: 4 }}>Your first is coming soon!</p>
          </div>
        )}
      </div>

      {/* Invite CTA */}
      <div style={{ marginTop: 24 }}>
        <Button variant="ghost" onClick={() => navigate('/invite-friends')}>
          + Invite someone
        </Button>
      </div>
    </Screen>
  )
}
