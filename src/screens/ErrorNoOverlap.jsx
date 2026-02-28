import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MOCK_RESPONSES = [
  { name: 'Sarah', slots: ['Sat 28 Feb · 7pm', 'Sun 1 Mar · 3pm'] },
  { name: 'Tom',   slots: ['Sat 28 Feb · 7pm', 'Fri 27 Feb · 10pm'] },
  { name: 'Jess',  slots: ['Sun 1 Mar · 7pm', 'Sun 8 Mar · 3pm'] },
  { name: 'Mike',  slots: ['Sat 7 Mar · 7pm', 'Sun 8 Mar · 7pm'] },
]

const BEST_MATCH = {
  slot: 'Sat, 28 Feb · 7pm',
  count: 2,
  total: 4,
  who: ['Sarah', 'Tom'],
}

export default function ErrorNoOverlap() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 56 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52 }}>😬</div>
          <h1 style={{ marginTop: 16 }}>No overlap found</h1>
          <p className="text-muted mt-8">
            Everyone's got different schedules this round. No single time works for all of{' '}
            <span className="bold">The Crew</span>.
          </p>
        </div>

        {/* Warning box: best available */}
        <div
          style={{
            background: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
          }}
        >
          <p className="text-sm bold" style={{ color: 'var(--warning)' }}>Best available time</p>
          <p
            className="bold mt-8"
            style={{ color: 'var(--text)', fontSize: 18 }}
          >
            {BEST_MATCH.slot}
          </p>
          <p className="text-sm mt-8" style={{ color: 'var(--warning)' }}>
            {BEST_MATCH.count} of {BEST_MATCH.total} people free ({BEST_MATCH.who.join(' & ')})
          </p>
        </div>

        {/* Who responded with what */}
        <div className="card" style={{ border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p className="text-sm text-muted mb-12">Responses this round</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_RESPONSES.map(r => (
              <div key={r.name} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--surface2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--taupe)',
                    flexShrink: 0,
                  }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm bold">{r.name}</p>
                  <p className="text-xs text-muted">{r.slots.join('  ·  ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => navigate('/results')}>
            Match with available members
          </Button>
          <Button variant="secondary" onClick={() => navigate('/results')}>
            Pick closest match
          </Button>
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Wait for the next nudge
          </Button>
        </div>

        <p className="text-center text-xs text-muted" style={{ marginTop: -8 }}>
          Next nudge: in 2 weeks
        </p>
      </div>
    </Screen>
  )
}
