import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function ResponseLocked() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 40 }}>
        <div
          style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'rgba(107,182,160,0.15)',
            border: '2px solid var(--success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36,
            marginBottom: 24,
          }}
        >
          ✓
        </div>

        <h1 style={{ color: 'var(--success)' }}>You're locked in!</h1>
        <p className="text-muted mt-16">
          Your availability and preferences have been saved. Now we wait for the rest of the crew.
        </p>

        <div
          className="card"
          style={{ marginTop: 32, width: '100%', textAlign: 'left', border: '1.5px solid #2a2a2a' }}
        >
          <p className="text-sm text-muted mb-12">Your response summary</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>📅</span>
              <span className="text-sm">Sat 1 Mar · Evening</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>📅</span>
              <span className="text-sm">Fri 7 Mar · Night</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>📅</span>
              <span className="text-sm">Sun 9 Mar · Afternoon</span>
            </div>
            <div className="divider" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>🍸</span>
              <span className="text-sm">Drinks · Food & Drinks</span>
            </div>
          </div>
        </div>

        <div className="alert alert-success" style={{ marginTop: 24, width: '100%' }}>
          <span>🔒</span>
          <p className="text-sm">Locked in. You can't change your response now — keeps it fair for everyone.</p>
        </div>
      </div>

      <div style={{ paddingBottom: 40 }}>
        <Button onClick={() => navigate('/waiting')}>
          See who's responded
        </Button>
      </div>
    </Screen>
  )
}
