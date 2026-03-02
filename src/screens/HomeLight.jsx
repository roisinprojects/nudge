import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Icon from '../components/Icon'

// Override CSS variables so .frame picks up the spec's exact cream + dot values
const FRAME_VARS = {
  '--bg-primary': '#FAF7F2',
  '--dot-color':  '#E8E3DC',
  '--dot-size':   '24px',
}

const GROUP_BLUE    = '#B8D4E8'
const GROUP_LAVENDER = '#D4B8E0'

// ── Shared card shell ─────────────────────────────────────────────────────────
function GroupCard({ groupColor, children, onClick }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    hovered ? '#FDFCFB' : '#FFFFFF',
        borderRadius:  16,
        boxShadow:     hovered
          ? '0 4px 20px rgba(0,0,0,0.10)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        padding:       20,
        borderLeft:    `4px solid ${groupColor}`,
        cursor:        'pointer',
        transition:    'box-shadow 0.2s, background 0.2s',
      }}
    >
      {children}
    </div>
  )
}

// ── Status pill ───────────────────────────────────────────────────────────────
function Pill({ label, bg, color }) {
  return (
    <span style={{
      fontSize:     12,
      fontWeight:   500,
      background:   bg,
      color,
      padding:      '4px 12px',
      borderRadius: 20,
      whiteSpace:   'nowrap',
    }}>
      {label}
    </span>
  )
}

// ── Card row helpers ──────────────────────────────────────────────────────────
function CardHeader({ groupName, groupColor, pill }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: groupColor }}>{groupName}</span>
      {pill}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#F0EBE3' }} />
}

function Gap({ size }) {
  return <div style={{ height: size }} />
}

// ── Card State 1: Waiting for others ─────────────────────────────────────────
function WaitingCard({ groupName, groupColor }) {
  return (
    <GroupCard groupColor={groupColor}>
      <CardHeader
        groupName={groupName}
        groupColor={groupColor}
        pill={<Pill label="Waiting for others" bg="#F0EBE3" color="#6B6B6B" />}
      />
      <Gap size={12} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="group" size={16} style={{ color: '#6B6B6B' }} />
        <span style={{ fontSize: 16, fontWeight: 400, color: '#1A1A1A' }}>3 of 5 responded</span>
      </div>
      <Gap size={8} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="schedule" size={14} style={{ color: '#6B6B6B' }} />
        <span style={{ fontSize: 14, fontWeight: 400, color: '#6B6B6B' }}>Closes Friday</span>
      </div>
    </GroupCard>
  )
}

// ── Card State 2: Matched — booking needed ────────────────────────────────────
function MatchedCard({ groupName, groupColor, onBookNow }) {
  return (
    <GroupCard groupColor={groupColor} onClick={onBookNow}>
      <CardHeader
        groupName={groupName}
        groupColor={groupColor}
        pill={<Pill label="Ready to book" bg="#D4E8D4" color="#2D6B2D" />}
      />
      <Gap size={12} />
      <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>Saturday, 14 March</div>
      <Gap size={4} />
      <div style={{ fontSize: 14, fontWeight: 400, color: '#6B6B6B' }}>Evening</div>
      <Gap size={16} />
      <Divider />
      <Gap size={16} />
      <button
        onClick={e => { e.stopPropagation(); onBookNow() }}
        style={{
          width:        '100%',
          height:       52,
          background:   '#1A1A1A',
          color:        '#FFFFFF',
          border:       'none',
          borderRadius: 12,
          fontSize:     16,
          fontWeight:   600,
          cursor:       'pointer',
        }}
      >
        Book now
      </button>
    </GroupCard>
  )
}

// ── Card State 3: Booked ──────────────────────────────────────────────────────
function BookedCard({ groupName, groupColor, onViewDetails }) {
  return (
    <GroupCard groupColor={groupColor} onClick={onViewDetails}>
      <CardHeader
        groupName={groupName}
        groupColor={groupColor}
        pill={<Pill label="Booked" bg="#D4E8D4" color="#2D6B2D" />}
      />
      <Gap size={12} />
      <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>Saturday, 14 March</div>
      <Gap size={4} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="restaurant" size={16} style={{ color: '#6B6B6B' }} />
        <span style={{ fontSize: 16, fontWeight: 400, color: '#1A1A1A' }}>Hawksmoor</span>
      </div>
      <Gap size={16} />
      <Divider />
      <Gap size={16} />
      <button
        onClick={e => { e.stopPropagation(); onViewDetails() }}
        style={{
          width:        '100%',
          height:       52,
          background:   '#FFFFFF',
          color:        '#1A1A1A',
          border:       '1.5px solid #1A1A1A',
          borderRadius: 12,
          fontSize:     16,
          fontWeight:   600,
          cursor:       'pointer',
        }}
      >
        View details
      </button>
    </GroupCard>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────
import React from 'react'

export default function HomeLight() {
  const navigate = useNavigate()

  return (
    <div style={FRAME_VARS}>
      <Screen style={{ padding: '0 20px' }}>
        <div style={{ paddingTop: 32, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Page heading */}
          <div style={{ marginBottom: 8 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>Your groups</h1>
          </div>

          {/* Card 1 — Waiting for others */}
          <WaitingCard groupName="The Crew" groupColor={GROUP_BLUE} />

          {/* Card 2 — Matched, booking needed */}
          <MatchedCard
            groupName="Weekend Warriors"
            groupColor={GROUP_LAVENDER}
            onBookNow={() => navigate('/booking-confirm')}
          />

          {/* Card 3 — Booked */}
          <BookedCard
            groupName="Book Club"
            groupColor={GROUP_BLUE}
            onViewDetails={() => navigate('/booked-details-light')}
          />

        </div>
      </Screen>
    </div>
  )
}
