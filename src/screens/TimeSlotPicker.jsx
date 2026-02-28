import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import SegmentedBar from '../components/SegmentedBar'

const TIME_OPTIONS = [
  { id: 'lunch',   label: 'Lunch',   hours: '11am – 3pm' },
  { id: 'evening', label: 'Evening', hours: '5pm – 9pm'  },
  { id: 'late',    label: 'Late',    hours: '9pm+'        },
]

// Fallback dates shown when navigating directly (not via CalendarPicker)
const MOCK_DATES = [
  { date: '2026-03-07', fmtDate: 'Saturday, 7 March'  },
  { date: '2026-03-14', fmtDate: 'Saturday, 14 March' },
  { date: '2026-03-21', fmtDate: 'Saturday, 21 March' },
]

export default function TimeSlotPicker() {
  const navigate  = useNavigate()
  const { state } = useLocation()
  const dates = state?.dates || MOCK_DATES

  // { [isoDate]: 'lunch' | 'evening' | 'late' }
  const [times, setTimes] = useState({})
  // Which accordion row is currently open (0-indexed), or null if all closed
  const [openIdx, setOpenIdx] = useState(0)

  const allSelected = dates.every(d => times[d.date])
  const selectedCount = Object.keys(times).length

  const pick = (iso, timeId) => {
    const nextTimes = { ...times, [iso]: timeId }
    setTimes(nextTimes)

    // Auto-advance: find the next date without a time
    const currentIdx = dates.findIndex(d => d.date === iso)
    const nextIdx = dates.findIndex((d, i) => i > currentIdx && !nextTimes[d.date])
    if (nextIdx !== -1) {
      setOpenIdx(nextIdx)
    } else {
      // All done or only earlier rows uncompleted — close current
      const anyUncompleted = dates.findIndex((d, i) => i !== currentIdx && !nextTimes[d.date])
      setOpenIdx(anyUncompleted !== -1 ? anyUncompleted : null)
    }
  }

  const toggleAccordion = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx)
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/calendar-picker" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>When does each day suit you?</h1>
        <p className="text-muted mt-8">Your picks stay private until we find a match.</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <SegmentedBar total={3} current={2} counterText={`${selectedCount}/3 done`} />
      </div>

      {/* Accordion rows */}
      <div style={{ marginTop: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div>
          {dates.map((d, idx) => {
            const pickedTime = times[d.date]
            const isOpen = openIdx === idx
            const isCompleted = !!pickedTime

            return (
              <div
                key={d.date}
                style={{ borderBottom: '1px solid var(--color-border-default)' }}
              >
                {/* Accordion header row */}
                <div
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {/* Number / checkmark circle */}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: isCompleted
                      ? 'var(--color-success-solid)'
                      : isOpen
                        ? 'var(--color-primary-500)'
                        : 'var(--color-neutral-300)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                    transition: 'background var(--duration-normal) var(--ease-out)',
                  }}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>

                  {/* Date + subtitle */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {d.fmtDate}
                    </p>
                    {isCompleted ? (
                      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                        {TIME_OPTIONS.find(t => t.id === pickedTime)?.label}
                      </p>
                    ) : (
                      <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 1 }}>
                        What time works for you?
                      </p>
                    )}
                  </div>

                  {/* Chevron */}
                  <span style={{
                    color: 'var(--color-text-tertiary)',
                    fontSize: 18,
                    lineHeight: 1,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform var(--duration-normal) var(--ease-out)',
                  }}>
                    ▾
                  </span>
                </div>

                {/* Expanded: time options */}
                {isOpen && (
                  <div style={{ paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {TIME_OPTIONS.map(t => {
                      const isSelected = pickedTime === t.id
                      return (
                        <div
                          key={t.id}
                          onClick={() => pick(d.date, t.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            height: 56,
                            padding: '0 16px',
                            borderRadius: 'var(--radius-lg)',
                            border: `1px solid ${isSelected ? 'var(--color-primary-500)' : 'var(--color-border-strong)'}`,
                            borderLeftWidth: isSelected ? '3px' : '1px',
                            background: isSelected ? 'rgba(232, 93, 77, 0.08)' : 'var(--color-bg-card)',
                            cursor: 'pointer',
                            transition: 'all var(--duration-fast) var(--ease-out)',
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: 15, fontWeight: 600,
                              color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            }}>
                              {t.label}
                            </p>
                            <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                              {t.hours}
                            </p>
                          </div>
                          {/* Radio */}
                          <div style={{
                            width: 20, height: 20, borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--color-primary-500)' : 'var(--color-border-strong)'}`,
                            background: isSelected ? 'var(--color-primary-500)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all var(--duration-fast) var(--ease-out)',
                          }}>
                            {isSelected && (
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA fixed to bottom of flex container */}
        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <Button
            disabled={!allSelected}
            onClick={() => navigate('/activity-preferences', { state: { dates, times } })}
          >
            Pick activities →
          </Button>
        </div>
      </div>
    </Screen>
  )
}
