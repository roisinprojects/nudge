import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

export default function DisplayName() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  return (
    <Screen>

      {/* ── Header: back left, Log in right ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
        <BackButton to="/set-password" />
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--ink-secondary)', padding: '4px 0' }}
        >
          Log in
        </button>
      </div>

      {/* ── Progress ── */}
      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={3} current={3} />
      </div>

      {/* ── Form ── */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1>What should we call you?</h1>
          <p className="text-muted mt-8">This is how your friends will see you.</p>
        </div>

        <Input
          label="Your name"
          placeholder="e.g. Sarah Murphy"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* ── Sticky footer ── */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'var(--bg-primary)',
        padding: '16px 16px 32px',
        margin: '0 -16px',
        borderTop: '1px solid var(--border-default)',
        marginTop: 16,
      }}>
        <Button disabled={!name.trim()} onClick={() => navigate('/home')}>
          Continue
        </Button>
      </div>

    </Screen>
  )
}
