import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'

export default function InviteFriends() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [invited, setInvited] = useState([])

  const addEmail = () => {
    if (email.trim() && !invited.includes(email.trim())) {
      setInvited(prev => [...prev, email.trim()])
      setEmail('')
    }
  }

  const remove = (e) => setInvited(prev => prev.filter(x => x !== e))

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/create-group" />
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
        <div className="progress-dots">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`dot ${i <= 2 ? 'done' : 'active'}`} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Add your people</h1>
          <p className="text-muted mt-8">Invite friends by email. They'll get a link to join your group.</p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Input
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={addEmail}
            style={{
              height: 48, width: 48, flexShrink: 0,
              background: 'var(--coral)', border: 'none',
              borderRadius: 'var(--radius)', color: '#fff',
              fontSize: 24, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            +
          </button>
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
                  style={{ background: 'none', border: 'none', color: 'var(--taupe)', cursor: 'pointer', fontSize: 18 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => navigate('/home')}>
          {invited.length > 0 ? `Send ${invited.length} invite${invited.length > 1 ? 's' : ''}` : 'Continue'}
        </Button>
        {invited.length === 0 && (
          <Button variant="ghost" onClick={() => navigate('/home')}>
            Skip for now
          </Button>
        )}
      </div>
    </Screen>
  )
}
