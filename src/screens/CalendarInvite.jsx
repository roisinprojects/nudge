import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Button from '../components/Button'

const MEMBERS = ['Sarah', 'Tom', 'Jess', 'Mike', 'You']

export default function CalendarInvite() {
  const navigate = useNavigate()

  return (
    <Screen style={{ paddingBottom: 40 }}>
      <div style={{ paddingTop: 56, textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>📬</div>
        <h1 style={{ marginTop: 16 }}>Invites sent!</h1>
        <p className="text-muted mt-8">
          Everyone in <span className="bold">The Crew</span> has been sent a calendar invite.
        </p>
      </div>

      {/* Calendar invite card */}
      <div
        style={{
          marginTop: 32,
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '1.5px solid #2a2a2a',
        }}
      >
        {/* Header */}
        <div style={{ background: 'var(--coral)', padding: '16px' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>CALENDAR INVITE</p>
          <p className="bold" style={{ fontSize: 18, color: '#fff' }}>The Crew hangout 🎉</p>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div>
              <p className="bold text-sm">Saturday 1 March 2025</p>
              <p className="text-xs text-muted">Evening · 7:00pm onwards</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <div>
              <p className="bold text-sm">The Botanist</p>
              <p className="text-xs text-muted">7 Exchange Square, London EC2A 2EH</p>
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

      <div className="alert alert-success" style={{ marginTop: 16 }}>
        <span>✓</span>
        <p className="text-sm">Calendar invites delivered to all 5 members. See you there!</p>
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
