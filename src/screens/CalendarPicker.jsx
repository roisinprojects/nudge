import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const TIMES = [
  { timeSlot: 'afternoon', displayTime: '3pm' },
  { timeSlot: 'evening',   displayTime: '7pm' },
  { timeSlot: 'night',     displayTime: '10pm' },
]

function getWeekendSlots() {
  const slots = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)

  let weekendDays = 0
  while (weekendDays < 18) {
    const dow = d.getDay()
    if (dow === 5 || dow === 6 || dow === 0) {
      const iso = d.toISOString().split('T')[0]
      const dayName = dow === 5 ? 'Fri' : dow === 6 ? 'Sat' : 'Sun'
      const fmtDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      TIMES.forEach(t => {
        slots.push({
          id: `${iso}-${t.timeSlot}`,
          date: iso,
          dayName,
          fmtDate,
          displayTime: t.displayTime,
        })
      })
      weekendDays++
    }
    d.setDate(d.getDate() + 1)
  }
  return slots
}

export default function CalendarPicker() {
  const navigate = useNavigate()
  const slots = getWeekendSlots()
  const [selected, setSelected] = useState(new Set())

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 3) {
        next.add(id)
      }
      return next
    })
  }

  const count = selected.size

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/respond" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Pick 3 time slots</h1>
        <p className="text-muted mt-8">Weekends only. Select up to 3.</p>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 4, background: '#2a2a2a', borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              width: `${(count / 3) * 100}%`,
              height: '100%',
              background: count === 3 ? 'var(--success)' : 'var(--coral)',
              borderRadius: 2,
              transition: 'width 0.2s, background 0.2s',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: count === 3 ? 'var(--success)' : 'var(--text-muted)',
            whiteSpace: 'nowrap',
            minWidth: 68,
            textAlign: 'right',
            transition: 'color 0.2s',
          }}
        >
          {count}/3 selected
        </span>
      </div>

      {/* Slot list */}
      <div style={{ marginTop: 12, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {slots.map(s => {
          const isSelected = selected.has(s.id)
          const disabled = !isSelected && count >= 3

          return (
            <div
              key={s.id}
              onClick={() => !disabled && toggle(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 'var(--radius)',
                border: `1.5px solid ${isSelected ? 'var(--coral)' : '#242424'}`,
                background: isSelected ? 'rgba(232,93,77,0.08)' : 'var(--surface)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.35 : 1,
                transition: 'border-color 0.12s, background 0.12s, opacity 0.12s',
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: `2px solid ${isSelected ? 'var(--coral)' : '#444'}`,
                  background: isSelected ? 'var(--coral)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.12s',
                }}
              >
                {isSelected && (
                  <span style={{ color: '#fff', fontSize: 12, lineHeight: 1, fontWeight: 700 }}>✓</span>
                )}
              </div>

              {/* Day badge */}
              <span
                style={{
                  background: isSelected ? 'rgba(232,93,77,0.18)' : 'var(--surface2)',
                  color: isSelected ? 'var(--coral)' : 'var(--taupe)',
                  borderRadius: 6,
                  padding: '3px 8px',
                  fontSize: 12,
                  fontWeight: 700,
                  minWidth: 32,
                  textAlign: 'center',
                  flexShrink: 0,
                  transition: 'all 0.12s',
                }}
              >
                {s.dayName}
              </span>

              {/* Date + time label */}
              <span
                style={{
                  fontSize: 14,
                  color: isSelected ? 'var(--text)' : 'var(--text-muted)',
                  flex: 1,
                  transition: 'color 0.12s',
                }}
              >
                {s.fmtDate}
              </span>

              {/* Time */}
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: isSelected ? 'var(--coral)' : 'var(--taupe)',
                  transition: 'color 0.12s',
                }}
              >
                {s.displayTime}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ paddingTop: 16 }}>
        <Button disabled={count < 3} onClick={() => navigate('/activity-preferences')}>
          Continue →
        </Button>
      </div>
    </Screen>
  )
}
