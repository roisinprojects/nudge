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
  slot:  'Sat, 28 Feb · 7pm',
  count: 2,
  total: 4,
  who:   ['Sarah', 'Tom'],
}

export default function ErrorNoOverlap() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 24 }}>
        <div className="alert alert-warning">
          <span>⚠</span>
          <span>No date works for everyone this round</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1>No overlap found</h1>
          <p className="text-muted mt-8">
            Everyone's got different schedules this round. No single time works for all of{' '}
            <span className="bold">The Crew</span>.
          </p>
        </div>

        {/* Best available time */}
        <div className="alert alert-warning" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <p className="text-sm bold">Best available time</p>
          <p className="bold mt-8" style={{ fontSize: 18 }}>{BEST_MATCH.slot}</p>
          <p className="text-sm mt-8">
            {BEST_MATCH.count} of {BEST_MATCH.total} people free ({BEST_MATCH.who.join(' & ')})
          </p>
        </div>

        {/* Responses */}
        <div className="card">
          <p className="text-sm text-muted mb-12">Responses this round</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_RESPONSES.map(r => (
              <div key={r.name} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div
                  className="avatar"
                  style={{ width: 28, height: 28, fontSize: 11, flexShrink: 0 }}
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
            Pick the closest match
          </Button>
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Wait for next nudge in 2 weeks
          </Button>
        </div>
      </div>
    </Screen>
  )
}
