import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Logo from '../components/Logo'
import Button from '../components/Button'

export default function InviteLanding() {
  const navigate = useNavigate()

  // In a real app these would come from the invite link params
  const inviter = 'Sarah'
  const groupName = 'The Crew'

  return (
    <Screen>
      <div style={{ paddingTop: 80 }}>
        <Logo tagline="Making hangouts happen" />
      </div>

      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius)',
            padding: '24px 20px',
            textAlign: 'center',
            border: '1.5px solid #2a2a2a',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h2>{inviter} invited you</h2>
          <p className="text-muted mt-8">
            You've been invited to join <span className="bold text-coral">"{groupName}"</span> on Nudge.
          </p>
          <p className="text-sm text-muted mt-16">
            Nudge keeps your friend group hanging out regularly — without anyone having to chase for plans.
          </p>
        </div>

        <Button onClick={() => navigate('/signup')}>
          Sign up & join the group
        </Button>

        <p className="text-center text-muted text-sm">
          Already have an account?{' '}
          <span
            className="text-coral bold"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Log in
          </span>
        </p>
      </div>
    </Screen>
  )
}
