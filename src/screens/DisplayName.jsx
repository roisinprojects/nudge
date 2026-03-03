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
        <SegmentedBar total={5} current={3} />
      </div>

      {/* ── Form ── */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1>What should we call you?</h1>
          <p className="text-muted mt-8">This is how you'll appear to your groups.</p>
        </div>

        <Input
          label="Display name"
          placeholder="e.g. Sarah"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Button disabled={!name.trim()} onClick={() => navigate('/create-group')}>
          Continue
        </Button>
      </div>

    </Screen>
  )
}
