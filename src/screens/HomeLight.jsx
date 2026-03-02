import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const DOT_BG = `radial-gradient(circle, #E8E3DC 1px, transparent 1px)`

function WaitingCard({ groupName, groupColor }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 350,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        padding: 20,
        borderLeft: `4px solid ${groupColor}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'
        e.currentTarget.style.backgroundColor = '#FDFCFB'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
        e.currentTarget.style.backgroundColor = '#FFFFFF'
      }}
    >
      {/* Row 1: Group name + status pill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: groupColor }}>{groupName}</span>
        <span style={{
          fontSize: 12,
          fontWeight: 500,
          background: '#F0EBE3',
          color: '#6B6B6B',
          padding: '4px 12px',
          borderRadius: 20,
        }}>
          Waiting for others
        </span>
      </div>

      {/* Gap */}
      <div style={{ height: 12 }} />

      {/* Row 2: Response progress with icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 16, color: '#6B6B6B' }}>👥</span>
        <span style={{ fontSize: 16, fontWeight: 400, color: '#1A1A1A' }}>3 of 5 responded</span>
      </div>

      {/* Gap */}
      <div style={{ height: 8 }} />

      {/* Row 3: Deadline with icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 14, color: '#6B6B6B' }}>⏰</span>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#6B6B6B' }}>Closes Friday</span>
      </div>
    </div>
  )
}

function MatchedCard({ groupName, groupColor, onBookNow }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 350,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        padding: 20,
        borderLeft: `4px solid ${groupColor}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'
        e.currentTarget.style.backgroundColor = '#FDFCFB'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
        e.currentTarget.style.backgroundColor = '#FFFFFF'
      }}
    >
      {/* Row 1: Group name + status pill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: groupColor }}>{groupName}</span>
        <span style={{
          fontSize: 12,
          fontWeight: 500,
          background: '#D4E8D4',
          color: '#2D6B2D',
          padding: '4px 12px',
          borderRadius: 20,
        }}>
          Ready to book
        </span>
      </div>

      {/* Gap */}
      <div style={{ height: 12 }} />

      {/* Row 2: Matched date */}
      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
        Saturday, 14 March
      </div>

      {/* Gap */}
      <div style={{ height: 4 }} />

      {/* Row 3: Time range */}
      <div style={{ fontSize: 14, fontWeight: 400, color: '#6B6B6B' }}>
        Evening
      </div>

      {/* Gap */}
      <div style={{ height: 16 }} />

      {/* Divider */}
      <div style={{ height: 1, background: '#F0EBE3' }} />

      {/* Gap */}
      <div style={{ height: 16 }} />

      {/* Button */}
      <button
        onClick={e => { e.stopPropagation(); onBookNow() }}
        style={{
          width: '100%',
          height: 52,
          background: '#1A1A1A',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
        onMouseLeave={e => e.currentTarget.style.opacity = 1}
      >
        Book now
      </button>
    </div>
  )
}

function BookedCard({ groupName, groupColor, onViewDetails }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 350,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        padding: 20,
        borderLeft: `4px solid ${groupColor}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onClick={onViewDetails}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'
        e.currentTarget.style.backgroundColor = '#FDFCFB'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
        e.currentTarget.style.backgroundColor = '#FFFFFF'
      }}
    >
      {/* Row 1: Group name + status pill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: groupColor }}>{groupName}</span>
        <span style={{
          fontSize: 12,
          fontWeight: 500,
          background: '#D4E8D4',
          color: '#2D6B2D',
          padding: '4px 12px',
          borderRadius: 20,
        }}>
          Booked
        </span>
      </div>

      {/* Gap */}
      <div style={{ height: 12 }} />

      {/* Row 2: Booked date */}
      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
        Saturday, 14 March
      </div>

      {/* Gap */}
      <div style={{ height: 4 }} />

      {/* Row 3: Venue with icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 16, color: '#6B6B6B' }}>🍴</span>
        <span style={{ fontSize: 16, fontWeight: 400, color: '#1A1A1A' }}>Hawksmoor</span>
      </div>

      {/* Gap */}
      <div style={{ height: 16 }} />

      {/* Divider */}
      <div style={{ height: 1, background: '#F0EBE3' }} />

      {/* Gap */}
      <div style={{ height: 16 }} />

      {/* Button */}
      <button
        onClick={e => { e.stopPropagation(); onViewDetails() }}
        style={{
          width: '100%',
          height: 52,
          background: '#FFFFFF',
          color: '#1A1A1A',
          border: '1.5px solid #1A1A1A',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#F5F5F5'}
        onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
      >
        View details
      </button>
    </div>
  )
}

export default function HomeLight() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        margin: '0 auto',
        background: '#FAF7F2',
        backgroundImage: DOT_BG,
        backgroundSize: '24px 24px',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
        padding: '20px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
          Your groups
        </h1>
        <p style={{ fontSize: 16, fontWeight: 400, color: '#6B6B6B', margin: '8px 0 0 0' }}>
          Staying in touch, automatically.
        </p>
      </div>

      {/* Card: Waiting for others */}
      <div style={{ marginBottom: 16 }}>
        <WaitingCard groupName="The Crew" groupColor="#B8D4E8" />
      </div>

      {/* Card: Matched */}
      <div style={{ marginBottom: 16 }}>
        <MatchedCard
          groupName="Weekend Warriors"
          groupColor="#D4B8E0"
          onBookNow={() => navigate('/booking-confirm')}
        />
      </div>

      {/* Card: Booked */}
      <div>
        <BookedCard
          groupName="Book Club"
          groupColor="#B8D4E8"
          onViewDetails={() => navigate('/booked-details-light')}
        />
      </div>
    </div>
  )
}
