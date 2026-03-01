import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import SegmentedBar from '../components/SegmentedBar'

const GROUP_COLOUR = 'var(--group-peach)'

const MOCK_MATCH = {
  date:     'Saturday, 1 March',
  activity: 'Food & Drinks',
  group:    'Uni Friends',
}

const MOCK_VENUE = {
  name:         'The Botanist',
  type:         'Cocktail Bar & Restaurant',
  neighbourhood: 'Deansgate',
  url:          'https://www.opentable.com/s/?term=The%20Botanist',
}

const MOCK_GUESTS = ['Sarah', 'Tom', 'Jess', 'Mike', 'You']

const TIME_CHIPS = [
  { value: '18:30', label: '6:30' },
  { value: '19:00', label: '7:00' },
  { value: '19:30', label: '7:30' },
  { value: '20:00', label: '8:00' },
]

const META_ROWS = (match) => [
  { label: 'Group', value: match.group },
  { label: 'Date',  value: match.date  },
  { label: 'Guests', value: `${MOCK_GUESTS.length} people` },
]

export default function BookingConfirm() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  const venue = state?.provisionalVenue ?? MOCK_VENUE
  const match = state?.match            ?? MOCK_MATCH

  const venueName         = venue.name
  const venueType         = venue.type         || MOCK_VENUE.type
  const venueNeighbourhood = venue.neighbourhood || MOCK_VENUE.neighbourhood
  const openTableUrl      = venue.url           || MOCK_VENUE.url

  const [selectedTime, setSelectedTime] = useState('19:00')
  const [isError,      setIsError]      = useState(false)

  const selectedLabel = TIME_CHIPS.find(c => c.value === selectedTime)?.label ?? selectedTime

  const handleBooked = () => {
    navigate('/calendar-invite', {
      state: {
        venueName,
        venueAddress: venue.address || venueNeighbourhood,
        confirmedTime: selectedLabel,
        match: {
          date:     match.date,
          activity: match.activity,
          group:    match.group,
        },
      },
    })
  }

  const metaRows = META_ROWS(match)

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 48 }}>
        <SegmentedBar total={4} current={4} />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>Confirm booking</h1>
        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
          {match.group} · {match.date}
        </p>
      </div>

      {/* Venue section */}
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 24, marginBottom: 10 }}>
        Venue
      </p>
      <div className="card" style={{ borderLeft: `3px solid ${GROUP_COLOUR}` }}>
        <h3 style={{ fontSize: 15, fontWeight: 700 }}>{venueName}</h3>
        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
          {venueType} · {venueNeighbourhood}
        </p>
      </div>

      {/* Confirm time section */}
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 24, marginBottom: 10 }}>
        Confirm time
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {TIME_CHIPS.map(chip => (
          <span
            key={chip.value}
            className={`chip ${selectedTime === chip.value ? 'chip-selected' : 'chip-outline'}`}
            onClick={() => setSelectedTime(chip.value)}
            style={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-default)', margin: '20px 0' }} />

      {/* Meta rows */}
      {metaRows.map((row, i) => (
        <div key={row.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{row.label}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-primary)' }}>{row.value}</p>
          </div>
          {i < metaRows.length - 1 && (
            <div style={{ height: 1, background: 'var(--border-default)' }} />
          )}
        </div>
      ))}

      {/* Error alert */}
      {isError && (
        <div className="alert alert-error" style={{ marginTop: 16 }}>
          <span>⚠️</span>
          <p style={{ fontSize: 13 }}>Something went wrong. Please try again.</p>
        </div>
      )}

      {/* CTAs */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => window.open(openTableUrl, '_blank', 'noopener,noreferrer')}>
          Open OpenTable →
        </Button>
        <Button variant="ghost" onClick={handleBooked}>
          ✓ I've booked it
        </Button>
      </div>
    </Screen>
  )
}
