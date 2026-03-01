import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import SegmentedBar from '../components/SegmentedBar'

const GROUP_COLOUR = 'var(--group-lavender)'

const MATCH = {
  date:        'Saturday, 1 March',
  total:       5,
  time:        'Evening · 7pm onwards',
  matchedTime: '19:00',
  timePeriod:  'Evening (5pm–9pm)',
  activity:    'Food & Drinks',
  group:       'Uni Friends',
}

const VENUES = [
  {
    id: 1,
    name:         'The Botanist',
    price:        '££',
    type:         'Cocktail Bar & Restaurant',
    neighbourhood: 'Deansgate',
    distance:     '0.3 miles',
    tags:         ['Drinks', 'Modern British'],
    rating:       4.6,
    address:      '98 Deansgate, Manchester M3 2GQ',
  },
  {
    id: 2,
    name:         'Dishoom',
    price:        '££',
    type:         'Indian Restaurant & Bar',
    neighbourhood: 'Spinningfields',
    distance:     '0.7 miles',
    tags:         ['Dinner', 'Indian'],
    rating:       4.8,
    address:      '22 Bridge St, Manchester M3 3BT',
  },
  {
    id: 3,
    name:         'Nightjar',
    price:        '£££',
    type:         'Speakeasy Cocktail Bar',
    neighbourhood: 'Northern Quarter',
    distance:     '1.1 miles',
    tags:         ['Drinks', 'Late night'],
    rating:       4.7,
    address:      '12 Stevenson Sq, Manchester M1 1FJ',
  },
]

export default function Results() {
  const navigate = useNavigate()

  const handleBook = (v) => {
    navigate('/booking-confirm', {
      state: {
        provisionalVenue: {
          name:         v.name,
          address:      v.address,
          type:         v.type,
          neighbourhood: v.neighbourhood,
          url:          `https://www.opentable.com/s/?term=${encodeURIComponent(v.name)}`,
        },
        match: {
          date:        MATCH.date,
          time:        MATCH.time,
          matchedTime: MATCH.matchedTime,
          timePeriod:  MATCH.timePeriod,
          activity:    MATCH.activity,
          group:       MATCH.group,
        },
      },
    })
  }

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 48 }}>
        <SegmentedBar total={4} current={4} />
      </div>

      <div style={{ marginTop: 24 }}>
        <h1>We found a match</h1>
        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
          {MATCH.date} · All {MATCH.total} available
        </p>
      </div>

      <div className="alert alert-success" style={{ marginTop: 20 }}>
        <span>✓</span>
        <p style={{ fontSize: 13, fontWeight: 600 }}>
          Everyone is free — time to pick a venue.
        </p>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {VENUES.map((v, idx) => (
          <div
            key={v.id}
            className="card"
            style={idx === 0 ? { borderLeft: `3px solid ${GROUP_COLOUR}` } : {}}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{v.name}</h3>
              <span className="text-sm text-muted">{v.price}</span>
            </div>

            <p className="text-sm text-muted" style={{ marginTop: 4 }}>
              {v.type} · {v.neighbourhood} · {v.distance}
            </p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
              {v.tags.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
                ⭐ {v.rating} · {v.distance}
              </span>
              <Button variant="secondary" onClick={() => handleBook(v)}>Book →</Button>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
