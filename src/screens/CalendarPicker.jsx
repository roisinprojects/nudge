import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Icon from '../components/Icon'


const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

// Activity/vibe tags
const ACTIVITY_OPTIONS = [
  { id: 'dinner',     label: 'Dinner out' },
  { id: 'drinks',     label: 'Drinks'     },
  { id: 'casual',     label: 'Casual'     },
  { id: 'activities', label: 'Activities' },
  { id: 'brunch',     label: 'Brunch'     },
]

// Return the upcoming Thursday on or after a given date
function nextThursday(from) {
  const d = new Date(from)
  const dow = d.getDay() // 0=Sun, 4=Thu
  const diff = (4 - dow + 7) % 7
  d.setDate(d.getDate() + diff)
  return d
}

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Build array of weeks. Each week = { monthLabel (or null), days: [Thu, Fri, Sat, Sun] }
function buildWeeks(today, numWeeks) {
  const start = nextThursday(today)
  const weeks = []
  let prevMonth = -1

  for (let w = 0; w < numWeeks; w++) {
    const thu = new Date(start)
    thu.setDate(start.getDate() + w * 7)

    const days = [0, 1, 2, 3].map(offset => {
      const d = new Date(thu)
      d.setDate(thu.getDate() + offset)
      return d
    })

    // Show month label when Thursday crosses into a new month
    const thuMonth = thu.getMonth()
    const monthLabel = thuMonth !== prevMonth ? MONTH_NAMES[thuMonth] + ' ' + thu.getFullYear() : null
    prevMonth = thuMonth

    weeks.push({ monthLabel, days })
  }
  return weeks
}

export default function CalendarPicker() {
  const navigate = useNavigate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [selected, setSelected] = useState([])      // ISO date strings (up to 3)
  const [activities, setActivities] = useState([])  // up to 2 activity IDs

  const weeks = buildWeeks(today, 8)  // 8 weeks shown
  const eightWeeksOut = new Date(today)
  eightWeeksOut.setDate(today.getDate() + 8 * 7)

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
    <Screen>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--bg-primary)',
        padding: '12px 16px 8px 16px',
        margin: '0 -16px',
      }}>
        <BackButton to="/respond" />
      </div>

      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Uni Friends
        </p>
        <h1 style={{ marginTop: 6 }}>Pick your 3 best dates</h1>
        <p style={{ marginTop: 6, fontSize: 13, color: 'var(--ink-secondary)' }}>
          Choose up to 3 dates (Thu–Sun) — we'll find one that works for everyone.
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: dateCount === 3 ? 'var(--semantic-success)' : 'var(--ink-muted)', fontWeight: 600 }}>
          {dateCount}/3 dates selected
        </p>
      </div>

      {/* Calendar grid */}
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Column headers — shown once, above all weeks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 8 }}>
          {['Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div
              key={d}
              style={{
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--ink-secondary)',
                padding: '2px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} style={{ marginBottom: 4 }}>
            {week.monthLabel && (
              <p style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--ink-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '12px 0 6px',
              }}>
                {week.monthLabel}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
              {week.days.map((date, di) => {
                const iso = toISO(date)
                const isPast = date < today
                const isBeyond = date >= eightWeeksOut
                const isSelected = selected.includes(iso)
                const isMaxed = !isSelected && dateCount >= 3
                const disabled = isPast || isBeyond || isMaxed

                let bg = 'transparent'
                let color = 'var(--ink-primary)'
                let border = '1px solid var(--border-default)'

                if (isSelected) {
                  bg = 'var(--btn-primary-bg)'
                  color = 'var(--btn-primary-fg)'
                  border = 'none'
                } else if (disabled) {
                  color = 'var(--ink-faint)'
                  border = '1px solid transparent'
                }

                return (
                  <div
                    key={di}
                    onClick={() => !disabled && toggle(iso)}
                    style={{
                      height: 44,
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: disabled ? 'default' : 'pointer',
                      background: bg,
                      color,
                      border,
                      transition: 'all var(--duration-fast) var(--ease-out)',
                      userSelect: 'none',
                    }}
                  >
                    {isSelected
                      ? <Icon name="check" size={16} style={{ color: 'var(--btn-primary-fg)' }} />
                      : (
                        <>
                          <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{date.getDate()}</span>
                          <span style={{ fontSize: 10, color: 'var(--ink-muted)', lineHeight: 1.2 }}>
                            {MONTH_NAMES[date.getMonth()].slice(0, 3)}
                          </span>
                        </>
                      )
                    }
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Activity / vibe tags */}
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

      {/* ── Sticky footer ── */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'var(--bg-primary)',
        padding: '16px 16px 32px',
        margin: '0 -16px',
        borderTop: '1px solid var(--border-default)',
        marginTop: 16,
      }}>
        <Button disabled={!canContinue} onClick={handleContinue}>
          Pick times
        </Button>
      </div>
    </Screen>
  )
}
