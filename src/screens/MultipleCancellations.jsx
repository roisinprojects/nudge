import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const MOCK_EVENT = {
  day:        'Saturday, 15 March',
  time:       '7pm',
  venue:      'The Ivy',
  cuisine:    'Modern European',
  confirmNum: '12345',
  totalSize:  4,
}

const MOCK_CANCELLATIONS = ['Alex', 'Jordan']

export default function MultipleCancellations() {
  const navigate = useNavigate()
  const [view, setView] = useState('main') // 'main' | 'reschedule-confirm' | 'rescheduled' | 'proceeding'
  const [copied, setCopied] = useState(false)

  const remaining = MOCK_EVENT.totalSize - MOCK_CANCELLATIONS.length

  const copyConfirmation = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (view === 'rescheduled') {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton to="/home" />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, paddingBottom: 40,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
          }}>
            🔄
          </div>
          <div>
            <h2>Hangout rescheduled</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              We'll nudge the group again in 6 weeks. Don't forget to cancel the reservation at The Ivy.
            </p>
          </div>
          <div className="alert alert-warning" style={{ textAlign: 'left' }}>
            <span>⚠️</span>
            <p style={{ fontSize: 13 }}>
              Cancel at The Ivy using confirmation #{MOCK_EVENT.confirmNum} to avoid any no-show charges.
            </p>
          </div>
          <Button onClick={() => navigate('/home')}>Back to home</Button>
        </div>
      </Screen>
    )
  }

  if (view === 'proceeding') {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton to="/group-detail" />
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, paddingBottom: 40,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
          }}>
            🎉
          </div>
          <div>
            <h2>It's on!</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              Going ahead with {remaining} people. Have a great time!
            </p>
          </div>
          <Button onClick={() => navigate('/group-detail')}>Back to event</Button>
        </div>
      </Screen>
    )
  }

  if (view === 'reschedule-confirm') {
    return (
      <Screen style={{ paddingBottom: 40 }}>
        <div style={{ paddingTop: 56 }}>
          <BackButton onClick={() => setView('main')} />
        </div>

        <div style={{ marginTop: 24 }}>
          <h1>Reschedule?</h1>
          <p className="text-muted mt-8">This will cancel the current hangout.</p>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <p style={{ fontWeight: 600, marginBottom: 12 }}>Are you sure? This will:</p>
          {[
            'Cancel this booking in Nudge',
            'Not send calendar invites to anyone',
            'Reset to a new nudge cycle (6 weeks)',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-error-text)', fontWeight: 700, flexShrink: 0 }}>✕</span>
              <p style={{ fontSize: 14, color: 'var(--ink-secondary)' }}>{item}</p>
            </div>
          ))}
        </div>

        <div className="alert alert-warning" style={{ marginTop: 16 }}>
          <span>⚠️</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              You'll need to cancel the reservation yourself
            </p>
            <p style={{ fontSize: 13 }}>
              Contact The Ivy with your confirmation number:
            </p>
            <div style={{
              marginTop: 8, display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--bg-ui)', borderRadius: 6, padding: '8px 12px',
              border: '1px solid var(--border-strong)',
            }}>
              <p style={{ flex: 1, fontWeight: 700, fontFamily: 'monospace', fontSize: 16, color: 'var(--ink-primary)' }}>
                #{MOCK_EVENT.confirmNum}
              </p>
              <button
                onClick={copyConfirmation}
                style={{
                  background: copied ? 'var(--color-success-bg)' : 'var(--bg-ui)',
                  border: `1px solid ${copied ? 'var(--color-success-border)' : 'var(--border-strong)'}`,
                  borderRadius: 6, padding: '5px 12px',
                  color: copied ? 'var(--color-success-text)' : 'var(--ink-primary)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={() => setView('rescheduled')}>
            Yes, reschedule
          </Button>
          <Button variant="ghost" onClick={() => setView('main')}>
            No, keep it
          </Button>
        </div>
      </Screen>
    )
  }

  // Main view
  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/group-detail" />
      </div>

      {/* Alert banner */}
      <div className="alert alert-warning" style={{ marginTop: 16 }}>
        <span>⚠️</span>
        <p style={{ fontWeight: 600, fontSize: 14 }}>
          Multiple cancellations! {MOCK_CANCELLATIONS.length} people can't make it.
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h1>Heads up</h1>
      </div>

      {/* Event */}
      <div className="card" style={{ marginTop: 16 }}>
        <p style={{ fontWeight: 600 }}>{MOCK_EVENT.venue}</p>
        <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginTop: 4 }}>
          {MOCK_EVENT.day} · {MOCK_EVENT.time}
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4 }}>
          Confirmation #: {MOCK_EVENT.confirmNum}
        </p>
      </div>

      {/* Cancellations */}
      <div className="alert alert-error" style={{ marginTop: 12, flexDirection: 'column', alignItems: 'flex-start' }}>
        {MOCK_CANCELLATIONS.map(name => (
          <p key={name} style={{ fontSize: 14, marginBottom: 4 }}>
            ❌ <strong>{name}</strong> can't attend
          </p>
        ))}
        <p style={{ fontSize: 13, marginTop: 6, opacity: 0.8 }}>
          Party size now: <strong>{remaining} people</strong>{' '}
          <span>(was {MOCK_EVENT.totalSize})</span>
        </p>
      </div>

      {/* Recommendation */}
      <div className="alert alert-warning" style={{ marginTop: 12 }}>
        <span>💡</span>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600 }}>
            With only {remaining} people, you might want to reschedule.
          </p>
          <p style={{ fontSize: 13, marginTop: 4 }}>
            Check with the remaining attendees first.
          </p>
        </div>
      </div>

      {/* Options */}
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Option 1 */}
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 14 }}>Adjust reservation</p>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4 }}>
            Contact OpenTable to reduce to {remaining} people
          </p>
          <div style={{
            marginTop: 10, display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--bg-ui)', borderRadius: 6, padding: '8px 12px',
            border: '1px solid var(--border-strong)',
          }}>
            <p style={{ flex: 1, fontWeight: 700, fontFamily: 'monospace', fontSize: 15, color: 'var(--ink-primary)' }}>
              #{MOCK_EVENT.confirmNum}
            </p>
            <button
              onClick={copyConfirmation}
              style={{
                background: copied ? 'var(--color-success-bg)' : 'var(--bg-ui)',
                border: `1px solid ${copied ? 'var(--color-success-border)' : 'var(--border-strong)'}`,
                borderRadius: 6, padding: '5px 12px',
                color: copied ? 'var(--color-success-text)' : 'var(--ink-primary)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button style={{
              flex: 1, height: 36, borderRadius: 6,
              background: 'transparent', border: '1px solid var(--border-strong)',
              color: 'var(--ink-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
              📧 Email OpenTable
            </button>
            <button style={{
              flex: 1, height: 36, borderRadius: 6,
              background: 'transparent', border: '1px solid var(--border-strong)',
              color: 'var(--ink-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
              📞 Call OpenTable
            </button>
          </div>
        </div>

        {/* Option 2 */}
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 14 }}>Reschedule hangout</p>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4 }}>
            Cancel this booking and try again next cycle.
          </p>
          <div style={{ marginTop: 10 }}>
            <Button variant="secondary" onClick={() => setView('reschedule-confirm')}>
              Reschedule →
            </Button>
          </div>
        </div>

        {/* Option 3 */}
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 14 }}>Proceed as is</p>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 4 }}>
            It's fine — we'll make it work with {remaining} people.
          </p>
          <div style={{ marginTop: 10 }}>
            <Button variant="ghost" onClick={() => setView('proceeding')}>
              Proceed
            </Button>
          </div>
        </div>

      </div>
    </Screen>
  )
}
