import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function GenericError() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
          paddingTop: 24,
        }}
      >
        <div className="alert alert-error" style={{ width: '100%', textAlign: 'left' }}>
          <span>✕</span>
          <span>Something went wrong — it's not you</span>
        </div>

        <div>
          <h1>Something went wrong</h1>
          <p className="text-muted mt-8">
            We couldn't complete that action. It's not you — this one's on us.
          </p>
        </div>

        <div className="alert alert-error" style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p className="text-xs text-muted">Error details</p>
          <p className="text-sm mt-8">
            Could not save your response. Please try again.
          </p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => navigate(-1)}>
            Try again
          </Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <p className="text-xs text-muted">
            Still stuck? Email us at{' '}
            <span style={{ color: 'var(--coral)' }}>help@nudge.app</span>
          </p>
        </div>
      </div>
    </Screen>
  )
}
