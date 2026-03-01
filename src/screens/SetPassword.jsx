import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

export default function SetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const strong = password.length >= 8
  const matches = password === confirm && confirm.length > 0

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/signup" />
      </div>

      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={2} />
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Secure your account</h1>
          <p className="text-muted mt-8">Choose a password to protect your account.</p>
        </div>

        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {password.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: -12 }}>
            <div style={{
              height: 4, flex: 1, borderRadius: 2,
              background: strong ? 'var(--semantic-success)' : 'var(--semantic-error)'
            }} />
            <span className="text-xs" style={{ color: strong ? 'var(--semantic-success)' : 'var(--semantic-error)' }}>
              {strong ? 'Strong' : 'Too short'}
            </span>
          </div>
        )}

        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        {confirm.length > 0 && !matches && (
          <p className="text-xs text-error" style={{ marginTop: -12 }}>Passwords don't match</p>
        )}

        <Button
          disabled={!(strong && matches)}
          onClick={() => navigate('/display-name')}
        >
          Continue
        </Button>
      </div>
    </Screen>
  )
}
