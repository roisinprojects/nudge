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

      {/* ── Header: back left, Log in right ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
        <BackButton to="/signup" />
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--ink-secondary)', padding: '4px 0' }}
        >
          Log in
        </button>
      </div>

      {/* ── Progress ── */}
      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={2} />
      </div>

      {/* ── Form ── */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1>Secure your account</h1>
          <p className="text-muted mt-8">Choose a password to protect your account.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                height: 3, flex: 1, borderRadius: 2,
                background: strong ? 'var(--semantic-success)' : 'var(--semantic-error)'
              }} />
              <span className="text-xs" style={{ color: strong ? 'var(--semantic-success)' : 'var(--semantic-error)' }}>
                {strong ? 'Strong' : 'Too short'}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Input
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          {confirm.length > 0 && !matches && (
            <p className="text-xs" style={{ color: 'var(--semantic-error)' }}>Passwords don't match</p>
          )}
        </div>

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
