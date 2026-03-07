import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import Input from '../components/Input'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

export default function CreateGroup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const suggestions = ['The Crew', 'Friday Fam', 'The Usual Suspects', 'Weekend Warriors']

  return (
    <Screen>

      {/* ── Header: back left, Log in right ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 }}>
        <BackButton to="/display-name" />
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--ink-secondary)', padding: '4px 0' }}
        >
          Log in
        </button>
      </div>

      {/* ── Progress ── */}
      <div style={{ marginTop: 24 }}>
        <SegmentedBar total={5} current={4} />
      </div>

      {/* ── Form ── */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1>Name your first group</h1>
          <p className="text-muted mt-8">Give your friend group a name. You can always change it later.</p>
        </div>

        <Input
          label="Group name"
          placeholder="e.g. The Crew"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div>
          <p className="text-sm text-muted mb-8">Suggestions</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map(s => (
              <span
                key={s}
                className={`chip ${name === s ? 'chip-selected' : 'chip-outline'}`}
                onClick={() => setName(s)}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
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
        <Button
          disabled={!name.trim()}
          onClick={() => navigate('/invite-friends')}
        >
          Continue
        </Button>
      </div>

    </Screen>
  )
}
