import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'

const GROUP_COLOUR = 'var(--group-lavender)'

const MATCH = {
  date:        'Saturday, 1 March',
  time:        'Evening · 7pm onwards',
  matchedTime: '19:00',
  timePeriod:  'Evening (5pm–9pm)',
  activity:    'Food & Drinks',
  activityMeta: 'Chosen by 4 of 5 members',
  booker:      'Tom',
  group:       'Uni Friends',
}

const VENUES = [
  {
    id: 1,
    name: 'The Botanist',
    address: '98 Deansgate, Manchester M3 2GQ',
    type: 'Cocktail Bar & Restaurant',
    tags: ['Drinks', 'Modern British'],
    rating: 4.6,
    reviews: 1240,
    distance: '0.3 miles',
    price: '££',
    img: '🌿',
    top: true,
  },
  {
    id: 2,
    name: 'Dishoom',
    address: '22 Kingly St, London W1B 5QP',
    type: 'Indian Restaurant & Bar',
    tags: ['Dinner out', 'Indian'],
    rating: 4.8,
    reviews: 3400,
    distance: '0.7 miles',
    price: '££',
    img: '🍛',
  },
  {
    id: 3,
    name: 'Nightjar',
    address: '129 City Rd, London EC1V 1JB',
    type: 'Speakeasy Cocktail Bar',
    tags: ['Drinks', 'Late night'],
    rating: 4.7,
    reviews: 890,
    distance: '1.1 miles',
    price: '£££',
    img: '🎷',
  },
]

export default function Results() {
  const navigate = useNavigate()

  const handleVenueClick = (v) => {
    navigate('/booking-confirm', {
      state: {
        provisionalVenue: {
          name:    v.name,
          address: v.address,
          url:     `https://www.opentable.com/s/?term=${encodeURIComponent(v.name)}`,
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
      <div style={{ paddingTop: 40 }}>
        {/* Match success banner */}
        <div className="alert alert-success">
          <span>🎉</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14 }}>Match found!</p>
            <p style={{ fontSize: 13, marginTop: 2 }}>Everyone's in — here's your plan.</p>
          </div>
        </div>
      </div>

      {/* Matched details card */}
      <div style={{
        marginTop: 16,
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
        borderLeft: `3px solid ${GROUP_COLOUR}`,
        borderLeftWidth: 3,
        borderLeftColor: GROUP_COLOUR,
        padding: '14px 16px',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Your hangout
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>{MATCH.date}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 2 }}>{MATCH.time}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>🍹</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>{MATCH.activity}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 2 }}>{MATCH.activityMeta}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>👤</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>{MATCH.booker} is booking</p>
              <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 2 }}>Randomly assigned — next time it's someone else</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venue options */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Pick a venue</p>
        <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginBottom: 16 }}>
          {MATCH.booker}: tap a venue to book.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {VENUES.map((v, idx) => (
            <div
              key={v.id}
              onClick={() => handleVenueClick(v)}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-default)',
                borderLeft: idx === 0 ? `3px solid ${GROUP_COLOUR}` : '1px solid var(--border-default)',
                borderLeftWidth: idx === 0 ? 3 : 1,
                borderLeftColor: idx === 0 ? GROUP_COLOUR : 'var(--border-default)',
                boxShadow: 'var(--shadow-sm)',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'box-shadow var(--duration-fast) var(--ease-out)',
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: 'var(--bg-ui)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {v.img}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{v.name}</p>
                    <span style={{ fontSize: 12, color: 'var(--ink-muted)', marginLeft: 8, flexShrink: 0 }}>{v.price}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 2 }}>{v.type}</p>
                  {/* Cuisine / type tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                    {v.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--ink-secondary)' }}>⭐ {v.rating} ({v.reviews.toLocaleString()})</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>·</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{v.distance}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-primary)' }}>
                  Book →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
