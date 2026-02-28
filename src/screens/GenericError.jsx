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
          justifyContent: 'center',
          textAlign: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--color-error-bg)',
            border: '2px solid var(--error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
          }}
        >
          ⚠️
        </div>

        <div>
          <h1>Something went wrong</h1>
          <p className="text-muted mt-8">
            We couldn't complete that action. It's not you — this one's on us.
          </p>
        </div>

        <div
          style={{
            background: 'var(--color-error-bg)',
            border: '1px solid var(--color-error-border)',
            borderRadius: 'var(--radius)',
            padding: '12px 16px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <p className="text-xs text-muted">Error details</p>
          <p className="text-sm mt-8" style={{ color: 'var(--error)' }}>
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
