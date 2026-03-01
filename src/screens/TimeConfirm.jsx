import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

// Convert "HH:MM" (24h) to a display string like "7:00pm" or "7pm"
function to12h(time24) {
  const [h, m] = time24.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12    = h % 12 || 12
  return m === 0
    ? `${h12}${suffix}`
    : `${h12}:${m.toString().padStart(2, '0')}${suffix}`
}

// Generate 5 × 30-minute slots starting from matchedTime
function getTimeSlots(matchedTime24) {
  const [startH, startM] = matchedTime24.split(':').map(Number)
  return Array.from({ length: 5 }, (_, i) => {
    const total = startH * 60 + startM + i * 30
    const h = Math.floor(total / 60) % 24
    const m = total % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  })
}

const MOCK_MATCH = {
  date:        'Saturday, 1 March',
  matchedTime: '19:00',
  timePeriod:  'Evening (5pm–9pm)',
  activity:    'Food & Drinks',
  group:       'Uni Friends',
}

export default function TimeConfirm() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  const venue = state?.venue ?? { name: 'The Botanist', address: '' }
  const match = state?.match ?? MOCK_MATCH

  const matchedTime24 = match.matchedTime || '19:00'
  const timeSlots     = getTimeSlots(matchedTime24)

  // Pre-select the matched time
  const [selectedSlot, setSelectedSlot] = useState(matchedTime24)
  const [customTime,   setCustomTime]   = useState(matchedTime24)

  const isDifferent  = selectedSlot === 'different'
  const canConfirm   = !isDifferent || !!customTime

  const handleConfirm = () => {
    const confirmedTime24 = isDifferent ? customTime : selectedSlot

    // Stub: +2h notification if no address was captured
    if (!venue.address) {
      setTimeout(() => {
        console.log(`[Nudge] +2h notification: "Quick one — what's the address for ${venue.name}? We'll update everyone's calendar invite."`)
      }, 2 * 60 * 60 * 1000)
    }

    navigate('/calendar-invite', {
      state: {
        venueName:     venue.name,
        venueAddress:  venue.address,
        confirmedTime: to12h(confirmedTime24),
        match: {
          date:     match.date,
          activity: match.activity,
          group:    match.group,
        },
      },
    })
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {/* No back button — required step */}
      <div style={{ paddingTop: 56 }}>
        <h1>What time did you get?</h1>
        <p className="text-muted mt-8">We'll use this for everyone's calendar invite.</p>
      </div>

      {/* Time option rows */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {timeSlots.map((slot, i) => {
          const isMatched  = i === 0
          const isSelected = selectedSlot === slot

          return (
            <div
              key={slot}
              onClick={() => { setSelectedSlot(slot) }}
              style={{
                height: 56,
                display: 'flex', alignItems: 'center',
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
                <span style={{
                  fontSize: 16, fontWeight: 600,
                  color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                }}>
                  {to12h(slot)}
                </span>
                {isMatched && (
                  <span style={{
                    marginLeft: 8, fontSize: 11,
                    color: 'var(--color-text-tertiary)',
                    fontWeight: 400,
                  }}>
                    your matched time
                  </span>
                )}
              </div>
              {/* Radio */}
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${isSelected ? 'var(--color-primary-500)' : 'var(--color-border-strong)'}`,
                background: isSelected ? 'var(--color-primary-500)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all var(--duration-fast) var(--ease-out)',
              }}>
                {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
              </div>
            </div>
          )
        })}

        {/* "Different time" option */}
        <div
          onClick={() => setSelectedSlot('different')}
          style={{
            height: 56,
            display: 'flex', alignItems: 'center',
            padding: '0 16px',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${isDifferent ? 'var(--color-primary-500)' : 'var(--color-border-strong)'}`,
            borderLeftWidth: isDifferent ? '3px' : '1px',
            background: isDifferent ? 'rgba(232, 93, 77, 0.08)' : 'var(--color-bg-card)',
            cursor: 'pointer',
            transition: 'all var(--duration-fast) var(--ease-out)',
          }}
        >
          <span style={{
            flex: 1, fontSize: 16, fontWeight: 600,
            color: isDifferent ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          }}>
            Different time
          </span>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
            border: `2px solid ${isDifferent ? 'var(--color-primary-500)' : 'var(--color-border-strong)'}`,
            background: isDifferent ? 'var(--color-primary-500)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all var(--duration-fast) var(--ease-out)',
          }}>
            {isDifferent && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
          </div>
        </div>

        {/* Native time picker — shown when "Different time" is selected */}
        {isDifferent && (
          <input
            type="time"
            value={customTime}
            onChange={e => setCustomTime(e.target.value)}
            style={{
              width: '100%', height: 48,
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-focus)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-text-primary)',
              fontSize: 16,
              padding: '0 16px',
              outline: 'none',
              colorScheme: 'dark',
            }}
          />
        )}
      </div>

      {/* Time context label */}
      <p style={{ marginTop: 10, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
        Your group matched for {match.timePeriod || 'Evening (5pm–9pm)'}
      </p>

      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <Button disabled={!canConfirm} onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </Screen>
  )
}
