import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Input from '../components/Input'

const GROUP_COLOUR = 'var(--group-lavender)'

const MOCK_MATCH = {
  date:        'Saturday, 1 March',
  time:        'Evening · 7pm onwards',
  matchedTime: '19:00',
  timePeriod:  'Evening (5pm–9pm)',
  activity:    'Food & Drinks',
  group:       'Uni Friends',
}

const NEXT_BOOKER = 'Sarah'
const MOCK_MEMBERS = ['Sarah', 'Tom', 'Jess', 'Mike', 'You']

// Time chips: 4 slots starting from matched time at 30-min increments
function getTimeChips(matchedTime24) {
  const [startH, startM] = matchedTime24.split(':').map(Number)
  return Array.from({ length: 4 }, (_, i) => {
    const total = startH * 60 + startM + i * 30
    const h = Math.floor(total / 60) % 24
    const m = total % 60
    const suffix = h >= 12 ? 'pm' : 'am'
    const h12 = h % 12 || 12
    const label = m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`
    return { value: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, label }
  })
}

export default function BookingConfirm() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  const provisionalVenue = state?.provisionalVenue ?? null
  const match            = state?.match            ?? MOCK_MATCH

  const timeChips = getTimeChips(match.matchedTime || '19:00')

  const [overrideVenue,   setOverrideVenue]   = useState(false)
  const [manualVenueName, setManualVenueName] = useState('')
  const [selectedTime,    setSelectedTime]    = useState(timeChips[0].value)
  const [toast,           setToast]           = useState(false)

  const usingProvisional = !!(provisionalVenue && !overrideVenue)
  const currentVenueName = usingProvisional ? provisionalVenue.name : manualVenueName.trim()
  const canProceed       = !!currentVenueName && !!selectedTime

  const openTableUrl = usingProvisional
    ? provisionalVenue.url
    : manualVenueName.trim()
      ? `https://www.opentable.com/s/?term=${encodeURIComponent(manualVenueName.trim())}`
      : 'https://www.opentable.com'

  // Convert 24h "HH:MM" → display like "7pm" or "7:30pm"
  const toDisplay = (time24) => {
    const chip = timeChips.find(c => c.value === time24)
    if (chip) return chip.label
    const [h, m] = time24.split(':').map(Number)
    const suffix = h >= 12 ? 'pm' : 'am'
    const h12 = h % 12 || 12
    return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`
  }

  const handleBooked = () => {
    navigate('/calendar-invite', {
      state: {
        venueName:     currentVenueName,
        venueAddress:  usingProvisional ? provisionalVenue.address : '',
        confirmedTime: toDisplay(selectedTime),
        match: {
          date:     match.date,
          activity: match.activity,
          group:    match.group,
        },
      },
    })
  }

  const handleCantBook = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 48 }}>
        <BackButton to="/results" />
      </div>

      {/* Reassignment toast */}
      {toast && (
        <div style={{
          position: 'absolute', top: 16, left: 16, right: 16,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 16px',
          display: 'flex', gap: 10, alignItems: 'center',
          zIndex: 50,
          boxShadow: 'var(--shadow-md)',
        }}>
          <span style={{ color: 'var(--semantic-success)', fontSize: 16 }}>✓</span>
          <p style={{ fontSize: 13, color: 'var(--ink-primary)' }}>
            We've asked {NEXT_BOOKER} to book instead.
          </p>
        </div>
      )}

      {/* Header */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 48, lineHeight: 1 }}>🎯</div>
        <h1 style={{ marginTop: 12 }}>You're the booker!</h1>
        <p style={{ marginTop: 6, fontSize: 14, color: 'var(--ink-secondary)' }}>
          Randomly assigned — next time it's someone else's turn.
        </p>
      </div>

      {/* Venue + hangout summary card */}
      <div style={{
        marginTop: 20,
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
        borderLeft: `3px solid ${GROUP_COLOUR}`,
        borderLeftWidth: 3,
        borderLeftColor: GROUP_COLOUR,
        padding: '14px 16px',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>👥</span>
            <p style={{ fontWeight: 700, fontSize: 14 }}>{match.group}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>{match.date}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 2 }}>{match.time}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>🍹</span>
            <p style={{ fontWeight: 700, fontSize: 14 }}>{match.activity}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📍</span>
            {usingProvisional ? (
              <p style={{ fontWeight: 700, fontSize: 14 }}>{provisionalVenue.name}</p>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontStyle: 'italic' }}>Venue TBC</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>👤</span>
            <p style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>
              {MOCK_MEMBERS.join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {/* Venue override */}
      {usingProvisional && (
        <p style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-muted)' }}>
          We'll use {provisionalVenue.name} —{' '}
          <span
            style={{ color: 'var(--ink-primary)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
            onClick={() => { setOverrideVenue(true); setManualVenueName('') }}
          >
            did you book somewhere else?
          </span>
        </p>
      )}

      {(!provisionalVenue || overrideVenue) && (
        <div style={{ marginTop: 16 }}>
          <Input
            label="Where did you book?"
            placeholder="e.g. The Ivy"
            value={manualVenueName}
            onChange={e => setManualVenueName(e.target.value)}
          />
        </div>
      )}

      {/* Time chips */}
      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-primary)', marginBottom: 10 }}>
          What time did you book?
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {timeChips.map(chip => {
            const isSelected = selectedTime === chip.value
            return (
              <span
                key={chip.value}
                className={`chip ${isSelected ? 'chip-selected' : 'chip-outline'}`}
                onClick={() => setSelectedTime(chip.value)}
                style={{ cursor: 'pointer' }}
              >
                {chip.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* Info callout */}
      <div className="alert alert-warning" style={{ marginTop: 16 }}>
        <span>💡</span>
        <p style={{ fontSize: 13 }}>
          The group is waiting on you. Once you've booked, tap confirm below.
        </p>
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button
          variant="secondary"
          onClick={() => window.open(openTableUrl, '_blank', 'noopener,noreferrer')}
        >
          Open OpenTable →
        </Button>

        <Button disabled={!canProceed} onClick={handleBooked}>
          ✓ I've booked it
        </Button>

        <Button variant="ghost" onClick={handleCantBook}>
          I can't book right now
        </Button>
      </div>
    </Screen>
  )
}
