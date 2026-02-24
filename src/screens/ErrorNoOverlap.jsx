import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function ErrorNoOverlap() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 24 }}>
        <div style={{ fontSize: 56 }}>😬</div>

        <div>
          <h1>No overlap found</h1>
          <p className="text-muted mt-8">
            We couldn't find a time that works for everyone in <span className="bold">The Crew</span> this round.
          </p>
        </div>

        <div className="card" style={{ width: '100%', textAlign: 'left', border: '1.5px solid #2a2a2a' }}>
          <p className="text-sm text-muted mb-12">What happens next</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>🔁</span>
              <p className="text-sm">We'll send another nudge in <span className="bold">2 weeks</span> to try again with a fresh window.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>👥</span>
              <p className="text-sm">Or you can try matching with just the people who were available.</p>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => navigate('/home')}>
            Match with available members
          </Button>
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Wait for the next nudge
          </Button>
        </div>
      </div>
    </Screen>
  )
}
