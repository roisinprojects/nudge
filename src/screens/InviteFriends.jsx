import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'
import Icon from '../components/Icon'

const MY_EMAIL = 'you@example.com'
const INVITE_LINK = 'https://nudgehangouts.app/join/grp-demo'

export default function InviteFriends() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('email')
  const [email, setEmail] = useState('')
  const [invited, setInvited] = useState([])
  const [inputError, setInputError] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)

  const addEmail = () => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return
    if (trimmed === MY_EMAIL.toLowerCase()) {
      setInputError("You can't invite yourself")
      return
    }
    if (invited.map(e => e.toLowerCase()).includes(trimmed)) {
      setInputError('This email has already been added')
      return
    }
    setInvited(prev => [...prev, email.trim()])
    setEmail('')
    setInputError('')
  }

  const remove = (e) => setInvited(prev => prev.filter(x => x !== e))

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(INVITE_LINK).catch(() => {})
    setLinkCopied(true)
    setTimeout(() => navigate('/home'), 1000)
  }

  return (
    <Screen>

      {/* ── Header: back left, Log in right ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
        <BackButton to="/create-group" />
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--ink-secondary)', padding: '4px 0' }}
        >
          Log in
        </button>
      </div>

      {/* ── Progress ── */}
      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={5} />
      </div>

      {/* ── Heading ── */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <h1>Invite your people</h1>
        <p className="text-muted mt-8">Invite friends to join your group.</p>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        padding: 4,
        marginBottom: 20,
      }}>
        {['email', 'link'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              height: 36,
              border: 'none',
              borderRadius: 'calc(var(--radius-md) - 2px)',
              background: tab === t ? 'var(--bg-primary)' : 'transparent',
              color: tab === t ? 'var(--ink-primary)' : 'var(--ink-muted)',
              fontSize: 13,
              fontWeight: tab === t ? 600 : 500,
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {t === 'email' ? 'By email' : 'By link'}
          </button>
        ))}
      </div>

      {/* ── By email tab ── */}
      {tab === 'email' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setInputError('') }}
                  onKeyDown={e => e.key === 'Enter' && addEmail()}
                />
              </div>
              <button
                onClick={addEmail}
                style={{
                  height: 48, width: 48, flexShrink: 0,
                  background: 'var(--ink-primary)', border: 'none',
                  borderRadius: 'var(--radius-lg)', color: 'var(--btn-primary-fg)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Add email"
              >
                <Icon name="add" size={22} />
              </button>
            </div>
            {inputError && (
              <p className="text-xs" style={{ color: 'var(--semantic-error)', marginTop: 6 }}>{inputError}</p>
            )}
          </div>

          {invited.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p className="text-sm text-muted">Invited ({invited.length})</p>
              {invited.map(e => (
                <div
                  key={e}
                  className="card"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}
                >
                  <span className="text-sm">{e}</span>
                  <button
                    onClick={() => remove(e)}
                    style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    aria-label={`Remove ${e}`}
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── By link tab ── */}
      {tab === 'link' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="text-sm text-muted">Share this link with anyone you want to invite.</p>
          <div
            className="card"
            style={{ padding: '12px 16px', wordBreak: 'break-all' }}
          >
            <span style={{ fontSize: 13, color: 'var(--ink-secondary)', fontFamily: 'monospace' }}>
              {INVITE_LINK}
            </span>
          </div>
          <Button onClick={linkCopied ? undefined : handleCopyLink}>
            {linkCopied ? 'Link copied ✓' : 'Copy link'}
          </Button>
        </div>
      )}

      {/* ── Sticky footer: CTAs ── */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'var(--bg-primary)',
        padding: '16px 16px 32px',
        margin: '0 -16px',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', flexDirection: 'column', gap: 12,
        marginTop: 24,
      }}>
        <Button onClick={() => navigate('/home')}>
          Create group
        </Button>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Skip for now
        </Button>
      </div>

    </Screen>
  )
}
