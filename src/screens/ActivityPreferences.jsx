import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

const ACTIVITIES = [
  { id: 'food',        label: 'Food',          icon: '🍽️',    desc: 'Restaurant, no drinks'          },
  { id: 'food_drinks', label: 'Food + Drinks',  icon: '🍽️🍷',  desc: 'Dinner with drinks'             },
  { id: 'drinks',      label: 'Drinks',         icon: '🍷',    desc: 'Bar only, no meal'              },
  { id: 'suggest',     label: 'Flexible',       icon: '❓',    desc: "Whatever fits the group"       },
]

export default function ActivityPreferences() {
  const navigate       = useNavigate()
  const { state }      = useLocation()
  const [activities, setActivities] = useState([]) // ordered: first pick = [0], second = [1]

  const toggle = (id) => {
    setActivities(prev => {
      if (prev.includes(id)) return prev.filter(a => a !== id)
      if (prev.length >= 2) return prev // max 2
      return [...prev, id]
    })
  }

  const count = activities.length

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/time-picker" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>What's the vibe?</h1>
        <p className="text-muted mt-8">Pick up to 2 — helps us find the right spot.</p>
      </div>

      {/* Step indicator */}
      <div style={{ marginTop: 16 }}>
        <SegmentedBar total={3} current={3} counterText={`${count}/2 selected`} />
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ACTIVITIES.map(a => {
          const selIndex  = activities.indexOf(a.id)
          const isSelected = selIndex !== -1
          const isMaxed   = !isSelected && count >= 2
          return (
            <div
              key={a.id}
              onClick={() => !isMaxed && toggle(a.id)}
              style={{
                background: isSelected ? 'var(--bg-ui)' : 'var(--bg-card)',
                border: `1px solid ${isSelected ? 'var(--ink-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '18px 16px',
                cursor: isMaxed ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                opacity: isMaxed ? 0.45 : 1,
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
              {/* Selection order badge */}
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: `2px solid ${isSelected ? 'var(--ink-primary)' : 'var(--border-strong)'}`,
                background: isSelected ? 'var(--ink-primary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                fontSize: 12, fontWeight: 700, color: 'var(--btn-primary-fg)',
                transition: 'all 0.15s',
              }}>
                {isSelected ? selIndex + 1 : null}
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
          <Button
            half
            disabled={count === 0}
            onClick={() => navigate('/response-locked', { state: { ...state, activities } })}
          >
            Lock in →
          </Button>
        </div>
      </div>
    </Screen>
  )
}
