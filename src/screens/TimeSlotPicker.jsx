import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

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

  const allSelected = dates.every(d => times[d.date])
  const selectedCount = Object.keys(times).length

  const pick = (iso, timeId) => {
    setTimes(prev => ({ ...prev, [iso]: timeId }))
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/calendar-picker" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Pick a time</h1>
        <p className="text-muted mt-8">Choose a time range for each date.</p>
      </div>

      {/* Step progress */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 4, background: 'rgba(255, 255, 255, 0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              width: `${(selectedCount / 3) * 100}%`,
              height: '100%',
              background: allSelected ? 'var(--success)' : 'var(--coral)',
              borderRadius: 2,
              transition: 'width 0.2s, background 0.2s',
            }}
          />
        </div>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: allSelected ? 'var(--success)' : 'var(--text-muted)',
          whiteSpace: 'nowrap',
          minWidth: 68,
          textAlign: 'right',
          transition: 'color 0.2s',
        }}>
          {selectedCount}/3 done
        </span>
      </div>

      {/* One section per date */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {dates.map((d, idx) => {
          const pickedTime = times[d.date]
          return (
            <div key={d.date}>
              {/* Date label */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
              }}>
                <div style={{
                  width: 24, height: 24,
                  borderRadius: '50%',
                  background: pickedTime ? 'var(--success)' : 'var(--surface2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: pickedTime ? '#fff' : 'var(--taupe)',
                  flexShrink: 0,
                }}>
                  {pickedTime ? '✓' : idx + 1}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600 }}>{d.fmtDate}</p>
                  <p style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 2 }}>
                    What time works for you?
                  </p>
                </div>
              </div>

              {/* Time options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                        padding: '13px 16px',
                        borderRadius: 'var(--radius)',
                        border: `1px solid ${isSelected ? 'var(--coral)' : '#2a2a2a'}`,
                        background: isSelected ? 'rgba(232,93,77,0.08)' : 'var(--surface)',
                        cursor: 'pointer',
                        transition: 'all 0.12s',
                      }}
                    >
                      {/* Radio circle */}
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `2px solid ${isSelected ? 'var(--coral)' : 'rgba(255, 255, 255, 0.10)'}`,
                        background: isSelected ? 'var(--coral)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.12s',
                      }}>
                        {isSelected && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: isSelected ? 'var(--text)' : 'var(--text-muted)' }}>
                          {t.label}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 2 }}>{t.hours}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
        <Button variant="ghost" half onClick={() => navigate('/calendar-picker')}>
          ← Back
        </Button>
        <Button half disabled={!allSelected} onClick={() => navigate('/activity-preferences', { state: { dates, times } })}>
          Continue →
        </Button>
      </div>
    </Screen>
  )
}
