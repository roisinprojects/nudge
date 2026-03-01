import { useNavigate, useLocation } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MEMBERS = ['Sarah', 'Tom', 'Jess', 'Mike', 'You']

export default function CalendarInvite() {
  const navigate  = useNavigate()
  const { state } = useLocation()

  // Data provided by the TimeConfirm interceptor
  const venueName     = state?.venueName     || 'The Botanist'
  const venueAddress  = state?.venueAddress  || ''
  const confirmedTime = state?.confirmedTime || '7pm'
  const date          = state?.match?.date     || 'Saturday, 1 March 2026'
  const activity      = state?.match?.activity || 'Food & Drinks'
  const group         = state?.match?.group    || 'The Crew'

  // Location field: use full address if captured, otherwise just the venue name
  const locationLine  = venueAddress || venueName

  return (
    <Screen style={{ paddingBottom: 40 }}>
      {/* Success header */}
      <div style={{ paddingTop: 56, textAlign: 'center' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--color-success-bg)',
            border: '2px solid var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            margin: '0 auto',
          }}
        >
          ✓
        </div>
        <h1 style={{ color: 'var(--success)', marginTop: 16 }}>It's booked!</h1>
        <p className="text-muted mt-8">
          Calendar invites are on their way to everyone in{' '}
          <span className="bold">{group}</span>.
        </p>
      </div>

      {/* Calendar invite card */}
      <div className="card" style={{ marginTop: 32, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'var(--ink-primary)', padding: '16px' }}>
          <p className="text-xs" style={{ color: 'var(--btn-primary-fg)', opacity: 0.7, marginBottom: 4 }}>
            CALENDAR INVITE
          </p>
          <p className="bold" style={{ fontSize: 18, color: 'var(--btn-primary-fg)' }}>
            {group} hangout 🎉
          </p>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div>
              <p className="bold text-sm">{date}</p>
              <p className="text-xs text-muted">{confirmedTime}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <div>
              <p className="bold text-sm">{venueName}</p>
              {venueAddress
                ? <p className="text-xs text-muted">{venueAddress}</p>
                : <p className="text-xs text-muted">{activity}</p>
              }
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>👥</span>
            <div>
              <p className="bold text-sm">Guests</p>
              <p className="text-xs text-muted mt-8">{MEMBERS.join(' · ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation ticks */}
      <div className="alert alert-success" style={{ marginTop: 16 }}>
        <span>✓</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p className="text-sm bold" style={{ color: 'var(--success)' }}>
            Calendar invites sent to {MEMBERS.length} members
          </p>
          <p className="text-sm" style={{ color: 'var(--success)' }}>
            OpenTable reservation confirmed for {MEMBERS.length} people
          </p>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button onClick={() => navigate('/home')}>
          Back to home
        </Button>
        <p className="text-center text-xs text-muted">
          Your next nudge will be sent in 6 weeks.
        </p>
      </div>
    </Screen>
  )
}
