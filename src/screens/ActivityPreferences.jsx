import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const ACTIVITIES = [
  { id: 'food',        label: 'Food',          icon: '🍽️',    desc: 'Restaurant, no drinks'          },
  { id: 'food_drinks', label: 'Food + Drinks',  icon: '🍽️🍷',  desc: 'Dinner with drinks'             },
  { id: 'drinks',      label: 'Drinks',         icon: '🍷',    desc: 'Bar only, no meal'              },
  { id: 'suggest',     label: 'Suggest',        icon: '❓',    desc: "I'm flexible, whatever fits"    },
]

export default function ActivityPreferences() {
  const navigate  = useNavigate()
  const [selected, setSelected] = useState(null) // single selection

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/time-picker" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Pick an activity</h1>
        <p className="text-muted mt-8">What are you in the mood for?</p>
      </div>

      {/* Step indicator */}
      <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
        {[1, 2, 3].map(step => (
          <div
            key={step}
            style={{
              flex: 1, height: 4, borderRadius: 2,
              background: step <= 3 ? (step === 3 ? (selected ? 'var(--success)' : 'var(--coral)') : 'var(--success)') : '#2a2a2a',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 6 }}>Step 3 of 3</p>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ACTIVITIES.map(a => {
          const isSelected = selected === a.id
          return (
            <div
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                background: isSelected ? 'rgba(232,93,77,0.10)' : 'var(--surface)',
                border: `1.5px solid ${isSelected ? 'var(--coral)' : '#2a2a2a'}`,
                borderRadius: 'var(--radius)',
                padding: '18px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: isSelected ? 'var(--text)' : 'var(--text-muted)' }}>
                  {a.label}
                </p>
                <p style={{ fontSize: 13, color: 'var(--taupe)', marginTop: 3 }}>{a.desc}</p>
              </div>
              {/* Radio indicator */}
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: `2px solid ${isSelected ? 'var(--coral)' : '#444'}`,
                background: isSelected ? 'var(--coral)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="alert alert-warning" style={{ marginBottom: 16 }}>
          <span>🔒</span>
          <p style={{ fontSize: 13 }}>
            Your choices are completely hidden until matching is done. No anchoring bias.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="ghost" half onClick={() => navigate('/time-picker')}>
            ← Back
          </Button>
          <Button half disabled={!selected} onClick={() => navigate('/response-locked')}>
            Lock in →
          </Button>
        </div>
      </div>
    </Screen>
  )
}
