import { useNavigate } from 'react-router-dom'

const DOT_BG = `radial-gradient(circle, #E8E3DC 1px, transparent 1px)`

function Avatar({ initials, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#1A1A1A',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

export default function BookedCardDetailsLight() {
  const navigate = useNavigate()
  const groupColor = '#B8D4E8'

  const handleDirections = () => {
    window.open('https://maps.google.com/maps/search/Hawksmoor,+City', '_blank', 'noopener,noreferrer')
  }

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
        paddingTop: 20,
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          width: 40,
          height: 40,
          background: 'transparent',
          border: 'none',
          fontSize: 24,
          color: '#1A1A1A',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ←
      </button>

      {/* Screen title */}
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#1A1A1A',
          margin: '20px 0 0 0',
          paddingLeft: 0,
        }}
      >
        Hangout details
      </h1>

      {/* Gap */}
      <div style={{ height: 24 }} />

      {/* Section 1: Group + Event summary card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          padding: 20,
          borderLeft: `4px solid ${groupColor}`,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: groupColor, marginBottom: 8 }}>
          Book Club
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>
          Saturday, 14 March 2026
        </div>
        <div style={{ fontSize: 16, fontWeight: 400, color: '#6B6B6B', marginBottom: 4 }}>
          7:30 PM
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16, color: '#6B6B6B' }}>📍</span>
          <span style={{ fontSize: 16, fontWeight: 400, color: '#1A1A1A' }}>
            Hawksmoor, City
          </span>
        </div>
      </div>

      {/* Section 2: Who's coming */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#6B6B6B',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 12,
          }}
        >
          Who's coming
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Avatar initials="JM" />
          <Avatar initials="SR" />
          <Avatar initials="TK" />
          <Avatar initials="RL" />
        </div>
      </div>

      {/* Section 3: Venue */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#6B6B6B',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 12,
          }}
        >
          Venue
        </div>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            padding: 20,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            Hawksmoor
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              fontWeight: 400,
              color: '#6B6B6B',
              marginBottom: 16,
            }}
          >
            <span>📍</span>
            <span>10 Bothwell Street, Glasgow G2 6NU</span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#F0EBE3', marginBottom: 16 }} />

          {/* Get directions button */}
          <button
            onClick={handleDirections}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#1A1A1A',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            <span style={{ fontSize: 16 }}>🗺️</span>
            <span>Get directions</span>
          </button>
        </div>
      </div>

      {/* Actions: Can't make it button */}
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => navigate('/cant-make-it')}
          style={{
            width: '100%',
            height: 44,
            background: 'transparent',
            border: 'none',
            color: '#C85C3C',
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          Can't make it
        </button>
      </div>

      {/* Bottom padding */}
      <div style={{ height: 32 }} />
    </div>
  )
}
