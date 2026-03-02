import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Icon from '../components/Icon'

// Override CSS variables so .frame picks up the spec's exact cream + dot values
const FRAME_VARS = {
  '--bg-primary': '#FAF7F2',
  '--dot-color':  '#E8E3DC',
  '--dot-size':   '24px',
}

const GROUP_COLOR = '#B8D4E8'

const MOCK = {
  groupName:    'Book Club',
  date:         'Saturday, 14 March 2026',
  time:         '7:30 PM',
  venueName:    'Hawksmoor',
  venueDisplay: 'Hawksmoor, City',
  address:      '10 Basinghall St, London EC2V 5BQ',
  mapsUrl:      'https://maps.google.com/maps/search/Hawksmoor+City+10+Basinghall+St+London',
  members:      [
    { initials: 'JM' },
    { initials: 'SR' },
    { initials: 'TK' },
    { initials: 'RL' },
  ],
}

function Gap({ size }) {
  return <div style={{ height: size }} />
}

function Divider() {
  return <div style={{ height: 1, background: '#F0EBE3' }} />
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize:      14,
      fontWeight:    500,
      color:         '#6B6B6B',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }}>
      {children}
    </div>
  )
}

function Avatar({ initials }) {
  return (
    <div style={{
      width:          40,
      height:         40,
      borderRadius:   '50%',
      background:     '#1A1A1A',
      color:          '#FFFFFF',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontSize:       14,
      fontWeight:     600,
      flexShrink:     0,
    }}>
      {initials}
    </div>
  )
}

export default function BookedCardDetailsLight() {
  const navigate = useNavigate()

  return (
    <div style={FRAME_VARS}>
      <Screen style={{ padding: '0 20px' }}>
        <div style={{ paddingTop: 20, paddingBottom: 32 }}>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              background:  'transparent',
              border:      'none',
              padding:     0,
              cursor:      'pointer',
              display:     'flex',
              alignItems:  'center',
              color:       '#1A1A1A',
              width:       40,
              height:      40,
            }}
            aria-label="Go back"
          >
            <Icon name="chevron_left" size={20} style={{ color: '#1A1A1A' }} />
          </button>

          {/* Screen title */}
          <Gap size={20} />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
            Hangout details
          </h1>

          {/* ── Section 1: Group + Event summary card ── */}
          <Gap size={24} />
          <div style={{
            background:    '#FFFFFF',
            borderRadius:  16,
            boxShadow:     '0 2px 12px rgba(0,0,0,0.06)',
            padding:       20,
            borderLeft:    `4px solid ${GROUP_COLOR}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: GROUP_COLOR }}>
              {MOCK.groupName}
            </div>
            <Gap size={8} />
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>
              {MOCK.date}
            </div>
            <Gap size={4} />
            <div style={{ fontSize: 16, fontWeight: 400, color: '#6B6B6B' }}>
              {MOCK.time}
            </div>
            <Gap size={4} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="place" size={16} style={{ color: '#6B6B6B' }} />
              <span style={{ fontSize: 16, fontWeight: 400, color: '#1A1A1A' }}>
                {MOCK.venueDisplay}
              </span>
            </div>
          </div>

          {/* ── Section 2: Who's coming ── */}
          <Gap size={24} />
          <SectionLabel>Who's coming</SectionLabel>
          <Gap size={12} />
          <div style={{ display: 'flex', gap: 8 }}>
            {MOCK.members.map(m => (
              <Avatar key={m.initials} initials={m.initials} />
            ))}
          </div>

          {/* ── Section 3: Venue ── */}
          <Gap size={24} />
          <SectionLabel>Venue</SectionLabel>
          <Gap size={12} />
          <div style={{
            background:   '#FFFFFF',
            borderRadius: 16,
            boxShadow:    '0 2px 12px rgba(0,0,0,0.06)',
            padding:      20,
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>
              {MOCK.venueName}
            </div>
            <Gap size={4} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="location_on" size={14} style={{ color: '#6B6B6B', flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 400, color: '#6B6B6B' }}>
                {MOCK.address}
              </span>
            </div>
            <Gap size={16} />
            <Divider />
            <Gap size={16} />
            <button
              onClick={() => window.open(MOCK.mapsUrl, '_blank', 'noopener,noreferrer')}
              style={{
                background:  'transparent',
                border:      'none',
                padding:     0,
                cursor:      'pointer',
                display:     'flex',
                alignItems:  'center',
                gap:         6,
                fontSize:    14,
                fontWeight:  500,
                color:       '#1A1A1A',
              }}
            >
              <Icon name="directions" size={16} style={{ color: '#1A1A1A' }} />
              Get directions
            </button>
          </div>

          {/* ── Actions ── */}
          <Gap size={32} />
          <button
            onClick={() => navigate('/cant-make-it')}
            style={{
              width:       '100%',
              height:      44,
              background:  'transparent',
              border:      'none',
              color:       '#C85C3C',
              fontSize:    16,
              fontWeight:  500,
              cursor:      'pointer',
            }}
          >
            Can't make it
          </button>

          <Gap size={32} />
        </div>
      </Screen>
    </div>
  )
}
