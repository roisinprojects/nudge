import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Input from '../components/Input'
import SegmentedBar from '../components/SegmentedBar'

export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <Screen>
      <div style={{ paddingTop: 80 }}>
        <Logo tagline="Making hangouts happen" />
      </div>

      <div style={{ marginTop: 40 }}>
        <SegmentedBar total={5} current={1} />
      </div>

      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1>Create your account</h1>
          <p className="text-muted mt-8">Start hanging out with your people.</p>
        </div>

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button onClick={() => navigate('/set-password')}>
          Continue
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

      <div style={{ marginTop: 'auto', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p className="text-center text-xs text-muted">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </Screen>
  )
}
