import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const VENUES = [
  {
    id: 1,
    name: 'The Botanist',
    type: 'Cocktail Bar & Restaurant',
    rating: 4.6,
    reviews: 1240,
    distance: '0.3 miles',
    price: '££',
    img: '🌿',
    available: true,
  },
  {
    id: 2,
    name: 'Dishoom',
    type: 'Indian Restaurant & Bar',
    rating: 4.8,
    reviews: 3400,
    distance: '0.7 miles',
    price: '££',
    img: '🍛',
    available: true,
  },
  {
    id: 3,
    name: 'Nightjar',
    type: 'Speakeasy Cocktail Bar',
    rating: 4.7,
    reviews: 890,
    distance: '1.1 miles',
    price: '£££',
    img: '🎷',
    available: true,
  },
]

export default function Results() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 40 }}>
        <div className="alert alert-success" style={{ marginBottom: 0 }}>
          <span>🎉</span>
          <div>
            <p className="bold text-sm">Match found!</p>
            <p className="text-sm">Everyone's in — here's your plan.</p>
          </div>
        </div>
      </div>

      {/* Matched details */}
      <div
        className="card"
        style={{ marginTop: 16, border: '1.5px solid #2a2a2a' }}
      >
        <p className="text-sm text-muted mb-12">Your hangout</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <div>
              <p className="bold">Saturday 1 March</p>
              <p className="text-sm text-muted">Evening · 7:00pm onwards</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>🍹</span>
            <div>
              <p className="bold">Food & Drinks</p>
              <p className="text-sm text-muted">Chosen by 4 of 5 members</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>👤</span>
            <div>
              <p className="bold">Tom is booking</p>
              <p className="text-sm text-muted">Randomly assigned — next time it's someone else</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venue options */}
      <div style={{ marginTop: 24 }}>
        <p className="bold mb-12">Pick a venue</p>
        <p className="text-sm text-muted mb-16">Tom: click a venue to open OpenTable and book.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {VENUES.map(v => (
            <div
              key={v.id}
              className="venue-card"
              onClick={() => navigate('/booking-confirm')}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 52, height: 52,
                    background: 'var(--surface2)',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0,
                  }}
                >
                  {v.img}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p className="bold">{v.name}</p>
                    <span className="text-sm text-muted">{v.price}</span>
                  </div>
                  <p className="text-sm text-muted">{v.type}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' }}>
                    <span className="text-xs">⭐ {v.rating} ({v.reviews.toLocaleString()})</span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">{v.distance}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <span
                  className="text-sm bold"
                  style={{ color: 'var(--coral)' }}
                >
                  Book on OpenTable →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
