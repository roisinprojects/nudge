import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function ErrorNoVenues() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 24 }}>
        <div style={{ fontSize: 56 }}>🔍</div>

        <div>
          <h1>No venues found</h1>
          <p className="text-muted mt-8">
            We couldn't find available venues on OpenTable for your matched date and preferences.
          </p>
        </div>

        <div className="alert alert-error" style={{ width: '100%', textAlign: 'left' }}>
          <span>ℹ️</span>
          <p className="text-sm">
            Saturday 1 March · Evening · Food & Drinks — no availability on OpenTable within 2 miles.
          </p>
        </div>

        <div className="card" style={{ width: '100%', textAlign: 'left', border: '1.5px solid #2a2a2a' }}>
          <p className="text-sm text-muted mb-12">Options</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>🔄</span>
              <p className="text-sm">Try a <span className="bold">different activity</span> (e.g. Drinks instead of Food & Drinks).</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>📍</span>
              <p className="text-sm">Expand the search <span className="bold">radius</span> to 5 miles.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>🗓️</span>
              <p className="text-sm">Try your <span className="bold">second matched date</span> instead.</p>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => navigate('/results')}>
            Try Drinks instead
          </Button>
          <Button variant="secondary" onClick={() => navigate('/results')}>
            Expand to 5 miles
          </Button>
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Skip this round
          </Button>
        </div>
      </div>
    </Screen>
  )
}
