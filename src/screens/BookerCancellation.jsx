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
  partySize:  4,
}

const MOCK_CANCELLATION = {
  name: 'Alex',
}

export default function BookerCancellation() {
  const navigate  = useNavigate()
  const [copied, setCopied]     = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const copyConfirmation = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (dismissed) {
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
            ✅
          </div>
          <div>
            <h2>All noted</h2>
            <p className="text-muted mt-8" style={{ maxWidth: 280, margin: '8px auto 0' }}>
              We've recorded the change. The hangout is still on with 3 people!
            </p>
          </div>
          <Button onClick={() => navigate('/group-detail')}>Back to event</Button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/group-detail" />
      </div>

      {/* Alert banner */}
      <div className="alert alert-warning" style={{ marginTop: 16 }}>
        <span>⚠️</span>
        <p style={{ fontWeight: 600, fontSize: 14 }}>
          {MOCK_CANCELLATION.name} can't make it!
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h1>Someone can't make it</h1>
      </div>

      {/* Event summary */}
      <div className="card" style={{ marginTop: 16 }}>
        <p style={{ fontWeight: 600 }}>{MOCK_EVENT.venue}</p>
        <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginTop: 4 }}>
          {MOCK_EVENT.day} · {MOCK_EVENT.time}
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4 }}>
          Confirmation #: {MOCK_EVENT.confirmNum}
        </p>
      </div>

      {/* Who cancelled */}
      <div className="alert alert-error" style={{ marginTop: 16 }}>
        <span>❌</span>
        <div>
          <p style={{ fontSize: 14 }}><strong>{MOCK_CANCELLATION.name}</strong> can't attend</p>
          <p style={{ fontSize: 13, marginTop: 4 }}>
            Party size: <strong>3 people</strong>{' '}
            <span style={{ opacity: 0.7 }}>(was {MOCK_EVENT.partySize}, now 1 cancelled)</span>
          </p>
        </div>
      </div>

      {/* Options */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Option 1: Contact OpenTable */}
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 14 }}>Contact OpenTable to adjust</p>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 6, lineHeight: 1.5 }}>
            Reduce the party size to 3. Have your confirmation number ready:
          </p>
          <div style={{
            marginTop: 10, display: 'flex', alignItems: 'center',
            background: 'var(--bg-ui)', borderRadius: 6, padding: '8px 12px',
            border: '1px solid var(--border-strong)',
          }}>
            <p style={{ flex: 1, fontWeight: 700, fontSize: 16, fontFamily: 'monospace', color: 'var(--ink-primary)' }}>
              #{MOCK_EVENT.confirmNum}
            </p>
            <button
              onClick={copyConfirmation}
              style={{
                background: copied ? 'var(--color-success-bg)' : 'var(--bg-ui)',
                border: `1px solid ${copied ? 'var(--color-success-border)' : 'var(--border-strong)'}`,
                borderRadius: 6, padding: '5px 12px',
                color: copied ? 'var(--color-success-text)' : 'var(--ink-primary)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <button
              onClick={() => { window.location.href = 'mailto:?subject=OpenTable%20booking%20cancellation' }}
              style={{
                flex: 1, height: 36, borderRadius: 6,
                background: 'transparent', border: '1px solid var(--border-strong)',
                color: 'var(--ink-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              📧 Email OpenTable
            </button>
            <button
              onClick={() => { window.open('https://www.opentable.com/contact-us', '_blank', 'noopener,noreferrer') }}
              style={{
                flex: 1, height: 36, borderRadius: 6,
                background: 'transparent', border: '1px solid var(--border-strong)',
                color: 'var(--ink-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              📞 Call OpenTable
            </button>
          </div>
        </div>

        {/* Option 2: Invite someone else */}
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 14 }}>Invite someone else</p>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 6 }}>
            Want to fill {MOCK_CANCELLATION.name}'s spot?
          </p>
          <div style={{ marginTop: 10 }}>
            <Button variant="secondary" onClick={() => navigate('/invite-friends')}>
              + Invite a friend
            </Button>
          </div>
        </div>

        {/* Option 3: Dismiss */}
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 14 }}>It's fine, we'll manage</p>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 6 }}>
            We've noted the change. No action needed.
          </p>
          <div style={{ marginTop: 10 }}>
            <Button variant="ghost" onClick={() => setDismissed(true)}>
              Dismiss
            </Button>
          </div>
        </div>

      </div>
    </Screen>
  )
}
