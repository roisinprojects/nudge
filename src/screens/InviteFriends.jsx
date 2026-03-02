import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'
import Icon from '../components/Icon'

// Mock — in production this would come from auth context
const MY_EMAIL = 'you@example.com'

export default function InviteFriends() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [invited, setInvited] = useState([])
  const [inputError, setInputError] = useState('')

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

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/create-group" />
      </div>

      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={5} />
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Add your people</h1>
          <p className="text-sm text-muted" style={{ marginTop: 4 }}>Invite friends by email. They'll get a link to join your group.</p>
        </div>

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
                borderRadius: 'var(--radius)', color: 'var(--btn-primary-fg)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
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
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: 40 }}>
        <Button
          disabled={invited.length === 0}
          onClick={() => navigate('/home')}
        >
          {invited.length > 0 ? `Send ${invited.length} invite${invited.length > 1 ? 's' : ''}` : 'Send invites'}
        </Button>
      </div>
    </Screen>
  )
}
