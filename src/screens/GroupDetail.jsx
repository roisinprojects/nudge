import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const MOCK_HISTORY = [
  { date: 'Dec 14, 2025', venue: 'The Botanist', activity: 'Food & Drinks' },
  { date: 'Oct 3, 2025',  venue: 'Soho House',  activity: 'Drinks' },
  { date: 'Aug 22, 2025', venue: 'Hawksmoor',   activity: 'Food & Drinks' },
]

const MEMBERS = [
  { name: 'Sarah', initial: 'S', responded: true },
  { name: 'Tom',   initial: 'T', responded: true },
  { name: 'Jess',  initial: 'J', responded: false },
  { name: 'Mike',  initial: 'M', responded: false },
  { name: 'You',   initial: 'Y', responded: false },
]

export default function GroupDetail() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/home" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>The Crew</h1>
        <p className="text-muted mt-8">5 members · Next nudge in 12 days</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <p className="text-sm text-muted mb-8">Members</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {MEMBERS.map(m => (
            <div key={m.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div className={`avatar ${m.responded ? 'responded' : ''}`}>{m.initial}</div>
              <span className="text-xs text-muted">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div>
        <p className="text-sm text-muted mb-12">Hangout history</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOCK_HISTORY.map((h, i) => (
            <div
              key={i}
              className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}
            >
              <div>
                <p className="text-sm bold">{h.venue}</p>
                <p className="text-xs text-muted mt-8">{h.date}</p>
              </div>
              <span className="tag">{h.activity}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          + Invite someone
        </Button>
      </div>
    </Screen>
  )
}
