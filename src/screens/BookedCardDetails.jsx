import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Icon from '../components/Icon'

const GROUP_COLOUR = 'var(--group-rose)'

const MOCK = {
  groupName:   'Book Club',
  bookedDate:  'Saturday, 8 March',
  bookedTime:  '7:00pm',
  venueName:   'The Ivy',
  venueAddress: '1-5 West St, London WC2H 9NQ',
  activity:    'Food & Drinks',
  members:     ['Diana', 'Felix', 'Ingrid', 'You'],
}

export default function BookedCardDetails() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56 }}>
        <BackButton to="/home" />
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {MOCK.groupName}
        </p>
        <h1 style={{ marginTop: 6 }}>Your upcoming hangout</h1>
      </div>

      {/* Event details card */}
      <div className="card" style={{ marginTop: 24, borderLeft: `3px solid ${GROUP_COLOUR}` }}>
        {/* Date & time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="event" size={20} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-primary)' }}>{MOCK.bookedDate}</p>
            <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginTop: 2 }}>{MOCK.bookedTime}</p>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-default)', margin: '14px 0' }} />

        {/* Venue */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Icon name="location_on" size={20} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-primary)' }}>{MOCK.venueName}</p>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 2 }}>{MOCK.venueAddress}</p>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-default)', margin: '14px 0' }} />

        {/* Activity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="local_bar" size={20} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
          <p style={{ fontSize: 14, color: 'var(--ink-secondary)' }}>{MOCK.activity}</p>
        </div>

        <div style={{ height: 1, background: 'var(--border-default)', margin: '14px 0' }} />

        {/* Members */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Icon name="group" size={20} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 4 }} />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Attendees
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {MOCK.members.map(name => (
                <div
                  key={name}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
                    {name[0]}
                  </div>
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button variant="secondary" onClick={() => navigate('/cant-make-it')}>
          Can't make it
        </Button>
      </div>
    </Screen>
  )
}
