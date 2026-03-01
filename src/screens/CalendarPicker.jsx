import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

const GROUP_COLOUR = 'var(--group-lavender)'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa']

// Activity/vibe tags merged into this screen from the old ActivityPreferences screen
const ACTIVITY_OPTIONS = [
  { id: 'dinner',     label: 'Dinner out' },
  { id: 'drinks',     label: 'Drinks'     },
  { id: 'casual',     label: 'Casual'     },
  { id: 'activities', label: 'Activities' },
  { id: 'brunch',     label: 'Brunch'     },
]

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

  const [selected, setSelected] = useState([])      // ISO date strings (up to 3)
  const [activities, setActivities] = useState([])   // up to 2 activity IDs

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

  const toggleActivity = (id) => {
    setActivities(prev => {
      if (prev.includes(id)) return prev.filter(a => a !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  const dateCount = selected.length
  const canContinue = dateCount >= 3 && activities.length >= 1

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
    navigate('/time-picker', { state: { dates, activities } })
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 48 }}>
        <BackButton to="/respond" />
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Uni Friends
        </p>
        <h1 style={{ marginTop: 6 }}>Pick your 3 best dates</h1>
        <p style={{ marginTop: 6, fontSize: 13, color: 'var(--ink-secondary)' }}>
          Choose up to 3 weekend dates (Fri–Sun) — we'll find one that works for everyone.
        </p>
      </div>

      {/* Progress */}
      <div style={{ marginTop: 16 }}>
        <SegmentedBar total={2} current={1} counterText={`${dateCount}/3 dates`} />
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
                color: 'var(--ink-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 10,
              }}>
                {MONTH_NAMES[month]} {year}
              </p>

              {/* Day-of-week headers — only Fri/Sat/Sun highlighted */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
                {DAY_LABELS.map(d => (
                  <div
                    key={d}
                    style={{
                      textAlign: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: (d === 'Fr' || d === 'Sa' || d === 'Su')
                        ? 'var(--ink-secondary)'
                        : 'var(--ink-faint)',
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
                  const isMaxed = !isSelected && dateCount >= 3
                  const disabled = isPast || !isWknd || isMaxed

                  let bg = 'transparent'
                  let color = 'var(--ink-faint)'
                  let border = 'none'

                  if (isSelected) {
                    bg = GROUP_COLOUR
                    color = 'var(--ink-primary)'
                    border = 'none'
                  } else if (!isPast && isWknd && !isMaxed) {
                    color = 'var(--ink-primary)'
                    bg = 'transparent'
                  } else if (!isPast && isWknd && isMaxed) {
                    color = 'var(--ink-muted)'
                  }

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
                        fontSize: 14,
                        fontWeight: isWknd && !isPast ? 600 : 400,
                        cursor: disabled ? 'default' : 'pointer',
                        background: bg,
                        color,
                        border,
                        transition: 'all var(--duration-fast) var(--ease-out)',
                        userSelect: 'none',
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

      {/* Activity / vibe tags — merged from old ActivityPreferences screen */}
      <div style={{ marginTop: 28 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-primary)', marginBottom: 10 }}>
          What's your vibe? <span style={{ fontWeight: 400, color: 'var(--ink-muted)' }}>Pick up to 2</span>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ACTIVITY_OPTIONS.map(a => {
            const isSelected = activities.includes(a.id)
            const isMaxed = !isSelected && activities.length >= 2
            return (
              <span
                key={a.id}
                className={`chip ${isSelected ? 'chip-selected' : 'chip-outline'}`}
                onClick={() => !isMaxed && toggleActivity(a.id)}
                style={{ opacity: isMaxed ? 0.4 : 1, cursor: isMaxed ? 'default' : 'pointer' }}
              >
                {a.label}
              </span>
            )
          })}
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Button disabled={!canContinue} onClick={handleContinue}>
          Pick times →
        </Button>
      </div>
    </Screen>
  )
}
