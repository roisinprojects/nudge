import Screen from '../components/Screen'
import BackButton from '../components/BackButton'

const MEMBERS = [
  { name: 'Sarah',  initial: 'S', responded: true },
  { name: 'Tom',    initial: 'T', responded: true },
  { name: 'You',    initial: 'Y', responded: true },
  { name: 'Jess',   initial: 'J', responded: false },
  { name: 'Mike',   initial: 'M', responded: false },
]

const responded = MEMBERS.filter(m => m.responded).length
const total = MEMBERS.length

export default function WaitingForOthers() {
  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/home" />
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>⏳</div>
        <h1 style={{ marginTop: 16 }}>Waiting for others</h1>
        <p className="text-muted mt-8">
          {responded} of {total} people have responded. We'll match everyone up when all responses are in.
        </p>
      </div>

      <div style={{ marginTop: 32 }}>
        {/* Progress bar */}
        <div style={{ height: 6, background: 'rgba(255, 255, 255, 0.06)', borderRadius: 3, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${(responded / total) * 100}%`,
              background: 'var(--coral)',
              borderRadius: 3,
              transition: 'width 0.4s',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span className="text-xs text-muted">{responded} responded</span>
          <span className="text-xs text-muted">{total - responded} pending</span>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <p className="text-sm text-muted mb-12">The crew</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MEMBERS.map(m => (
            <div
              key={m.name}
              style={{ display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div className={`avatar ${m.responded ? 'responded' : ''}`}>{m.initial}</div>
              <span style={{ flex: 1 }}>{m.name}</span>
              <span
                className="text-sm bold"
                style={{ color: m.responded ? 'var(--success)' : 'var(--taupe)' }}
              >
                {m.responded ? 'Responded ✓' : 'Pending…'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="countdown" style={{ marginTop: 24, textAlign: 'center' }}>
        ⏱ 23h 41m until deadline — results auto-match then
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="alert alert-warning">
          <span>💡</span>
          <p className="text-sm">
            Nudge will send a reminder to Jess and Mike in a few hours if they haven't responded.
          </p>
        </div>
      </div>

      <div style={{ paddingBottom: 40 }} />
    </Screen>
  )
}
