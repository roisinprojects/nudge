import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const ACTIVITIES = [
  { id: 'drinks',    label: 'Drinks',        icon: '🍸', desc: 'Cocktail bar or pub' },
  { id: 'food',      label: 'Food & Drinks',  icon: '🍽️', desc: 'Restaurant with drinks' },
  { id: 'suggest',   label: 'Suggest',        icon: '🎲', desc: 'I\'m easy, surprise me' },
]

export default function ActivityPreferences() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(x => x !== id))
    } else if (selected.length < 2) {
      setSelected(prev => [...prev, id])
    }
  }

  const count = selected.length

  return (
    <Screen>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/calendar-picker" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>What are you up for?</h1>
        <p className="text-muted mt-8">
          Pick <span className="bold">2 activities</span>. Your choices are hidden from others — no social pressure.
        </p>
        <p className="mt-16" style={{ color: count === 2 ? 'var(--success)' : 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}>
          {count}/2 selected
        </p>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ACTIVITIES.map(a => {
          const isSelected = selected.includes(a.id)
          const disabled = !isSelected && count >= 2
          return (
            <div
              key={a.id}
              onClick={() => !disabled && toggle(a.id)}
              style={{
                background: isSelected ? 'rgba(232,93,77,0.1)' : 'var(--surface)',
                border: `1.5px solid ${isSelected ? 'var(--coral)' : disabled ? '#222' : '#2a2a2a'}`,
                borderRadius: 'var(--radius)',
                padding: '20px 16px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 32 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <p className="bold">{a.label}</p>
                <p className="text-sm text-muted">{a.desc}</p>
              </div>
              <div
                style={{
                  width: 22, height: 22,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--coral)' : '#444'}`,
                  background: isSelected ? 'var(--coral)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isSelected && <span style={{ color: '#fff', fontSize: 13 }}>✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="alert alert-warning" style={{ marginBottom: 16 }}>
          <span>🔒</span>
          <p className="text-sm">Your choices are completely hidden until the matching is done. No anchoring bias here.</p>
        </div>

        <Button
          disabled={count < 2}
          onClick={() => navigate('/response-locked')}
        >
          Lock in my response
        </Button>
      </div>
    </Screen>
  )
}
