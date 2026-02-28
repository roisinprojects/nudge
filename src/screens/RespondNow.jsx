import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function RespondNow() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div style={{ paddingTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <span className="logo">nudge</span>
        <div style={{ fontSize: 56, marginTop: 40 }}>👋</div>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1>Time to hang!</h1>
          <p className="text-muted">
            It's been 6 weeks since <span className="bold">The Crew</span> last caught up.
            Everyone gets the same nudge — no one has to chase.
          </p>
        </div>

        <div
          className="card"
          style={{ marginTop: 32, width: '100%', textAlign: 'left', border: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>📅</span>
              <p className="text-sm">Pick <span className="bold">3 dates</span> you're free (Fri, Sat, or Sun)</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🕐</span>
              <p className="text-sm">Choose a <span className="bold">time of day</span> for each</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🍹</span>
              <p className="text-sm">Select <span className="bold">2 activity preferences</span></p>
            </div>
          </div>
        </div>

        <div
          className="countdown"
          style={{ marginTop: 24 }}
        >
          ⏱ 47h 23m remaining to respond
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => navigate('/calendar-picker')}>
          Let's go →
        </Button>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Remind me later
        </Button>
      </div>
    </Screen>
  )
}
