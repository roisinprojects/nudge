import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function RespondNow() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div style={{ paddingTop: 40, display: 'flex', flexDirection: 'column' }}>
        <span className="logo" style={{ fontSize: 28 }}>nudge</span>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1>Time to catch up</h1>
          <p className="text-muted">
            It's been 6 weeks since <span className="bold">The Crew</span> last caught up.
            Everyone gets the same nudge — no one has to chase. Takes 2 minutes.
          </p>
        </div>

        <p className="text-sm" style={{ fontWeight: 600, color: 'var(--ink-primary)', marginTop: 16, marginBottom: 8 }}>Respond by Friday</p>

        <div
          className="card"
          style={{ width: '100%' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="text-sm"><strong>Pick</strong> 3 dates you're free (Thu–Sun)</p>
            <p className="text-sm"><strong>Choose</strong> a time of day for each</p>
            <p className="text-sm"><strong>Select</strong> 2 activity preferences</p>
          </div>
        </div>
      </div>

      {/* ── Sticky footer ── */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'var(--bg-primary)',
        padding: '16px 16px 32px',
        margin: '0 -16px',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', flexDirection: 'column', gap: 12,
        marginTop: 16,
      }}>
        <Button onClick={() => navigate('/calendar-picker')}>
          Continue to dates
        </Button>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Remind me later
        </Button>
      </div>
    </Screen>
  )
}
