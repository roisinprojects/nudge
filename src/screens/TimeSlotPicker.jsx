import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Icon from '../components/Icon'

const GROUP_COLOUR = 'var(--group-lavender)'

const TIME_OPTIONS = [
  { id: 'lunch',   label: 'Lunch',   hours: '11am – 3pm' },
  { id: 'evening', label: 'Evening', hours: '5pm – 9pm'  },
  { id: 'late',    label: 'Late',    hours: '9pm+'        },
]

const MOCK_DATES = [
  { date: '2026-03-07', fmtDate: 'Saturday, 7 March'  },
  { date: '2026-03-14', fmtDate: 'Saturday, 14 March' },
  { date: '2026-03-21', fmtDate: 'Saturday, 21 March' },
]

export default function TimeSlotPicker() {
  const navigate  = useNavigate()
  const { state } = useLocation()
  const dates = state?.dates || MOCK_DATES

  const [times, setTimes] = useState({})
  const [openIdx, setOpenIdx] = useState(0)

  const allSelected = dates.every(d => times[d.date])
  const selectedCount = Object.keys(times).length

  const pick = (iso, timeId) => {
    const nextTimes = { ...times, [iso]: timeId }
    setTimes(nextTimes)

    const currentIdx = dates.findIndex(d => d.date === iso)
    const nextIdx = dates.findIndex((d, i) => i > currentIdx && !nextTimes[d.date])
    if (nextIdx !== -1) {
      setOpenIdx(nextIdx)
    } else {
      const anyUncompleted = dates.findIndex((d, i) => i !== currentIdx && !nextTimes[d.date])
      setOpenIdx(anyUncompleted !== -1 ? anyUncompleted : null)
    }
  }

  const toggleAccordion = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx)
  }

  return (
    <Screen>
      <div style={{ paddingTop: 48 }}>
        <BackButton to="/calendar-picker" />
      </div>

      <div style={{ marginTop: 20 }}>
        <h1>When does each day suit you?</h1>
        <p style={{ marginTop: 6, fontSize: 13, color: 'var(--ink-secondary)' }}>
          Your picks stay private until we find a match.
        </p>
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: selectedCount === 3 ? 'var(--semantic-success)' : 'var(--ink-muted)', fontWeight: 600 }}>
          {selectedCount}/3 times selected
        </p>
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
                style={{ borderBottom: '1px solid var(--border-default)' }}
              >
                {/* Accordion header */}
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
                      ? 'var(--semantic-success)'
                      : isOpen
                        ? 'var(--ink-primary)'
                        : 'var(--bg-ui)',
                    border: isCompleted || isOpen ? 'none' : '1.5px solid var(--border-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    color: isCompleted
                      ? '#fff'
                      : isOpen
                        ? 'var(--bg-primary)'
                        : 'var(--ink-muted)',
                    flexShrink: 0,
                    transition: 'background var(--duration-normal) var(--ease-out)',
                  }}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>

                  {/* Date + subtitle */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-primary)' }}>
                      {d.fmtDate}
                    </p>
                    {isCompleted ? (
                      <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 1 }}>
                        {TIME_OPTIONS.find(t => t.id === pickedTime)?.label}
                      </p>
                    ) : (
                      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 1 }}>
                        What time works for you?
                      </p>
                    )}
                  </div>

                  {/* Chevron */}
                  <Icon
                    name="expand_more"
                    size={20}
                    style={{
                      color: 'var(--ink-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--duration-normal) var(--ease-out)',
                      flexShrink: 0,
                    }}
                  />
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
                            border: `1px solid ${isSelected ? 'transparent' : 'var(--border-strong)'}`,
                            borderLeft: isSelected ? `3px solid ${GROUP_COLOUR}` : `1px solid var(--border-strong)`,
                            background: isSelected ? 'var(--bg-ui)' : 'var(--bg-card)',
                            cursor: 'pointer',
                            transition: 'all var(--duration-fast) var(--ease-out)',
                            boxShadow: 'var(--shadow-xs)',
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: 15, fontWeight: 600,
                              color: isSelected ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                            }}>
                              {t.label}
                            </p>
                            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>
                              {t.hours}
                            </p>
                          </div>
                          {/* Radio */}
                          <div style={{
                            width: 20, height: 20, borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--ink-primary)' : 'var(--border-strong)'}`,
                            background: isSelected ? 'var(--ink-primary)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all var(--duration-fast) var(--ease-out)',
                          }}>
                            {isSelected && (
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bg-card)' }} />
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
          disabled={!allSelected}
          onClick={() => navigate('/response-locked', { state: { dates, times } })}
        >
          Submit availability
        </Button>
      </div>
    </Screen>
  )
}
