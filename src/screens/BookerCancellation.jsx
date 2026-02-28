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
      <div style={{
        marginTop: 16,
        background: 'var(--color-warning-bg)',
        border: '1px solid var(--color-warning-border)',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <p style={{ fontWeight: 600, color: 'var(--warning)', fontSize: 14 }}>
          {MOCK_CANCELLATION.name} can't make it!
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h1>Someone can't make it</h1>
      </div>

      {/* Event summary */}
      <div style={{
        marginTop: 16,
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        padding: '14px 16px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <p style={{ fontWeight: 600 }}>{MOCK_EVENT.venue}</p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
          {MOCK_EVENT.day} · {MOCK_EVENT.time}
        </p>
        <p style={{ fontSize: 13, color: 'var(--taupe)', marginTop: 4 }}>
          Confirmation #: {MOCK_EVENT.confirmNum}
        </p>
      </div>

      {/* Who cancelled */}
      <div style={{
        marginTop: 16,
        padding: '14px 16px',
        background: 'var(--color-error-bg)',
        border: '1px solid var(--color-error-border)',
        borderRadius: 'var(--radius)',
      }}>
        <p style={{ fontSize: 14 }}>
          ❌ <strong>{MOCK_CANCELLATION.name}</strong> can't attend
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
          Party size: <strong>3 people</strong>{' '}
          <span style={{ color: 'var(--taupe)' }}>(was {MOCK_EVENT.partySize}, now 1 cancelled)</span>
        </p>
      </div>

      {/* Options */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Option 1: Contact OpenTable */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <p style={{ fontWeight: 600, fontSize: 14 }}>Contact OpenTable to adjust</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>
            Reduce the party size to 3. Have your confirmation number ready:
          </p>
          <div style={{
            marginTop: 10, display: 'flex', alignItems: 'center',
            background: 'var(--surface2)', borderRadius: 6, padding: '8px 12px',
            border: '1px solid #2a2a2a',
          }}>
            <p style={{ flex: 1, fontWeight: 700, fontSize: 16, fontFamily: 'monospace', color: 'var(--text)' }}>
              #{MOCK_EVENT.confirmNum}
            </p>
            <button
              onClick={copyConfirmation}
              style={{
                background: copied ? 'rgba(5,46,22,0.9)' : 'rgba(232,93,77,0.15)',
                border: `1px solid ${copied ? 'var(--color-success-border)' : 'rgba(232,93,77,0.3)'}`,
                borderRadius: 6, padding: '5px 12px',
                color: copied ? 'var(--success)' : 'var(--coral)',
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
                background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.10)',
                color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              📧 Email OpenTable
            </button>
            <button
              onClick={() => { window.open('https://www.opentable.com/contact-us', '_blank', 'noopener,noreferrer') }}
              style={{
                flex: 1, height: 36, borderRadius: 6,
                background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.10)',
                color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              📞 Call OpenTable
            </button>
          </div>
        </div>

        {/* Option 2: Invite someone else */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <p style={{ fontWeight: 600, fontSize: 14 }}>Invite someone else</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
            Want to fill {MOCK_CANCELLATION.name}'s spot?
          </p>
          <button
            onClick={() => navigate('/invite-friends')}
            style={{
              marginTop: 10, width: '100%', height: 40,
              background: 'transparent', border: '1px solid var(--coral)',
              borderRadius: 6, color: 'var(--coral)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            + Invite a friend
          </button>
        </div>

        {/* Option 3: Dismiss */}
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <p style={{ fontWeight: 600, fontSize: 14 }}>It's fine, we'll manage</p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
            We've noted the change. No action needed.
          </p>
          <button
            onClick={() => setDismissed(true)}
            style={{
              marginTop: 10, width: '100%', height: 40,
              background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: 6, color: 'var(--text-muted)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>

      </div>
    </Screen>
  )
}
