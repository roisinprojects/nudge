import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function buildMonthGrid(year, month) {
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

function isWeekend(dow) { return dow === 0 || dow === 5 || dow === 6 }

function toISO(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function CalendarPicker() {
  const navigate = useNavigate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [selected, setSelected] = useState([]) // ISO strings

  // 3 months from current
  const months = []
  for (let i = 0; i < 3; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1)
    months.push({ year: d.getFullYear(), month: d.getMonth() })
  }

  const toggle = (iso) => {
    setSelected(prev => {
      if (prev.includes(iso)) return prev.filter(d => d !== iso)
      if (prev.length >= 3) return prev
      return [...prev, iso]
    })
  }

  const count = selected.length

  const handleContinue = () => {
    const dates = selected.map(iso => {
      const [y, m, d] = iso.split('-').map(Number)
      const date = new Date(y, m - 1, d)
      return {
        date: iso,
        dayName: date.toLocaleDateString('en-GB', { weekday: 'long' }),
        fmtDate: date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
      }
    })
    navigate('/time-picker', { state: { dates } })
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/respond" />
      </div>

      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: 1 }}>
          Uni Friends
        </p>
        <h1 style={{ marginTop: 6 }}>Pick 3 dates</h1>
        <p className="text-muted mt-8">Weekends only. Select up to 3.</p>
      </div>

      {/* Progress */}
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

      {/* Calendar months */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 28, overflowY: 'auto' }}>
        {months.map(({ year, month }) => {
          const cells = buildMonthGrid(year, month)
          return (
            <div key={`${year}-${month}`}>
              <p style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: 10,
              }}>
                {MONTH_NAMES[month]} {year}
              </p>

              {/* Day-of-week headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
                {DAY_LABELS.map(d => (
                  <div
                    key={d}
                    style={{
                      textAlign: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: (d === 'Fr' || d === 'Sa' || d === 'Su') ? 'var(--taupe)' : '#444',
                      padding: '2px 0',
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                {cells.map((day, i) => {
                  if (!day) return <div key={i} style={{ height: 38 }} />

                  const dow = new Date(year, month, day).getDay()
                  const isWknd = isWeekend(dow)
                  const date = new Date(year, month, day)
                  const isPast = date < today
                  const iso = toISO(year, month, day)
                  const isSelected = selected.includes(iso)
                  const isMaxed = !isSelected && count >= 3
                  const disabled = isPast || !isWknd || isMaxed

                  let bg = 'transparent'
                  let color = '#333'
                  if (isSelected) { bg = 'var(--coral)'; color = '#fff' }
                  else if (!isPast && isWknd && !isMaxed) { color = 'var(--text)' }
                  else if (!isPast && isWknd && isMaxed) { color = '#555' }

                  return (
                    <div
                      key={i}
                      onClick={() => !disabled && toggle(iso)}
                      style={{
                        height: 38,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isSelected ? 13 : 14,
                        fontWeight: isWknd && !isPast ? 600 : 400,
                        cursor: disabled ? 'default' : 'pointer',
                        background: bg,
                        color,
                        transition: 'all 0.12s',
                        userSelect: 'none',
                        border: isSelected ? 'none' : 'none',
                      }}
                    >
                      {isSelected ? '✓' : day}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ paddingTop: 20 }}>
        <Button disabled={count < 3} onClick={handleContinue}>
          Continue →
        </Button>
      </div>
    </Screen>
  )
}
