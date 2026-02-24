import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const TIMES = ['Afternoon', 'Evening', 'Night']

// Generate the next 6 Fri/Sat/Sun dates from today
function getWeekendDates() {
  const days = []
  const d = new Date()
  while (days.length < 12) {
    d.setDate(d.getDate() + 1)
    const dow = d.getDay()
    if (dow === 5 || dow === 6 || dow === 0) {
      days.push(new Date(d))
    }
  }
  return days
}

function fmt(date) {
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function CalendarPicker() {
  const navigate = useNavigate()
  const dates = getWeekendDates()
  const [selected, setSelected] = useState({}) // { dateStr: 'Afternoon' | 'Evening' | 'Night' }

  const toggle = (dateStr) => {
    if (selected[dateStr]) {
      const s = { ...selected }
      delete s[dateStr]
      setSelected(s)
    } else if (Object.keys(selected).length < 3) {
      setSelected(prev => ({ ...prev, [dateStr]: 'Evening' }))
    }
  }

  const setTime = (dateStr, time) => {
    setSelected(prev => ({ ...prev, [dateStr]: time }))
  }

  const count = Object.keys(selected).length

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/respond" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Pick 3 dates</h1>
        <p className="text-muted mt-8">
          Choose up to 3 weekends you're free. Select a time of day for each.
        </p>
        <p className="mt-16" style={{ color: count === 3 ? 'var(--success)' : 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}>
          {count}/3 selected
        </p>
      </div>

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        {dates.map(d => {
          const key = d.toISOString().split('T')[0]
          const isSelected = !!selected[key]
          const disabled = !isSelected && count >= 3
          const dow = d.getDay()
          const dayLabel = dow === 5 ? 'Fri' : dow === 6 ? 'Sat' : 'Sun'

          return (
            <div key={key}>
              <div
                onClick={() => !disabled && toggle(key)}
                style={{
                  background: isSelected ? 'rgba(232,93,77,0.1)' : 'var(--surface)',
                  border: `1.5px solid ${isSelected ? 'var(--coral)' : disabled ? '#222' : '#2a2a2a'}`,
                  borderRadius: 'var(--radius)',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.4 : 1,
                  borderBottomLeftRadius: isSelected ? 0 : 'var(--radius)',
                  borderBottomRightRadius: isSelected ? 0 : 'var(--radius)',
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span
                    style={{
                      background: isSelected ? 'var(--coral)' : 'var(--surface2)',
                      color: isSelected ? '#fff' : 'var(--taupe)',
                      borderRadius: 6,
                      padding: '4px 8px',
                      fontSize: 12,
                      fontWeight: 700,
                      minWidth: 32,
                      textAlign: 'center',
                    }}
                  >
                    {dayLabel}
                  </span>
                  <span style={{ fontSize: 15 }}>{fmt(d)}</span>
                </div>
                {isSelected && <span style={{ color: 'var(--coral)', fontSize: 18 }}>✓</span>}
              </div>

              {isSelected && (
                <div
                  style={{
                    background: 'rgba(232,93,77,0.06)',
                    border: '1.5px solid var(--coral)',
                    borderTop: 'none',
                    borderBottomLeftRadius: 'var(--radius)',
                    borderBottomRightRadius: 'var(--radius)',
                    padding: '10px 16px',
                    display: 'flex',
                    gap: 8,
                  }}
                >
                  {TIMES.map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(key, t)}
                      style={{
                        flex: 1,
                        height: 32,
                        borderRadius: 6,
                        border: '1.5px solid',
                        borderColor: selected[key] === t ? 'var(--coral)' : '#444',
                        background: selected[key] === t ? 'var(--coral)' : 'transparent',
                        color: selected[key] === t ? '#fff' : 'var(--text-muted)',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 24, paddingBottom: 8 }}>
        <Button
          disabled={count < 3}
          onClick={() => navigate('/activity-preferences')}
        >
          Next: Activity preferences →
        </Button>
      </div>
    </Screen>
  )
}
