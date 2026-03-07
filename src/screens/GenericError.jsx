import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

export default function GenericError() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
          paddingTop: 24,
        }}
      >
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
      </div>

      {/* ── Sticky footer ── */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'var(--bg-primary)',
        padding: '16px 16px 32px',
        margin: '0 -16px',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', flexDirection: 'column', gap: 12,
        marginTop: 24,
      }}>
        <Button onClick={() => navigate(-1)}>
          Try again
        </Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <p className="text-xs text-muted" style={{ textAlign: 'center' }}>
          Still stuck? Email us at{' '}
          <span style={{ color: 'var(--coral)' }}>help@nudge.app</span>
        </p>
      </div>
    </Screen>
  )
}
