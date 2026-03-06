import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Icon from '../components/Icon'

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
            Everyone gets the same nudge — no one has to chase. <span className="bold" style={{ color: 'var(--ink-primary)' }}>Takes 2 minutes.</span>
          </p>
        </div>

        <div
          className="card"
          style={{ marginTop: 32, width: '100%' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <p className="text-sm">Pick <span className="bold">3 dates</span> you're free (Thu–Sun)</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="schedule" size={20} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
              <p className="text-sm">Choose a <span className="bold">time of day</span> for each</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="local_bar" size={20} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
              <p className="text-sm">Select <span className="bold">2 activity preferences</span></p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <p className="text-sm text-muted">Respond by Friday</p>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
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
