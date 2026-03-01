import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const GROUP_COLOUR = 'var(--group-lavender)'

const MOCK_GROUP = {
  name:       'Uni Friends',
  isCreator:  true,
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
      <div style={{ paddingTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton to="/home" />
        {MOCK_GROUP.isCreator && (
          <button
            onClick={() => navigate('/group-settings')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              color: 'var(--ink-secondary)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Settings
          </button>
        )}
      </div>

      {/* Header with group colour dot */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: GROUP_COLOUR,
            flexShrink: 0,
          }} />
          <h1>{MOCK_GROUP.name}</h1>
        </div>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--ink-muted)' }}>
          {MOCK_GROUP.memberCount} members
          {MOCK_GROUP.isCreator && (
            <span style={{ marginLeft: 8, color: 'var(--ink-secondary)', fontWeight: 600 }}>
              · Creator
            </span>
          )}
        </p>
      </div>

      {/* Upcoming hangout */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Upcoming hangout
        </p>

        {MOCK_EVENT.scheduled ? (
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            borderLeft: `3px solid ${GROUP_COLOUR}`,
            border: '1px solid var(--border-default)',
            borderLeftWidth: 3,
            borderLeftColor: GROUP_COLOUR,
            padding: '14px 16px',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{MOCK_EVENT.venue}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4 }}>
                  {MOCK_EVENT.day} · {MOCK_EVENT.time}
                </p>
                <span className="tag" style={{ marginTop: 8, display: 'inline-block' }}>{MOCK_EVENT.cuisine}</span>
              </div>
              <span className="badge badge-confirmed">Confirmed</span>
            </div>
            <div style={{ height: 1, background: 'var(--border-default)', margin: '12px 0' }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigate('/cant-make-it')}
                style={{
                  flex: 1, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'transparent', border: 'none',
                  color: 'var(--ink-muted)', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Can't make it
              </button>
              <button
                onClick={() => navigate('/calendar-invite')}
                style={{
                  flex: 1, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'transparent',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--ink-primary)', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Add to calendar
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-ui)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-secondary)' }}>No upcoming hangout yet</p>
              <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4 }}>
                Next nudge on March 11 — we'll send everyone a reminder!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Members */}
      <div style={{ height: 1, background: 'var(--border-default)', margin: '20px 0' }} />

      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Members
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOCK_MEMBERS.map(m => (
            <div
              key={m.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: m.isYou ? GROUP_COLOUR : 'var(--bg-ui)',
                border: `1.5px solid ${m.isYou ? 'transparent' : 'var(--border-strong)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: 'var(--ink-primary)',
                flexShrink: 0,
              }}>
                {m.initial}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-primary)' }}>
                  {m.name}{m.isYou && <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}> (You)</span>}
                </p>
                <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past hangouts */}
      <div style={{ height: 1, background: 'var(--border-default)', margin: '20px 0' }} />

      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Past hangouts
        </p>
        {MOCK_HISTORY.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MOCK_HISTORY.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{h.venue}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 3 }}>{h.date}</p>
                </div>
                <span className="tag">{h.cuisine}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-ui)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No past hangouts yet</p>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4 }}>Your first is coming soon!</p>
          </div>
        )}
      </div>

      {/* Invite CTA */}
      <div style={{ marginTop: 20 }}>
        <Button
          variant="group"
          style={{ '--group-color': GROUP_COLOUR }}
          onClick={() => navigate('/invite-friends')}
        >
          + Invite someone
        </Button>
      </div>
    </Screen>
  )
}
